// Builds web/ (the Capacitor web root) from Cartridge's shipped renderer in original/dist:
//   - swaps the Android backend chunk for the iOS backend (src/ios-backend.js)
//   - applies a few small, checked string patches to the UI bundle
//   - adds the Pocket theme stylesheet and its font
// Every patch must match exactly once, so a changed upstream bundle fails loudly.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "original/dist");
const out = path.join(root, "web");

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });

const assets = path.join(out, "assets");
const find = (re) => {
  const name = fs.readdirSync(assets).find((f) => re.test(f));
  if (!name) throw new Error(`asset not found: ${re}`);
  return path.join(assets, name);
};

function patch(file, edits) {
  let text = fs.readFileSync(file, "utf8");
  for (const [from, to] of edits) {
    const count = text.split(from).length - 1;
    if (count !== 1) throw new Error(`${path.basename(file)}: expected 1 match, found ${count}: ${from.slice(0, 80)}`);
    text = text.replace(from, () => to);
  }
  fs.writeFileSync(file, text);
}

// 1. Backend: same file name, so the UI's dynamic import picks it up unchanged.
fs.copyFileSync(path.join(root, "src/ios-backend.js"), find(/^backend-.*\.js$/));

// 2. UI bundle.
patch(find(/^index-.*\.js$/), [
  // iOS settings sections come from the backend (StikDebug, LiveContainer, iOS games...).
  ["function B_(e,t){", "function B_(e,t){if(t.api&&t.api.iosRows){let n=t.api.iosRows(e,t);if(n)return n}"],
  // Pocket theme first in the theme list.
  [
    "var M_=[{id:`dark`,",
    "var M_=[{id:`pocket`,label:`Pocket`,desc:`A clean dotted studio with monospace labels.`},{id:`dark`,",
  ],
  // Messages from the iOS launcher (e.g. "come back and press A again") on the Now Playing card.
  ["children:r?`Playing in ${t.name||`the emulator`}.", "children:t&&t.note?t.note:r?`Playing in ${t.name||`the emulator`}."],
]);

// 3. Pocket theme.
const css = find(/^index-.*\.css$/);
fs.appendFileSync(css, "\n" + fs.readFileSync(path.join(root, "src/pocket-theme.css"), "utf8"));
for (const f of fs.readdirSync(path.join(root, "src/fonts"))) fs.copyFileSync(path.join(root, "src/fonts", f), path.join(assets, f));

console.log(`web/ built from ${path.relative(root, src)}`);
