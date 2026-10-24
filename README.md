# Cartridge for iOS (personal build)

An iOS port of **Cartridge** 0.4.9, the MIT-licensed controller-first emulation frontend by Isaiah. It keeps Cartridge's renderer: the 3D cartridges, discs, Game Switcher and settings screens. It swaps the desktop and Android backend for an iOS one, and adds a light **Pocket** theme (dotted backdrop, monospace labels, small pills), which is now the default.

It launches:

- **Emulators:** Delta, Provenance, Manic EMU, RetroArch, PPSSPP, MeloNX, ARMSX2, Play!, DolphiniOS, Flycast, Azahar, XeniOS, Madeira (Windows PC) and Husk (Android APKs).
- **Native games:** App Store games, ports and other apps. They get their own **iOS & Ports** shelf.
- **Streaming apps.**

Each item can be installed **with SideStore/AltStore** or **inside LiveContainer**. Cartridge itself can also run either way. Every emulator and app has its own **JIT** switch:

- **JIT off:** the app opens straight away, without StikDebug.
- **JIT on:** the app opens through StikDebug. StikDebug can be installed with SideStore **or** inside LiveContainer.

## Layout

| Path | What it is |
|---|---|
| `original/dist` | Cartridge's shipped renderer, unmodified (from `Cartridge.app/Contents/Resources/app.asar`). |
| `src/ios-backend.js` | The backend. It started from Cartridge's own Android backend; the Android launch code was replaced with the iOS launch layer (`IOS_EMUS`, `resolveTarget`, `planLaunch`, `iosRows`…). |
| `src/pocket-theme.css`, `src/fonts` | Pocket theme and the Space Mono font (SIL Open Font License, see `src/fonts/SpaceMono-OFL.txt`). |
| `tools/build-web.mjs` | Builds `web/` from `original/dist` plus the files above. Every patch must match exactly once. |
| `ios/App/App/CartridgeNative.swift` | The native plugin: files, picked folders, downloads, hashing, app detection, LiveContainer, launching, dialogs. |
| `.github/workflows/build-ios.yml` | Builds an unsigned `Cartridge.ipa` on a GitHub macOS runner. |

## Build

You don't need a Mac. Push to GitHub, and the **Build iOS IPA** workflow uploads `Cartridge.ipa` as an artifact. Sign and install it with SideStore, or install it in LiveContainer.

To preview the UI locally:

```bash
npm install
node tools/build-web.mjs
npx http-server web -p 5181
```

Then open `http://localhost:5181/?android`. That runs the iOS backend against Cartridge's built-in fake device.

## Adding games

Put games in **Files › On My iPhone › Cartridge › ROMs/<system>/**, for example `ROMs/gba/`. Settings › Library can also add folders from anywhere in Files.

Some emulators open a game by its path, so it helps to keep those games inside the emulator's own Files folder and add that folder in Cartridge:

- PPSSPP: its PSP folder.
- XeniOS: its Xbox 360 games folder.
- Madeira: its `drive_c` folder.

| Emulator | How Cartridge opens the game |
|---|---|
| Delta | `delta://game/<SHA-1>`. Import the game in Delta once. |
| Provenance | `provenance://open?md5=<MD5>`. Import it once. |
| Manic EMU | `manicemu://game/<id>`, where the id is a djb2 hash of the SHA-256. Import it once. |
| RetroArch | `retroarch://game/<file name>`. The game must be in RetroArch's library. |
| PPSSPP | `ppsspp://open?path=<path>` |
| MeloNX | `melonx://game?id=<title ID>`, or `?name=` if you haven't imported its list. |
| ARMSX2 | `armsx2://launch?game=<file name>` |
| XeniOS | `xenios://launch?path=<path>` |
| Madeira | `madeira://play?exe=C:\…`, for games inside Madeira's C: drive. |
| Husk | `husk://open_app?unique_identifier=<APK name>` |
| Play!, DolphiniOS, Flycast, Azahar | No game link. The emulator opens, or the file is sent with **Open in…**. |

**Settings › Emulators › <emulator> › Import game list** asks MeloNX, ARMSX2, PPSSPP, RetroArch or XeniOS for their game list. The list comes back through the `cartridge://` link.

## JIT and LiveContainer: how a launch is built

Settings › Emulators shows where Cartridge is running. For each emulator you choose where it's installed (or let Cartridge find it), and turn JIT on or off.

| Cartridge | Target app | JIT | What opens |
|---|---|---|---|
| anywhere | SideStore | off | The game link, the app's URL scheme, or the app by bundle ID |
| anywhere | SideStore | on | `stikjit://enable-jit?bundle-id=<id>`, then the game (see below) |
| outside LC | LiveContainer | off/on | `livecontainer://livecontainer-launch?bundle-name=<id>.app&open-url=<base64 game link>&jit=false/true` |
| inside LC | LiveContainer | off | The same link. LiveContainer switches apps. |
| inside LC | LiveContainer | on | Cartridge tells LiveContainer which app to boot next, then StikDebug restarts LiveContainer with the debugger attached. That's the same route LiveContainer's own StikDebug option takes. |

- **StikDebug installed with SideStore:** Cartridge uses the `stikjit://` link directly.
- **StikDebug inside LiveContainer:** Cartridge wraps the link as `livecontainerN://open-url?url=<base64 stikjit link>`.
  - StikDebug must be converted to a **shared app** in LiveContainer.
  - When Cartridge itself runs in LiveContainer, StikDebug needs a *different* LiveContainer (LiveContainer2) or multitasking, because it restarts the one Cartridge is in.
- **LiveContainer apps launched from outside LiveContainer:** they use LiveContainer's own JIT setting. Set it to **StikDebug**, or **StikDebug (Another LiveContainer/Multitask)** if StikDebug is in LiveContainer too.
- **SideStore IDs:** SideStore renames apps to `<id>.<TEAMID>`. Cartridge reads the team ID from its own bundle ID, or you can enter it in Settings.

### Opening a game in a SideStore app with JIT

StikDebug starts the emulator, but it can't pass the game link on. Settings › Emulators › **Opening a game with JIT** offers two modes:

- **Two presses (default):** the first press starts the emulator with JIT. Switch back to Cartridge and press A again within 30 minutes, and the game opens in the running emulator.
- **Shortcut (one press):** build a shortcut called **Cartridge Launch** in the Shortcuts app:
  1. **Receive** text input from *Nowhere*, and *Continue* if there's no input.
  2. **Split Text** *Shortcut Input* by *New Lines*.
  3. **Repeat with Each** item in *Split Text*:
     - **If** *Repeat Item* *begins with* `wait `:
       - **Replace Text** `wait ` with nothing in *Repeat Item*.
       - **Wait** *Updated Text* seconds.
     - **Otherwise:** **Open URLs** *Repeat Item*.
     - **End If**
  4. **End Repeat**

Cartridge then runs `shortcuts://run-shortcut?name=Cartridge%20Launch&input=text&text=<StikDebug link>\nwait 3\n<game link>`.

Apps inside LiveContainer don't need either mode. LiveContainer passes the game link on to the app itself.

## Not verified yet

Everything above was checked in a browser, using the backend against Cartridge's fake device, and against the source code of LiveContainer, StikDebug and the emulators. It has **not** been run on an iPhone yet. Things to check on a device:

- the **inside LiveContainer + JIT** route (`lcPrepareJIT`);
- the default bundle IDs of Manic EMU, Azahar, Play!, DolphiniOS, Flycast and XeniOS;
- whether `LSApplicationWorkspace` app detection and opening by bundle ID still work on your iOS version;
- the Husk app-name guess.

All of these can be changed in Settings.
