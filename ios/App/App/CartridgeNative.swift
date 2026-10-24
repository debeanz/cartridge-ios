import UIKit
import WebKit
import CryptoKit
import Capacitor
import UniformTypeIdentifiers

// Bridge view controller: registers the native plugin and keeps the UI edge to edge.
class CartridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(CartridgeNativePlugin())
        if #available(iOS 16.4, *) { webView?.isInspectable = true }
        webView?.scrollView.contentInsetAdjustmentBehavior = .never
        webView?.scrollView.bounces = false
        webView?.isOpaque = false
    }

    // Status bar and home indicator are hidden through Capacitor's SystemBars config (capacitor.config.json).
    override var preferredScreenEdgesDeferringSystemGestures: UIRectEdge { .all }
}

// Where this copy of Cartridge is running: a normal install (SideStore/AltStore/TrollStore)
// or inside LiveContainer as a guest app.
enum HostEnvironment {
    static var lcHome: String? {
        guard let p = getenv("LC_HOME_PATH") else { return nil }
        return String(cString: p)
    }
    static var inLiveContainer: Bool { lcHome != nil }
    static var isLiveProcess: Bool { getenv("LP_HOME_PATH") != nil }

    // LiveContainer adds class methods to NSUserDefaults (see LiveContainer/utils.h).
    static var lcScheme: String? { inLiveContainer ? ObjC.classCall(UserDefaults.self, "lcAppUrlScheme") as? String : nil }
    static var lcMainBundleId: String? { inLiveContainer ? (ObjC.classCall(UserDefaults.self, "lcMainBundle") as? Bundle)?.bundleIdentifier : nil }
    static var lcUserDefaults: UserDefaults? { inLiveContainer ? ObjC.classCall(UserDefaults.self, "lcUserDefaults") as? UserDefaults : nil }
    static var lcAppGroupFolder: URL? {
        guard inLiveContainer, let cls = NSClassFromString("LCSharedUtils"),
              let url = ObjC.classCall(cls, "appGroupPath") as? URL else { return nil }
        return url.appendingPathComponent("LiveContainer")
    }
    static var containerFolder: String { (NSHomeDirectory() as NSString).lastPathComponent }
}

// Typed calls into classes that only exist at runtime (LiveContainer's helpers, LSApplicationWorkspace).
enum ObjC {
    static func classCall(_ cls: AnyClass, _ name: String) -> AnyObject? {
        let sel = NSSelectorFromString(name)
        guard let method = class_getClassMethod(cls, sel) else { return nil }
        typealias Fn = @convention(c) (AnyClass, Selector) -> Unmanaged<AnyObject>?
        return unsafeBitCast(method_getImplementation(method), to: Fn.self)(cls, sel)?.takeUnretainedValue()
    }

    static func boolCall(_ obj: AnyObject, _ name: String, _ arg: String) -> Bool? {
        let sel = NSSelectorFromString(name)
        guard let cls = object_getClass(obj), let method = class_getInstanceMethod(cls, sel) else { return nil }
        typealias Fn = @convention(c) (AnyObject, Selector, NSString) -> Bool
        return unsafeBitCast(method_getImplementation(method), to: Fn.self)(obj, sel, arg as NSString)
    }

    static var workspace: NSObject? {
        guard let cls = NSClassFromString("LSApplicationWorkspace") else { return nil }
        return classCall(cls, "defaultWorkspace") as? NSObject
    }
}

@objc(CartridgeNativePlugin)
public class CartridgeNativePlugin: CAPPlugin, CAPBridgedPlugin, UIDocumentPickerDelegate {
    public let identifier = "CartridgeNativePlugin"
    public let jsName = "CartridgeNative"
    public let pluginMethods: [CAPPluginMethod] = [
        "info", "requestAllFiles", "listDir", "stat", "readText", "writeText", "writeBase64", "remove",
        "download", "httpText", "pickFolder", "pickFiles", "forgetFolder", "apps", "lcApps", "deviceApps",
        "launch", "launchApp", "openUrl", "openStore", "lcPrepareJIT", "hash", "prompt", "confirm", "choose", "share",
        "listApps", "drawIcons", "homeStatus", "setHome", "moveToBack", "exitApp",
        "secondScreenInfo", "secondScreenShow", "secondScreenHide", "secondScreenPost",
    ].map { CAPPluginMethod(name: $0, returnType: CAPPluginReturnPromise) }

    private let fm = FileManager.default
    private let io = DispatchQueue(label: "cartridge.io", qos: .userInitiated, attributes: .concurrent)
    private var pendingPicker: (call: CAPPluginCall, kind: String)?
    private var activeScopes: [URL] = []

    private var documents: URL { fm.urls(for: .documentDirectory, in: .userDomainMask)[0] }
    private var support: URL { fm.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0] }

    override public func load() {
        restoreFolderAccess()
        try? fm.createDirectory(at: documents.appendingPathComponent("ROMs"), withIntermediateDirectories: true)
        try? fm.createDirectory(at: support, withIntermediateDirectories: true)
        let nc = NotificationCenter.default
        nc.addObserver(forName: UIApplication.didBecomeActiveNotification, object: nil, queue: .main) { [weak self] _ in
            self?.notifyListeners("resume", data: ["at": Date().timeIntervalSince1970 * 1000])
        }
        nc.addObserver(forName: UIApplication.willResignActiveNotification, object: nil, queue: .main) { [weak self] _ in
            self?.notifyListeners("pause", data: ["at": Date().timeIntervalSince1970 * 1000])
        }
        // cartridge://… callbacks, e.g. game lists that emulators send back.
        nc.addObserver(forName: .capacitorOpenURL, object: nil, queue: .main) { [weak self] note in
            guard let url = (note.object as? [String: Any])?["url"] as? URL else { return }
            self?.notifyListeners("url", data: ["url": url.absoluteString], retainUntilConsumed: true)
        }
    }

    // MARK: - Device

    @objc func info(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let screen = UIScreen.main
            let bounds = screen.nativeBounds
            let device = UIDevice.current
            let bundle = Bundle.main
            var ios: [String: Any] = [
                "bundleId": bundle.bundleIdentifier ?? "",
                "bundleName": (bundle.bundlePath as NSString).lastPathComponent,
                "container": HostEnvironment.containerFolder,
                "inLiveContainer": HostEnvironment.inLiveContainer,
                "liveProcess": HostEnvironment.isLiveProcess,
                "idiom": device.userInterfaceIdiom == .pad ? "pad" : "phone",
            ]
            if HostEnvironment.inLiveContainer {
                ios["lcScheme"] = HostEnvironment.lcScheme ?? "livecontainer"
                ios["lcMainBundleId"] = HostEnvironment.lcMainBundleId ?? ""
                ios["lcHome"] = HostEnvironment.lcHome ?? ""
            }
            var volumes: [[String: Any]] = [["path": self.documents.path, "label": "On My iPhone", "primary": true, "removable": false]]
            for path in self.savedFolders() {
                volumes.append(["path": path, "label": (path as NSString).lastPathComponent, "primary": false, "removable": true])
            }
            call.resolve([
                "release": device.systemVersion,
                "model": Self.modelName(),
                "manufacturer": "Apple",
                "system": device.systemName,
                "allFiles": true,
                "primary": self.documents.path,
                "filesDir": self.support.path,
                "userId": 0,
                "version": (bundle.infoDictionary?["CFBundleShortVersionString"] as? String) ?? "0",
                "volumes": volumes,
                "screen": ["w": Double(bounds.width), "h": Double(bounds.height), "xdpi": Double(163 * screen.nativeScale),
                           "ydpi": Double(163 * screen.nativeScale), "density": Double(screen.nativeScale)],
                "ios": ios,
            ])
        }
    }

    private static func modelName() -> String {
        var sys = utsname()
        uname(&sys)
        let id = withUnsafeBytes(of: &sys.machine) { raw in
            String(decoding: raw.prefix(while: { $0 != 0 }), as: UTF8.self)
        }
        return id.isEmpty ? UIDevice.current.model : id
    }

    @objc func requestAllFiles(_ call: CAPPluginCall) { call.resolve(["granted": true, "opened": false]) }

    // MARK: - Files

    @objc func listDir(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        io.async {
            guard let names = try? self.fm.contentsOfDirectory(atPath: path) else {
                return call.resolve(["ok": false, "entries": []])
            }
            var entries: [[String: Any]] = []
            for name in names {
                let full = (path as NSString).appendingPathComponent(name)
                var isDir: ObjCBool = false
                guard self.fm.fileExists(atPath: full, isDirectory: &isDir) else { continue }
                let attrs = try? self.fm.attributesOfItem(atPath: full)
                entries.append([
                    "name": name, "dir": isDir.boolValue,
                    "size": (attrs?[.size] as? NSNumber)?.intValue ?? 0,
                    "mtime": ((attrs?[.modificationDate] as? Date)?.timeIntervalSince1970 ?? 0) * 1000,
                ])
            }
            call.resolve(["ok": true, "entries": entries])
        }
    }

    @objc func stat(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        var isDir: ObjCBool = false
        guard fm.fileExists(atPath: path, isDirectory: &isDir) else {
            return call.resolve(["exists": false, "dir": false, "size": 0, "mtime": 0])
        }
        let attrs = try? fm.attributesOfItem(atPath: path)
        call.resolve([
            "exists": true, "dir": isDir.boolValue,
            "size": (attrs?[.size] as? NSNumber)?.intValue ?? 0,
            "mtime": ((attrs?[.modificationDate] as? Date)?.timeIntervalSince1970 ?? 0) * 1000,
        ])
    }

    @objc func readText(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        let max = call.getInt("max") ?? Int.max
        io.async {
            guard let handle = FileHandle(forReadingAtPath: path) else { return call.reject("missing") }
            defer { try? handle.close() }
            let data: Data = ((try? handle.read(upToCount: max)) ?? nil) ?? Data()
            call.resolve(["text": String(decoding: data, as: UTF8.self)])
        }
    }

    private func ensureParent(_ path: String) {
        try? fm.createDirectory(atPath: (path as NSString).deletingLastPathComponent, withIntermediateDirectories: true)
    }

    @objc func writeText(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        let text = call.getString("text") ?? ""
        io.async {
            self.ensureParent(path)
            do { try text.write(toFile: path, atomically: true, encoding: .utf8); call.resolve(["ok": true]) }
            catch { call.reject(error.localizedDescription) }
        }
    }

    @objc func writeBase64(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        guard let data = Data(base64Encoded: call.getString("data") ?? "") else { return call.reject("bad base64") }
        io.async {
            self.ensureParent(path)
            do { try data.write(to: URL(fileURLWithPath: path), options: .atomic); call.resolve(["ok": true]) }
            catch { call.reject(error.localizedDescription) }
        }
    }

    @objc func remove(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        call.resolve(["ok": (try? fm.removeItem(atPath: path)) != nil])
    }

    // MARK: - Network

    @objc func httpText(_ call: CAPPluginCall) {
        guard let url = URL(string: call.getString("url") ?? "") else { return call.reject("bad url") }
        var req = URLRequest(url: url, timeoutInterval: 30)
        for (k, v) in call.getObject("headers") ?? [:] { req.setValue("\(v)", forHTTPHeaderField: k) }
        URLSession.shared.dataTask(with: req) { data, resp, err in
            if let err { return call.reject(err.localizedDescription) }
            call.resolve(["status": (resp as? HTTPURLResponse)?.statusCode ?? 0,
                          "text": String(decoding: data ?? Data(), as: UTF8.self)])
        }.resume()
    }

    @objc func download(_ call: CAPPluginCall) {
        guard let url = URL(string: call.getString("url") ?? "") else { return call.resolve(["ok": false, "error": "bad url"]) }
        let dest = call.getString("dest") ?? ""
        let maxWidth = CGFloat(call.getInt("maxWidth") ?? 0)
        let format = call.getString("format")
        URLSession.shared.dataTask(with: URLRequest(url: url, timeoutInterval: 60)) { data, resp, err in
            guard let data, err == nil, ((resp as? HTTPURLResponse)?.statusCode ?? 200) < 400 else {
                return call.resolve(["ok": false, "error": err?.localizedDescription ?? "HTTP \((resp as? HTTPURLResponse)?.statusCode ?? 0)"])
            }
            var out = data
            if format == "png" || maxWidth > 0, let source = UIImage(data: data) {
                var image = source
                if maxWidth > 0, source.size.width > maxWidth {
                    let size = CGSize(width: maxWidth, height: round(source.size.height * maxWidth / source.size.width))
                    let rendererFormat = UIGraphicsImageRendererFormat.default()
                    rendererFormat.scale = 1
                    image = UIGraphicsImageRenderer(size: size, format: rendererFormat).image { _ in
                        source.draw(in: CGRect(origin: .zero, size: size))
                    }
                }
                out = image.pngData() ?? data
            }
            self.ensureParent(dest)
            do { try out.write(to: URL(fileURLWithPath: dest), options: .atomic); call.resolve(["ok": true]) }
            catch { call.resolve(["ok": false, "error": error.localizedDescription]) }
        }.resume()
    }

    // MARK: - Folders picked in Files (kept with security-scoped bookmarks)

    private let bookmarksKey = "cartridge.folderBookmarks"

    private func savedFolders() -> [String] {
        Array((UserDefaults.standard.dictionary(forKey: bookmarksKey) ?? [:]).keys).sorted()
    }

    private func restoreFolderAccess() {
        var map = UserDefaults.standard.dictionary(forKey: bookmarksKey) as? [String: Data] ?? [:]
        for (path, data) in map {
            var stale = false
            guard let url = try? URL(resolvingBookmarkData: data, bookmarkDataIsStale: &stale) else { continue }
            if url.startAccessingSecurityScopedResource() { activeScopes.append(url) }
            if stale, let fresh = try? url.bookmarkData() { map[path] = fresh }
            if url.path != path { map[url.path] = map.removeValue(forKey: path) }
        }
        UserDefaults.standard.set(map, forKey: bookmarksKey)
    }

    @objc func pickFolder(_ call: CAPPluginCall) {
        presentPicker(call, kind: "folder", types: [.folder], multiple: false)
    }

    @objc func pickFiles(_ call: CAPPluginCall) {
        let mime = call.getString("mime") ?? "*/*"
        let types: [UTType] = mime.hasPrefix("audio") ? [.audio] : mime.hasPrefix("image") ? [.image] : [.item]
        presentPicker(call, kind: "files", types: types, multiple: true)
    }

    @objc func forgetFolder(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        var map = UserDefaults.standard.dictionary(forKey: bookmarksKey) ?? [:]
        map.removeValue(forKey: path)
        UserDefaults.standard.set(map, forKey: bookmarksKey)
        call.resolve(["ok": true])
    }

    private func presentPicker(_ call: CAPPluginCall, kind: String, types: [UTType], multiple: Bool) {
        DispatchQueue.main.async {
            let picker = UIDocumentPickerViewController(forOpeningContentTypes: types, asCopy: kind == "files")
            picker.allowsMultipleSelection = multiple
            picker.delegate = self
            self.pendingPicker = (call, kind)
            self.bridge?.viewController?.present(picker, animated: true)
        }
    }

    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        guard let pending = pendingPicker else { return }
        pendingPicker = nil
        let call = pending.call, kind = pending.kind
        if kind == "folder", let url = urls.first {
            _ = url.startAccessingSecurityScopedResource()
            activeScopes.append(url)
            var map = UserDefaults.standard.dictionary(forKey: bookmarksKey) ?? [:]
            if let data = try? url.bookmarkData() { map[url.path] = data }
            UserDefaults.standard.set(map, forKey: bookmarksKey)
            return call.resolve(["path": url.path, "uri": url.absoluteString, "cancelled": false])
        }
        let destDir = call.getString("destDir") ?? documents.path
        try? fm.createDirectory(atPath: destDir, withIntermediateDirectories: true)
        var files: [String] = []
        for url in urls {
            let dest = URL(fileURLWithPath: destDir).appendingPathComponent(url.lastPathComponent)
            try? fm.removeItem(at: dest)
            if (try? fm.copyItem(at: url, to: dest)) != nil { files.append(dest.path) }
        }
        call.resolve(["files": files, "cancelled": false])
    }

    public func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
        pendingPicker?.call.resolve(["cancelled": true])
        pendingPicker = nil
    }

    // MARK: - Installed apps

    private var workspace: NSObject? { ObjC.workspace }

    // Which of the given URL schemes / bundle IDs exist outside LiveContainer.
    @objc func apps(_ call: CAPPluginCall) {
        let schemes = call.getArray("schemes", String.self) ?? []
        let bundleIds = call.getArray("bundleIds", String.self) ?? []
        DispatchQueue.main.async {
            var found: [String: Any] = [:]
            for s in schemes {
                if let url = URL(string: "\(s)://"), UIApplication.shared.canOpenURL(url) { found["scheme:\(s)"] = true }
            }
            if let ws = self.workspace {
                for id in bundleIds where ObjC.boolCall(ws, "applicationIsInstalled:", id) == true {
                    found["bundle:\(id)"] = true
                }
            }
            call.resolve(["found": found])
        }
    }

    // Apps installed on the device, when iOS lets a sideloaded app see them.
    @objc func deviceApps(_ call: CAPPluginCall) {
        DispatchQueue.global(qos: .userInitiated).async {
            var out: [[String: Any]] = []
            let sel = NSSelectorFromString("allInstalledApplications")
            if let ws = self.workspace, ws.responds(to: sel),
               let proxies = ws.perform(sel)?.takeUnretainedValue() as? [NSObject] {
                for p in proxies {
                    let type = p.value(forKey: "applicationType") as? String ?? ""
                    guard type == "User", let id = p.value(forKey: "bundleIdentifier") as? String else { continue }
                    let name = (p.value(forKey: "localizedName") as? String) ?? id
                    out.append(["bundleId": id, "name": name])
                }
            }
            call.resolve(["apps": out])
        }
    }

    // Apps installed inside LiveContainer (only visible when Cartridge itself runs in LiveContainer).
    @objc func lcApps(_ call: CAPPluginCall) {
        let iconDir = call.getString("iconDir") ?? support.appendingPathComponent("lcicons").path
        DispatchQueue.global(qos: .userInitiated).async {
            guard let home = HostEnvironment.lcHome else { return call.resolve(["available": false, "apps": []]) }
            var roots: [(URL, Bool)] = [(URL(fileURLWithPath: home).appendingPathComponent("Documents/Applications"), false)]
            if let group = HostEnvironment.lcAppGroupFolder { roots.append((group.appendingPathComponent("Applications"), true)) }
            try? self.fm.createDirectory(atPath: iconDir, withIntermediateDirectories: true)
            var apps: [[String: Any]] = []
            var seen = Set<String>()
            for (root, shared) in roots {
                guard let names = try? self.fm.contentsOfDirectory(atPath: root.path) else { continue }
                for name in names where name.hasSuffix(".app") && !seen.contains(name) {
                    let app = root.appendingPathComponent(name)
                    guard let info = NSDictionary(contentsOf: app.appendingPathComponent("Info.plist")) as? [String: Any],
                          let id = info["CFBundleIdentifier"] as? String else { continue }
                    seen.insert(name)
                    let lc = NSDictionary(contentsOf: app.appendingPathComponent("LCAppInfo.plist")) as? [String: Any] ?? [:]
                    let schemes = ((info["CFBundleURLTypes"] as? [[String: Any]]) ?? [])
                        .flatMap { ($0["CFBundleURLSchemes"] as? [String]) ?? [] }
                    var entry: [String: Any] = [
                        "bundleName": name, "bundleId": id, "shared": shared,
                        "name": (info["CFBundleDisplayName"] as? String) ?? (info["CFBundleName"] as? String) ?? id,
                        "version": (info["CFBundleShortVersionString"] as? String) ?? "",
                        "schemes": schemes,
                        "jit": (lc["isJITNeeded"] as? Bool) ?? false,
                        "container": (lc["LCDataUUID"] as? String) ?? "",
                    ]
                    // The app's own Documents (where emulators keep their games), readable from inside LiveContainer.
                    if let uuid = lc["LCDataUUID"] as? String, !uuid.isEmpty {
                        let docs = root.deletingLastPathComponent()
                            .appendingPathComponent("Data/Application/\(uuid)/Documents")
                        if self.fm.fileExists(atPath: docs.path) { entry["dataPath"] = docs.path }
                    }
                    if let icon = Self.appIcon(bundle: app, info: info) {
                        let dest = (iconDir as NSString).appendingPathComponent("\(id).png")
                        if (try? icon.write(to: URL(fileURLWithPath: dest))) != nil { entry["icon"] = dest }
                    }
                    apps.append(entry)
                }
            }
            call.resolve(["available": true, "apps": apps])
        }
    }

    private static func appIcon(bundle: URL, info: [String: Any]) -> Data? {
        var names: [String] = []
        for key in ["CFBundleIcons", "CFBundleIcons~ipad"] {
            if let primary = (info[key] as? [String: Any])?["CFBundlePrimaryIcon"] as? [String: Any] {
                names += (primary["CFBundleIconFiles"] as? [String]) ?? []
                if let n = primary["CFBundleIconName"] as? String { names.append(n) }
            }
        }
        names += (info["CFBundleIconFiles"] as? [String]) ?? []
        let files = (try? FileManager.default.contentsOfDirectory(atPath: bundle.path)) ?? []
        for base in names.reversed() {
            for f in files.sorted(by: { $0.count > $1.count }) where f.hasPrefix(base) && f.hasSuffix(".png") {
                if let img = UIImage(contentsOfFile: bundle.appendingPathComponent(f).path), let png = img.pngData() { return png }
            }
        }
        return nil
    }

    // MARK: - Launching

    @objc func launch(_ call: CAPPluginCall) {
        if let url = call.getString("url") { return open(url, call) }
        if let id = call.getString("bundleId") { return openBundle(id, call) }
        call.resolve(["ok": false, "error": "Nothing to open."])
    }

    @objc func launchApp(_ call: CAPPluginCall) {
        if let url = call.getString("url") { return open(url, call) }
        openBundle(call.getString("package") ?? call.getString("bundleId") ?? "", call)
    }

    @objc func openUrl(_ call: CAPPluginCall) { open(call.getString("url") ?? "", call) }

    @objc func openStore(_ call: CAPPluginCall) {
        let q = (call.getString("package") ?? "").addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        open("https://apps.apple.com/search?term=\(q)", call)
    }

    private func open(_ string: String, _ call: CAPPluginCall) {
        guard let url = URL(string: string) else { return call.resolve(["ok": false, "error": "Bad link: \(string)"]) }
        DispatchQueue.main.async {
            UIApplication.shared.open(url, options: [:]) { ok in
                call.resolve(ok ? ["ok": true] : ["ok": false, "error": "iOS couldn’t open \(url.scheme ?? "")://. Is the app installed outside LiveContainer?"])
            }
        }
    }

    private func openBundle(_ id: String, _ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard !id.isEmpty, let ws = self.workspace,
                  let ok = ObjC.boolCall(ws, "openApplicationWithBundleID:", id) else {
                return call.resolve(["ok": false, "error": "Can’t open apps by bundle ID on this device."])
            }
            call.resolve(ok ? ["ok": true] : ["ok": false, "error": "\(id) isn’t installed (check the bundle ID — SideStore adds your team ID to it)."])
        }
    }

    // Inside LiveContainer: choose the guest app LiveContainer boots next. StikDebug then relaunches
    // LiveContainer with the debugger attached, so that app starts with JIT (the same route
    // LiveContainer's own "StikDebug" JIT option takes).
    @objc func lcPrepareJIT(_ call: CAPPluginCall) {
        guard let defaults = HostEnvironment.lcUserDefaults else {
            return call.resolve(["ok": false, "error": "Not running inside LiveContainer."])
        }
        defaults.set(call.getString("bundleName"), forKey: "selected")
        defaults.set(call.getString("container"), forKey: "selectedContainer")
        if let url = call.getString("openUrl"), !url.isEmpty { defaults.set(url, forKey: "launchAppUrlScheme") }
        defaults.synchronize()
        call.resolve(["ok": true, "lcMainBundleId": HostEnvironment.lcMainBundleId ?? ""])
    }

    // MARK: - Hashes (Delta = SHA-1, Provenance = MD5, Manic EMU = SHA-256)

    @objc func hash(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        let algo = call.getString("algo") ?? "sha1"
        DispatchQueue.global(qos: .userInitiated).async {
            guard let handle = FileHandle(forReadingAtPath: path) else { return call.reject("missing") }
            defer { try? handle.close() }
            var sha1 = Insecure.SHA1(), md5 = Insecure.MD5(), sha256 = SHA256()
            while let chunk = try? handle.read(upToCount: 4 << 20), !chunk.isEmpty {
                switch algo {
                case "md5": md5.update(data: chunk)
                case "sha256": sha256.update(data: chunk)
                default: sha1.update(data: chunk)
                }
            }
            let digest: [UInt8]
            switch algo {
            case "md5": digest = Array(md5.finalize())
            case "sha256": digest = Array(sha256.finalize())
            default: digest = Array(sha1.finalize())
            }
            call.resolve(["hex": digest.map { String(format: "%02x", $0) }.joined()])
        }
    }

    // MARK: - Small native dialogs used by settings rows that need typing

    @objc func prompt(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: call.getString("title"), message: call.getString("message"), preferredStyle: .alert)
            alert.addTextField { field in
                field.text = call.getString("value")
                field.placeholder = call.getString("placeholder")
                field.autocapitalizationType = .none
                field.autocorrectionType = .no
                field.clearButtonMode = .whileEditing
            }
            alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in call.resolve(["cancelled": true]) })
            alert.addAction(UIAlertAction(title: call.getString("ok") ?? "Save", style: .default) { _ in
                call.resolve(["cancelled": false, "value": alert.textFields?.first?.text ?? ""])
            })
            self.bridge?.viewController?.present(alert, animated: true)
        }
    }

    @objc func confirm(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: call.getString("title"), message: call.getString("message"), preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in call.resolve(["ok": false]) })
            alert.addAction(UIAlertAction(title: call.getString("ok") ?? "OK", style: .default) { _ in call.resolve(["ok": true]) })
            self.bridge?.viewController?.present(alert, animated: true)
        }
    }

    // Pick one entry from a list; resolves with its index, or -1 when cancelled.
    @objc func choose(_ call: CAPPluginCall) {
        let options = call.getArray("options", String.self) ?? []
        DispatchQueue.main.async {
            guard let vc = self.bridge?.viewController else { return call.resolve(["index": -1]) }
            let sheet = UIAlertController(title: call.getString("title"), message: call.getString("message"), preferredStyle: .actionSheet)
            for (i, label) in options.enumerated() {
                sheet.addAction(UIAlertAction(title: label, style: .default) { _ in call.resolve(["index": i]) })
            }
            sheet.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in call.resolve(["index": -1]) })
            sheet.popoverPresentationController?.sourceView = vc.view
            sheet.popoverPresentationController?.sourceRect = CGRect(x: vc.view.bounds.midX, y: vc.view.bounds.midY, width: 1, height: 1)
            vc.present(sheet, animated: true)
        }
    }

    // "Open in…" for emulators that have no link to start a game.
    @objc func share(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? ""
        DispatchQueue.main.async {
            guard let vc = self.bridge?.viewController else { return call.resolve(["ok": false]) }
            let sheet = UIActivityViewController(activityItems: [URL(fileURLWithPath: path)], applicationActivities: nil)
            sheet.popoverPresentationController?.sourceView = vc.view
            sheet.popoverPresentationController?.sourceRect = CGRect(x: vc.view.bounds.midX, y: vc.view.bounds.midY, width: 1, height: 1)
            sheet.completionWithItemsHandler = { _, done, _, _ in call.resolve(["ok": done]) }
            vc.present(sheet, animated: true)
        }
    }

    // MARK: - Android-only calls the shared backend still makes

    @objc func listApps(_ call: CAPPluginCall) { call.resolve(["apps": []]) }
    @objc func drawIcons(_ call: CAPPluginCall) { call.resolve(["icons": [:]]) }
    @objc func homeStatus(_ call: CAPPluginCall) { call.resolve(["isHome": false]) }
    @objc func setHome(_ call: CAPPluginCall) { call.resolve(["isHome": false]) }
    @objc func moveToBack(_ call: CAPPluginCall) { suspend(); call.resolve() }
    @objc func exitApp(_ call: CAPPluginCall) { suspend(); call.resolve() }
    @objc func secondScreenInfo(_ call: CAPPluginCall) { call.resolve(["available": false]) }
    @objc func secondScreenShow(_ call: CAPPluginCall) { call.resolve(["available": false]) }
    @objc func secondScreenHide(_ call: CAPPluginCall) { call.resolve() }
    @objc func secondScreenPost(_ call: CAPPluginCall) { call.resolve() }

    private func suspend() {
        DispatchQueue.main.async {
            UIControl().sendAction(NSSelectorFromString("suspend"), to: UIApplication.shared, for: nil)
        }
    }
}
