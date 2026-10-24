const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ["./fake-native-q0o4lgTw.js", "./mockData-DhLiQSL9.js"]),
) => i.map((i) => d[i]);
import {
  c as e,
  g as t,
  i as n,
  l as r,
  r as i,
  s as a,
  u as o,
} from "./scale-Dye8N4D4.js";
var s = 15,
  c = 12e5,
  l = [`romRoots`, `systemFolders`, `hiddenSystems`];
function u(e, t, n) {
  if (t && l.some((e) => e in t)) return `library`;
  let r = e[0];
  return !r || n - r.at > c ? `periodic` : null;
}
function d(e, t, n, r) {
  let i = JSON.stringify(t);
  return e[0] && JSON.stringify(e[0].settings) === i
    ? e
    : [{ at: r, reason: n, settings: JSON.parse(i) }, ...e].slice(0, s);
}
function f(e) {
  return e.map((e) => {
    let t = e.settings || {};
    return {
      at: e.at,
      reason: e.reason,
      roots: (t.romRoots || []).length,
      hidden: (t.hiddenSystems || []).length,
      hiddenSystems: t.hiddenSystems || [],
      theme: (t.ui && t.ui.theme) || `dark`,
    };
  });
}
var p = [
    {
      id: `nes`,
      name: `Nintendo Entertainment System`,
      short: `NES`,
      maker: `Nintendo`,
      year: 1985,
      color: `#d6453d`,
      media: { type: `cart`, shape: `nes` },
      handheld: !1,
      exts: [`nes`, `fds`, `unf`, `unif`, `zip`, `7z`],
      unique: [`nes`, `fds`, `unf`, `unif`],
      folders: [`nes`, `famicom`, `fc`, `fds`, `nintendoentertainmentsystem`],
      thumbs: `Nintendo - Nintendo Entertainment System`,
      cores: [`mesen`, `nestopia`, `fceumm`, `quicknes`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `snes`,
      name: `Super Nintendo`,
      short: `SNES`,
      maker: `Nintendo`,
      year: 1991,
      color: `#7b6cf0`,
      media: { type: `cart`, shape: `snes` },
      exts: [`sfc`, `smc`, `fig`, `swc`, `bs`, `st`, `zip`, `7z`],
      unique: [`sfc`, `smc`, `fig`, `swc`],
      folders: [
        `snes`,
        `sfc`,
        `superfamicom`,
        `supernintendo`,
        `supernes`,
        `satellaview`,
      ],
      thumbs: `Nintendo - Super Nintendo Entertainment System`,
      cores: [`snes9x`, `bsnes`, `mesen-s`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `n64`,
      name: `Nintendo 64`,
      short: `N64`,
      maker: `Nintendo`,
      year: 1996,
      color: `#1f9d55`,
      media: { type: `cart`, shape: `n64` },
      exts: [`n64`, `z64`, `v64`, `ndd`, `zip`, `7z`],
      unique: [`n64`, `z64`, `v64`, `ndd`],
      folders: [`n64`, `nintendo64`, `n64dd`],
      thumbs: `Nintendo - Nintendo 64`,
      cores: [`mupen64plus_next`, `parallel_n64`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `gb`,
      name: `Game Boy`,
      short: `GB`,
      maker: `Nintendo`,
      year: 1989,
      handheld: !0,
      color: `#8bac0f`,
      media: { type: `cart`, shape: `gb` },
      exts: [`gb`, `sgb`, `zip`, `7z`],
      unique: [`gb`, `sgb`],
      folders: [`gb`, `gameboy`, `dmg`],
      thumbs: `Nintendo - Game Boy`,
      cores: [`gambatte`, `sameboy`, `gearboy`, `mgba`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `gbc`,
      name: `Game Boy Color`,
      short: `GBC`,
      maker: `Nintendo`,
      year: 1998,
      handheld: !0,
      color: `#e0467c`,
      media: { type: `cart`, shape: `gb` },
      exts: [`gbc`, `zip`, `7z`],
      unique: [`gbc`],
      folders: [`gbc`, `gameboycolor`],
      thumbs: `Nintendo - Game Boy Color`,
      cores: [`gambatte`, `sameboy`, `gearboy`, `mgba`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `gba`,
      name: `Game Boy Advance`,
      short: `GBA`,
      maker: `Nintendo`,
      year: 2001,
      handheld: !0,
      color: `#5b48d9`,
      media: { type: `cart`, shape: `gba` },
      exts: [`gba`, `zip`, `7z`],
      unique: [`gba`],
      folders: [`gba`, `gameboyadvance`],
      thumbs: `Nintendo - Game Boy Advance`,
      cores: [`mgba`, `vbam`, `gpsp`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `nds`,
      name: `Nintendo DS`,
      short: `DS`,
      maker: `Nintendo`,
      year: 2004,
      handheld: !0,
      color: `#3b82f6`,
      media: { type: `card`, shape: `ds` },
      exts: [`nds`, `dsi`, `ids`, `zip`, `7z`],
      unique: [`nds`, `dsi`, `ids`],
      folders: [`nds`, `ds`, `nintendods`, `dsi`],
      thumbs: `Nintendo - Nintendo DS`,
      cores: [`melondsds`, `melonds`, `desmume`],
      standalone: [`melonds`],
      prefer: `retroarch`,
    },
    {
      id: `n3ds`,
      name: `Nintendo 3DS`,
      short: `3DS`,
      maker: `Nintendo`,
      year: 2011,
      handheld: !0,
      color: `#e03a3e`,
      media: { type: `card`, shape: `3ds` },
      exts: [
        `3ds`,
        `cci`,
        `cxi`,
        `3dsx`,
        `cia`,
        `app`,
        `zcci`,
        `zcxi`,
        `z3dsx`,
        `zip`,
        `7z`,
      ],
      unique: [`3ds`, `cci`, `cxi`, `3dsx`, `cia`, `zcci`, `zcxi`, `z3dsx`],
      folders: [`3ds`, `n3ds`, `nintendo3ds`],
      thumbs: `Nintendo - Nintendo 3DS`,
      cores: [`azahar`, `panda3ds`],
      legacyCores: [`panda3ds`, `azahar`],
      standalone: [`azahar`, `citra`],
      prefer: `standalone`,
    },
    {
      id: `virtualboy`,
      name: `Virtual Boy`,
      short: `VB`,
      maker: `Nintendo`,
      year: 1995,
      color: `#c81e1e`,
      media: { type: `cart`, shape: `small` },
      exts: [`vb`, `vboy`, `zip`],
      unique: [`vb`, `vboy`],
      folders: [`virtualboy`, `vb`],
      thumbs: `Nintendo - Virtual Boy`,
      cores: [`mednafen_vb`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `pokemini`,
      name: `Pokémon Mini`,
      short: `MINI`,
      maker: `Nintendo`,
      year: 2001,
      handheld: !0,
      color: `#f2b705`,
      media: { type: `cart`, shape: `small` },
      exts: [`min`, `zip`],
      unique: [`min`],
      folders: [`pokemini`, `pokemonmini`],
      thumbs: `Nintendo - Pokemon Mini`,
      cores: [`pokemini`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `gc`,
      name: `GameCube`,
      short: `GC`,
      maker: `Nintendo`,
      year: 2001,
      color: `#6d55c9`,
      media: { type: `disc`, shape: `minidisc` },
      exts: [
        `iso`,
        `gcm`,
        `rvz`,
        `ciso`,
        `gcz`,
        `wia`,
        `tgc`,
        `dol`,
        `m3u`,
        `zip`,
        `7z`,
      ],
      unique: [`gcm`, `gcz`, `tgc`],
      folders: [`gc`, `gamecube`, `ngc`, `gcn`],
      thumbs: `Nintendo - GameCube`,
      cores: [`dolphin`],
      standalone: [`dolphin`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `wii`,
      name: `Wii`,
      short: `Wii`,
      maker: `Nintendo`,
      year: 2006,
      color: `#38b6e8`,
      media: { type: `disc`, shape: `dvd` },
      exts: [
        `iso`,
        `wbfs`,
        `rvz`,
        `ciso`,
        `gcz`,
        `wia`,
        `wad`,
        `dol`,
        `elf`,
        `zip`,
        `7z`,
      ],
      unique: [`wbfs`, `wad`],
      folders: [`wii`],
      thumbs: `Nintendo - Wii`,
      cores: [`dolphin`],
      standalone: [`dolphin`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `wiiu`,
      name: `Wii U`,
      short: `Wii U`,
      maker: `Nintendo`,
      year: 2012,
      color: `#0aa3cf`,
      media: { type: `disc`, shape: `dvd` },
      exts: [`wud`, `wux`, `wua`, `rpx`, `iso`],
      unique: [`wud`, `wux`, `wua`, `rpx`],
      folders: [`wiiu`],
      thumbs: `Nintendo - Wii U`,
      cores: [],
      standalone: [`cemu`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `switch`,
      name: `Nintendo Switch`,
      short: `Switch`,
      maker: `Nintendo`,
      year: 2017,
      handheld: !0,
      color: `#e60012`,
      media: { type: `card`, shape: `switch` },
      exts: [`nsp`, `xci`, `nca`, `nro`, `nso`],
      unique: [`nsp`, `xci`, `nro`],
      folders: [`switch`, `nsw`, `nintendoswitch`],
      thumbs: null,
      cores: [],
      standalone: [`ryujinx`, `eden`, `citron`, `sudachi`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `mastersystem`,
      name: `Master System`,
      short: `SMS`,
      maker: `Sega`,
      year: 1986,
      color: `#d43a2f`,
      media: { type: `cart`, shape: `sms` },
      exts: [`sms`, `zip`, `7z`],
      unique: [`sms`],
      folders: [`mastersystem`, `sms`, `markiii`],
      thumbs: `Sega - Master System - Mark III`,
      cores: [`genesis_plus_gx`, `picodrive`, `gearsystem`, `smsplus`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `genesis`,
      name: `Genesis / Mega Drive`,
      short: `Genesis`,
      maker: `Sega`,
      year: 1989,
      color: `#2f6fe4`,
      media: { type: `cart`, shape: `md` },
      exts: [`md`, `gen`, `smd`, `bin`, `zip`, `7z`],
      unique: [`md`, `gen`, `smd`],
      folders: [
        `genesis`,
        `megadrive`,
        `md`,
        `gen`,
        `segagenesis`,
        `segamegadrive`,
      ],
      thumbs: `Sega - Mega Drive - Genesis`,
      cores: [`genesis_plus_gx`, `picodrive`, `blastem`, `clownmdemu`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `gamegear`,
      name: `Game Gear`,
      short: `GG`,
      maker: `Sega`,
      year: 1990,
      handheld: !0,
      color: `#14a39a`,
      media: { type: `cart`, shape: `small` },
      exts: [`gg`, `zip`, `7z`],
      unique: [`gg`],
      folders: [`gamegear`, `gg`],
      thumbs: `Sega - Game Gear`,
      cores: [`genesis_plus_gx`, `gearsystem`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `segacd`,
      name: `Sega CD`,
      short: `Sega CD`,
      maker: `Sega`,
      year: 1992,
      color: `#253f9a`,
      media: { type: `disc`, shape: `cd` },
      exts: [`chd`, `cue`, `iso`, `m3u`, `zip`, `7z`],
      unique: [],
      folders: [`segacd`, `megacd`],
      thumbs: `Sega - Mega-CD - Sega CD`,
      cores: [`genesis_plus_gx`, `picodrive`],
      standalone: [],
      prefer: `retroarch`,
      bios: [[`bios_CD_U.bin`, `bios_CD_E.bin`, `bios_CD_J.bin`]],
    },
    {
      id: `sega32x`,
      name: `Sega 32X`,
      short: `32X`,
      maker: `Sega`,
      year: 1994,
      color: `#f0a020`,
      media: { type: `cart`, shape: `md` },
      exts: [`32x`, `zip`, `7z`],
      unique: [`32x`],
      folders: [`32x`, `sega32x`],
      thumbs: `Sega - 32X`,
      cores: [`picodrive`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `saturn`,
      name: `Sega Saturn`,
      short: `Saturn`,
      maker: `Sega`,
      year: 1995,
      color: `#7a8699`,
      media: { type: `disc`, shape: `cd` },
      exts: [`chd`, `cue`, `iso`, `ccd`, `m3u`, `mds`, `zip`, `7z`],
      unique: [],
      folders: [`saturn`, `segasaturn`],
      thumbs: `Sega - Saturn`,
      cores: [`mednafen_saturn`, `ymir`, `yabasanshiro`, `yabause`],
      standalone: [],
      prefer: `retroarch`,
      bios: [[`sega_101.bin`, `mpr-17933.bin`]],
    },
    {
      id: `dreamcast`,
      name: `Dreamcast`,
      short: `DC`,
      maker: `Sega`,
      year: 1999,
      color: `#f36c21`,
      media: { type: `disc`, shape: `gdrom` },
      exts: [`chd`, `cdi`, `gdi`, `cue`, `m3u`, `zip`, `7z`],
      unique: [`cdi`, `gdi`],
      folders: [`dreamcast`, `dc`],
      thumbs: `Sega - Dreamcast`,
      cores: [`flycast`],
      standalone: [`flycast`],
      prefer: `retroarch`,
    },
    {
      id: `psx`,
      name: `PlayStation`,
      short: `PS1`,
      maker: `Sony`,
      year: 1995,
      color: `#6f7fa3`,
      media: { type: `disc`, shape: `psx` },
      exts: [
        `chd`,
        `cue`,
        `pbp`,
        `m3u`,
        `iso`,
        `img`,
        `ecm`,
        `mds`,
        `ccd`,
        `zip`,
        `7z`,
      ],
      unique: [],
      folders: [`psx`, `ps1`, `playstation`, `psone`, `playstation1`],
      thumbs: `Sony - PlayStation`,
      cores: [`swanstation`, `mednafen_psx_hw`, `pcsx_rearmed`],
      standalone: [`duckstation`],
      prefer: `retroarch`,
      bios: [
        [
          `scph5501.bin`,
          `scph1001.bin`,
          `scph7001.bin`,
          `scph5500.bin`,
          `scph5502.bin`,
          `scph101.bin`,
        ],
      ],
    },
    {
      id: `ps2`,
      name: `PlayStation 2`,
      short: `PS2`,
      maker: `Sony`,
      year: 2e3,
      color: `#2a4fd8`,
      media: { type: `disc`, shape: `dvd` },
      exts: [
        `chd`,
        `iso`,
        `cso`,
        `zso`,
        `gz`,
        `bin`,
        `cue`,
        `m3u`,
        `zip`,
        `7z`,
      ],
      unique: [],
      folders: [`ps2`, `playstation2`],
      thumbs: `Sony - PlayStation 2`,
      cores: [`pcsx2`, `play`],
      standalone: [`pcsx2`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `psp`,
      name: `PlayStation Portable`,
      short: `PSP`,
      maker: `Sony`,
      year: 2005,
      handheld: !0,
      color: `#5b6b82`,
      media: { type: `cart`, shape: `umd` },
      exts: [`iso`, `cso`, `pbp`, `chd`, `prx`, `zip`, `7z`],
      unique: [`cso`],
      folders: [`psp`, `playstationportable`],
      thumbs: `Sony - PlayStation Portable`,
      cores: [`ppsspp`],
      standalone: [`ppsspp`],
      prefer: `standalone`,
    },
    {
      id: `ps3`,
      name: `PlayStation 3`,
      short: `PS3`,
      maker: `Sony`,
      year: 2006,
      color: `#1b2233`,
      media: { type: `disc`, shape: `bluray` },
      exts: [`iso`, `pkg`, `ps3`, `ps3dir`],
      unique: [`ps3`, `ps3dir`],
      folders: [`ps3`, `playstation3`],
      thumbs: `Sony - PlayStation 3`,
      cores: [],
      standalone: [`rpcs3`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `pcengine`,
      name: `PC Engine / TurboGrafx-16`,
      short: `PCE`,
      maker: `NEC`,
      year: 1987,
      color: `#ef6c1a`,
      media: { type: `card`, shape: `hucard` },
      exts: [`pce`, `sgx`, `zip`, `7z`],
      unique: [`pce`, `sgx`],
      folders: [
        `pcengine`,
        `pce`,
        `tg16`,
        `turbografx`,
        `turbografx16`,
        `supergrafx`,
      ],
      thumbs: `NEC - PC Engine - TurboGrafx 16`,
      cores: [`mednafen_pce_fast`, `geargrafx`, `mednafen_pce`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `pcenginecd`,
      name: `PC Engine CD`,
      short: `PCE-CD`,
      maker: `NEC`,
      year: 1988,
      color: `#c75414`,
      media: { type: `disc`, shape: `cd` },
      exts: [`chd`, `cue`, `ccd`, `m3u`, `zip`, `7z`],
      unique: [],
      folders: [`pcenginecd`, `pcecd`, `tgcd`, `turbografxcd`],
      thumbs: `NEC - PC Engine CD - TurboGrafx-CD`,
      cores: [`mednafen_pce_fast`, `geargrafx`, `mednafen_pce`],
      standalone: [],
      prefer: `retroarch`,
      bios: [[`syscard3.pce`]],
    },
    {
      id: `ngp`,
      name: `Neo Geo Pocket`,
      short: `NGP`,
      maker: `SNK`,
      year: 1998,
      handheld: !0,
      color: `#1596b8`,
      media: { type: `cart`, shape: `small` },
      exts: [`ngp`, `zip`],
      unique: [`ngp`],
      folders: [`ngp`, `neogeopocket`],
      thumbs: `SNK - Neo Geo Pocket`,
      cores: [`mednafen_ngp`, `race`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `ngpc`,
      name: `Neo Geo Pocket Color`,
      short: `NGPC`,
      maker: `SNK`,
      year: 1999,
      handheld: !0,
      color: `#0ea5c6`,
      media: { type: `cart`, shape: `small` },
      exts: [`ngc`, `ngpc`, `zip`],
      unique: [`ngc`, `ngpc`],
      folders: [`ngpc`, `neogeopocketcolor`],
      thumbs: `SNK - Neo Geo Pocket Color`,
      cores: [`mednafen_ngp`, `race`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `wonderswan`,
      name: `WonderSwan`,
      short: `WS`,
      maker: `Bandai`,
      year: 1999,
      handheld: !0,
      color: `#6aa121`,
      media: { type: `cart`, shape: `small` },
      exts: [`ws`, `zip`],
      unique: [`ws`],
      folders: [`wonderswan`, `ws`],
      thumbs: `Bandai - WonderSwan`,
      cores: [`mednafen_wswan`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `wonderswancolor`,
      name: `WonderSwan Color`,
      short: `WSC`,
      maker: `Bandai`,
      year: 2e3,
      handheld: !0,
      color: `#8bbf2a`,
      media: { type: `cart`, shape: `small` },
      exts: [`wsc`, `pc2`, `zip`],
      unique: [`wsc`, `pc2`],
      folders: [`wonderswancolor`, `wsc`],
      thumbs: `Bandai - WonderSwan Color`,
      cores: [`mednafen_wswan`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `atari2600`,
      name: `Atari 2600`,
      short: `2600`,
      maker: `Atari`,
      year: 1977,
      color: `#b8742a`,
      media: { type: `cart`, shape: `a26` },
      exts: [`a26`, `bin`, `zip`],
      unique: [`a26`],
      folders: [`atari2600`, `a2600`, `2600`, `vcs`],
      thumbs: `Atari - 2600`,
      cores: [`stella`, `stella2023`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `atari7800`,
      name: `Atari 7800`,
      short: `7800`,
      maker: `Atari`,
      year: 1986,
      color: `#a0522d`,
      media: { type: `cart`, shape: `a26` },
      exts: [`a78`, `bin`, `zip`],
      unique: [`a78`],
      folders: [`atari7800`, `a7800`, `7800`],
      thumbs: `Atari - 7800`,
      cores: [`prosystem`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `lynx`,
      name: `Atari Lynx`,
      short: `Lynx`,
      maker: `Atari`,
      year: 1989,
      handheld: !0,
      color: `#566579`,
      media: { type: `card`, shape: `hucard` },
      exts: [`lnx`, `lyx`, `o`, `zip`],
      unique: [`lnx`, `lyx`],
      folders: [`lynx`, `atarilynx`],
      thumbs: `Atari - Lynx`,
      cores: [`handy`, `mednafen_lynx`, `gearlynx`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `neogeo`,
      name: `Neo Geo`,
      short: `Neo Geo`,
      maker: `SNK`,
      year: 1990,
      color: `#d9a400`,
      media: { type: `cart`, shape: `aes` },
      exts: [`zip`, `7z`],
      unique: [],
      folders: [`neogeo`, `mvs`, `aes`],
      thumbs: `SNK - Neo Geo`,
      cores: [`fbneo`, `geolith`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `arcade`,
      name: `Arcade`,
      short: `Arcade`,
      maker: `Various`,
      year: 1978,
      color: `#ec3f6b`,
      media: { type: `card`, shape: `pcb` },
      exts: [`zip`, `7z`],
      unique: [],
      folders: [
        `arcade`,
        `fbneo`,
        `fba`,
        `fbalpha`,
        `mame`,
        `mame2003`,
        `mame2003plus`,
        `cps1`,
        `cps2`,
        `cps3`,
        `naomi`,
      ],
      thumbs: `FBNeo - Arcade Games`,
      thumbsAlt: [`MAME`],
      cores: [`fbneo`, `mame2003_plus`, `mame`],
      standalone: [],
      prefer: `retroarch`,
    },
    {
      id: `xbox`,
      name: `Xbox`,
      short: `Xbox`,
      maker: `Microsoft`,
      year: 2001,
      color: `#2fa04a`,
      media: { type: `disc`, shape: `dvd` },
      exts: [`iso`, `xiso`],
      unique: [`xiso`],
      folders: [`xbox`],
      thumbs: `Microsoft - Xbox`,
      cores: [],
      standalone: [`xemu`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `xbox360`,
      name: `Xbox 360`,
      short: `360`,
      maker: `Microsoft`,
      year: 2005,
      color: `#7ac143`,
      media: { type: `disc`, shape: `dvd` },
      exts: [`iso`, `xex`, `zar`],
      unique: [`xex`, `zar`],
      folders: [`xbox360`, `x360`, `360`],
      thumbs: `Microsoft - Xbox 360`,
      cores: [],
      standalone: [`xenios`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `windows`,
      name: `Windows PC`,
      short: `PC`,
      maker: `Microsoft`,
      year: 1995,
      color: `#2b6cd8`,
      media: { type: `disc`, shape: `cd` },
      exts: [`exe`, `lnk`, `bat`, `msi`],
      unique: [`exe`, `lnk`, `msi`],
      folders: [`windows`, `pc`, `win`, `madeira`],
      thumbs: null,
      cores: [],
      standalone: [`madeira`],
      prefer: `standalone`,
      heavy: !0,
    },
    {
      id: `android`,
      name: `Android`,
      short: `APK`,
      maker: `Google`,
      year: 2008,
      color: `#3ddc84`,
      media: { type: `card`, shape: `switch` },
      exts: [`apk`, `xapk`, `apks`],
      unique: [`apk`, `xapk`, `apks`],
      folders: [`android`, `apk`, `husk`],
      thumbs: null,
      cores: [],
      standalone: [`husk`],
      prefer: `standalone`,
    },
    {
      id: `ports`,
      name: `iOS & Ports`,
      short: `iOS`,
      maker: `Apple`,
      year: 2008,
      color: `#8e8e93`,
      media: { type: `card`, shape: `switch` },
      exts: [],
      unique: [],
      folders: [`ports`, `ios`],
      thumbs: null,
      cores: [],
      standalone: [],
      prefer: `standalone`,
    },
  ],
  m = Object.fromEntries(p.map((e) => [e.id, e])),
  h = (e) =>
    String(e || ``)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ``),
  g = (() => {
    let e = new Map();
    for (let t of p) {
      e.set(h(t.id), t.id);
      for (let n of t.folders) e.has(h(n)) || e.set(h(n), t.id);
    }
    return e;
  })(),
  ee = (() => {
    let e = new Map();
    for (let t of p) for (let n of t.unique) e.has(n) || e.set(n, t.id);
    return e;
  })();
function _(e) {
  return g.get(h(e)) || null;
}
function te(e) {
  return ee.get(String(e).toLowerCase()) || null;
}
var v;
(function (e) {
  (e.Unimplemented = `UNIMPLEMENTED`), (e.Unavailable = `UNAVAILABLE`);
})((v ||= {}));
var ne = class extends Error {
    constructor(e, t, n) {
      super(e), (this.message = e), (this.code = t), (this.data = n);
    }
  },
  re = (e) =>
    e?.androidBridge
      ? `android`
      : e?.webkit?.messageHandlers?.bridge
        ? `ios`
        : `web`,
  ie = (e) => {
    let t = e.CapacitorCustomPlatform || null,
      n = e.Capacitor || {},
      r = (n.Plugins = n.Plugins || {}),
      i = () => (t === null ? re(e) : t.name),
      a = () => i() !== `web`,
      o = (e) => !!(l.get(e)?.platforms.has(i()) || s(e)),
      s = (e) => n.PluginHeaders?.find((t) => t.name === e),
      c = (t) => e.console.error(t),
      l = new Map();
    return (
      (n.convertFileSrc ||= (e) => e),
      (n.getPlatform = i),
      (n.handleError = c),
      (n.isNativePlatform = a),
      (n.isPluginAvailable = o),
      (n.registerPlugin = (e, a = {}) => {
        let o = l.get(e);
        if (o)
          return (
            console.warn(
              `Capacitor plugin "${e}" already registered. Cannot register plugins twice.`,
            ),
            o.proxy
          );
        let c = i(),
          u = s(e),
          d,
          f = async () => (
            !d && c in a
              ? (d = d = typeof a[c] == `function` ? await a[c]() : a[c])
              : t !== null &&
                !d &&
                `web` in a &&
                (d = d = typeof a.web == `function` ? await a.web() : a.web),
            d
          ),
          p = (t, r) => {
            if (u) {
              let i = u?.methods.find((e) => r === e.name);
              if (i)
                return i.rtype === `promise`
                  ? (t) => n.nativePromise(e, r.toString(), t)
                  : (t, i) => n.nativeCallback(e, r.toString(), t, i);
              if (t) return t[r]?.bind(t);
            } else if (t) return t[r]?.bind(t);
            else
              throw new ne(
                `"${e}" plugin is not implemented on ${c}`,
                v.Unimplemented,
              );
          },
          m = (t) => {
            let n,
              r = (...r) => {
                let i = f().then((i) => {
                  let a = p(i, t);
                  if (a) {
                    let e = a(...r);
                    return (n = e?.remove), e;
                  }
                  throw new ne(
                    `"${e}.${t}()" is not implemented on ${c}`,
                    v.Unimplemented,
                  );
                });
                return t === `addListener` && (i.remove = async () => n()), i;
              };
            return (
              (r.toString = () => `${t.toString()}() { [capacitor code] }`),
              Object.defineProperty(r, "name", {
                value: t,
                writable: !1,
                configurable: !1,
              }),
              r
            );
          },
          h = m(`addListener`),
          g = m(`removeListener`),
          ee = (e, t) => {
            let n = h({ eventName: e }, t),
              r = async () => {
                let r = await n;
                g({ eventName: e, callbackId: r }, t);
              },
              i = new Promise((e) => n.then(() => e({ remove: r })));
            return (
              (i.remove = async () => {
                console.warn(
                  `Using addListener() without 'await' is deprecated.`,
                ),
                  await r();
              }),
              i
            );
          },
          _ = new Proxy(
            {},
            {
              get(e, t) {
                switch (t) {
                  case `$$typeof`:
                    return;
                  case `toJSON`:
                    return () => ({});
                  case `addListener`:
                    return u ? ee : h;
                  case `removeListener`:
                    return g;
                  default:
                    return m(t);
                }
              },
            },
          );
        return (
          (r[e] = _),
          l.set(e, {
            name: e,
            proxy: _,
            platforms: new Set([...Object.keys(a), ...(u ? [c] : [])]),
          }),
          _
        );
      }),
      (n.Exception = ne),
      (n.DEBUG = !!n.DEBUG),
      (n.isLoggingEnabled = !!n.isLoggingEnabled),
      n
    );
  },
  y = ((e) => (e.Capacitor = ie(e)))(
    typeof globalThis < `u`
      ? globalThis
      : typeof self < `u`
        ? self
        : typeof window < `u`
          ? window
          : typeof global < `u`
            ? global
            : {},
  ),
  ae = y.registerPlugin,
  oe = class {
    constructor() {
      (this.listeners = {}),
        (this.retainedEventArguments = {}),
        (this.windowListeners = {});
    }
    addListener(e, t) {
      let n = !1;
      this.listeners[e] || ((this.listeners[e] = []), (n = !0)),
        this.listeners[e].push(t);
      let r = this.windowListeners[e];
      return (
        r && !r.registered && this.addWindowListener(r),
        n && this.sendRetainedArgumentsForEvent(e),
        Promise.resolve({ remove: async () => this.removeListener(e, t) })
      );
    }
    async removeAllListeners() {
      this.listeners = {};
      for (let e in this.windowListeners)
        this.removeWindowListener(this.windowListeners[e]);
      this.windowListeners = {};
    }
    notifyListeners(e, t, n) {
      let r = this.listeners[e];
      if (!r) {
        if (n) {
          let n = this.retainedEventArguments[e];
          (n ||= []), n.push(t), (this.retainedEventArguments[e] = n);
        }
        return;
      }
      r.forEach((e) => e(t));
    }
    hasListeners(e) {
      return !!this.listeners[e]?.length;
    }
    registerWindowListener(e, t) {
      this.windowListeners[t] = {
        registered: !1,
        windowEventName: e,
        pluginEventName: t,
        handler: (e) => {
          this.notifyListeners(t, e);
        },
      };
    }
    unimplemented(e = `not implemented`) {
      return new y.Exception(e, v.Unimplemented);
    }
    unavailable(e = `not available`) {
      return new y.Exception(e, v.Unavailable);
    }
    async removeListener(e, t) {
      let n = this.listeners[e];
      if (!n) return;
      let r = n.indexOf(t);
      r !== -1 && this.listeners[e].splice(r, 1),
        this.listeners[e].length ||
          this.removeWindowListener(this.windowListeners[e]);
    }
    addWindowListener(e) {
      window.addEventListener(e.windowEventName, e.handler),
        (e.registered = !0);
    }
    removeWindowListener(e) {
      e &&
        (window.removeEventListener(e.windowEventName, e.handler),
        (e.registered = !1));
    }
    sendRetainedArgumentsForEvent(e) {
      let t = this.retainedEventArguments[e];
      t &&
        (delete this.retainedEventArguments[e],
        t.forEach((t) => {
          this.notifyListeners(e, t);
        }));
    }
  },
  se = (e) =>
    encodeURIComponent(e)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape),
  ce = (e) => e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent),
  le = class extends oe {
    async getCookies() {
      let e = document.cookie,
        t = {};
      return (
        e.split(`;`).forEach((e) => {
          if (e.length <= 0) return;
          let [n, r] = e.replace(/=/, `CAP_COOKIE`).split(`CAP_COOKIE`);
          (n = ce(n).trim()), (r = ce(r).trim()), (t[n] = r);
        }),
        t
      );
    }
    async setCookie(e) {
      try {
        let t = se(e.key),
          n = se(e.value),
          r = e.expires ? `; expires=${e.expires.replace(`expires=`, ``)}` : ``,
          i = (e.path || `/`).replace(`path=`, ``),
          a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : ``;
        document.cookie = `${t}=${n || ``}${r}; path=${i}; ${a};`;
      } catch (e) {
        return Promise.reject(e);
      }
    }
    async deleteCookie(e) {
      try {
        document.cookie = `${e.key}=; Max-Age=0`;
      } catch (e) {
        return Promise.reject(e);
      }
    }
    async clearCookies() {
      try {
        let e = document.cookie.split(`;`) || [];
        for (let t of e)
          document.cookie = t
            .replace(/^ +/, ``)
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    async clearAllCookies() {
      try {
        await this.clearCookies();
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
ae(`CapacitorCookies`, { web: () => new le() });
var ue = async (e) =>
    new Promise((t, n) => {
      let r = new FileReader();
      (r.onload = () => {
        let e = r.result;
        t(e.indexOf(`,`) >= 0 ? e.split(`,`)[1] : e);
      }),
        (r.onerror = (e) => n(e)),
        r.readAsDataURL(e);
    }),
  de = (e = {}) => {
    let t = Object.keys(e);
    return Object.keys(e)
      .map((e) => e.toLocaleLowerCase())
      .reduce((n, r, i) => ((n[r] = e[t[i]]), n), {});
  },
  fe = (e, t = !0) =>
    e
      ? Object.entries(e)
          .reduce((e, n) => {
            let [r, i] = n,
              a,
              o;
            return (
              Array.isArray(i)
                ? ((o = ``),
                  i.forEach((e) => {
                    (a = t ? encodeURIComponent(e) : e), (o += `${r}=${a}&`);
                  }),
                  o.slice(0, -1))
                : ((a = t ? encodeURIComponent(i) : i), (o = `${r}=${a}`)),
              `${e}&${o}`
            );
          }, ``)
          .substr(1)
      : null,
  pe = (e, t = {}) => {
    let n = Object.assign({ method: e.method || `GET`, headers: e.headers }, t),
      r = de(e.headers)[`content-type`] || ``;
    if (typeof e.data == `string`) n.body = e.data;
    else if (r.includes(`application/x-www-form-urlencoded`)) {
      let t = new URLSearchParams();
      for (let [n, r] of Object.entries(e.data || {})) t.set(n, r);
      n.body = t.toString();
    } else if (
      r.includes(`multipart/form-data`) ||
      e.data instanceof FormData
    ) {
      let t = new FormData();
      if (e.data instanceof FormData)
        e.data.forEach((e, n) => {
          t.append(n, e);
        });
      else for (let n of Object.keys(e.data)) t.append(n, e.data[n]);
      n.body = t;
      let r = new Headers(n.headers);
      r.delete(`content-type`), (n.headers = r);
    } else
      (r.includes(`application/json`) || typeof e.data == `object`) &&
        (n.body = JSON.stringify(e.data));
    return n;
  },
  me = class extends oe {
    async request(e) {
      let t = pe(e, e.webFetchExtra),
        n = fe(e.params, e.shouldEncodeUrlParams),
        r = n ? `${e.url}?${n}` : e.url,
        i = await fetch(r, t),
        a = i.headers.get(`content-type`) || ``,
        { responseType: o = `text` } = i.ok ? e : {};
      a.includes(`application/json`) && (o = `json`);
      let s, c;
      switch (o) {
        case `arraybuffer`:
        case `blob`:
          (c = await i.blob()), (s = await ue(c));
          break;
        case `json`:
          s = await i.json();
          break;
        default:
          s = await i.text();
      }
      let l = {};
      return (
        i.headers.forEach((e, t) => {
          l[t] = e;
        }),
        { data: s, headers: l, status: i.status, url: i.url }
      );
    }
    async get(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: `GET` }),
      );
    }
    async post(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: `POST` }),
      );
    }
    async put(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: `PUT` }),
      );
    }
    async patch(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: `PATCH` }),
      );
    }
    async delete(e) {
      return this.request(
        Object.assign(Object.assign({}, e), { method: `DELETE` }),
      );
    }
  };
ae(`CapacitorHttp`, { web: () => new me() });
var he;
(function (e) {
  (e.Dark = `DARK`), (e.Light = `LIGHT`), (e.Default = `DEFAULT`);
})((he ||= {}));
var ge;
(function (e) {
  (e.StatusBar = `StatusBar`), (e.NavigationBar = `NavigationBar`);
})((ge ||= {}));
var _e = class extends oe {
  async setStyle() {
    this.unavailable(`not available for web`);
  }
  async setAnimation() {
    this.unavailable(`not available for web`);
  }
  async show() {
    this.unavailable(`not available for web`);
  }
  async hide() {
    this.unavailable(`not available for web`);
  }
};
ae(`SystemBars`, { web: () => new _e() });
var ve = y.isNativePlatform(),
  ye = ve
    ? ae(`CartridgeNative`)
    : (
        await t(
          async () => {
            let { default: e } = await import(`./fake-native-q0o4lgTw.js`);
            return { default: e };
          },
          __vite__mapDeps([0, 1]),
          import.meta.url,
        )
      ).default,
  be = (e) => e.split(`/`).map(encodeURIComponent).join(`/`),
  b = (e) => (ve ? y.convertFileSrc(be(e)) : ye.fileSrc(e)),
  x = ye,
  xe = [
    [`USA`, `US`],
    [`World`, `W`],
    [`Europe`, `EU`],
    [`Japan`, `JP`],
    [`Australia`, `AU`],
    [`Korea`, `KR`],
    [`Germany`, `DE`],
    [`France`, `FR`],
    [`Spain`, `ES`],
    [`Italy`, `IT`],
    [`Brazil`, `BR`],
    [`China`, `CN`],
    [`Asia`, `AS`],
    [`Canada`, `CA`],
    [`Netherlands`, `NL`],
    [`Sweden`, `SE`],
  ];
function Se(e) {
  let t = null,
    n = null,
    r = [];
  for (let i of e) {
    let e = i.trim();
    if (!t) {
      for (let [n, r] of xe)
        if (e.split(/,\s*/).includes(n)) {
          t = r;
          break;
        }
    }
    let a = e.match(/^Dis[ck]\s*(\d+)/i);
    a && (n = Number(a[1])),
      /^(Beta|Proto|Demo|Sample|Hack|Unl|Pirate|Kiosk)/i.test(e) &&
        r.push(e.split(/\s/)[0]),
      /^Rev\s/i.test(e) && r.push(e);
  }
  return { region: t, disc: n, flags: r };
}
function Ce(e) {
  let t = [],
    n = String(e)
      .replace(/_/g, ` `)
      .replace(/\s*[([]([^)\]]*)[)\]]/g, (e, n) => (t.push(n), ``))
      .replace(/\s+/g, ` `)
      .replace(/\s+(decrypted|encrypted|trimmed|dec|enc)$/i, ``)
      .replace(/\s+v\d+(\.\d+)+$/i, ``)
      .trim();
  (n = n.replace(
    /^(.+?), (The|A|An)(\s+-\s+.*)?$/i,
    (e, t, n, r) => `${n} ${t}${r || ``}`,
  )),
    (n = n.replace(/\s+-\s+/, `: `)),
    (n ||= String(e));
  let r = Se(t);
  return { title: n, tags: t, ...r };
}
function we(e) {
  return String(e)
    .toLowerCase()
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .replace(/^(the|a|an)\s+/, ``)
    .replace(/[^a-z0-9 ]/g, ``)
    .trim();
}
function Te(e) {
  let t = (e || ``).charAt(0).toUpperCase();
  return t >= `A` && t <= `Z` ? t : `#`;
}
function Ee(e) {
  return String(e)
    .replace(/\s+v\d+(\.\d+)+$/i, ``)
    .replace(/\.[a-z0-9]{1,4}$/i, ``)
    .replace(/\s*[([][^)\]]*[)\]]/g, ``)
    .replace(/\s+v\d+(\.\d+)+\s*$/i, ``)
    .replace(/\s+(decrypted|encrypted|trimmed)\s*$/i, ``)
    .replace(/^(.+?), (the|a|an)\b/i, `$2 $1`)
    .toLowerCase()
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .replace(/&/g, `and`)
    .replace(/\b(version|edition)\b/g, ``)
    .replace(/[^a-z0-9]/g, ``);
}
var De = new Set(
    `media,images,image,imgs,videos,video,manuals,downloaded_media,bios,saves,states,screenshots,boxart,snap,snaps,titles,marquees,wheel,covers,thumbnails,__macosx,.git,artwork,cheats,patches`.split(
      `,`,
    ),
  ),
  Oe = [`png`, `jpg`, `jpeg`, `webp`],
  ke = 4,
  Ae = [
    `fav`,
    `playtime`,
    `plays`,
    `lastPlayed`,
    `historyHidden`,
    `art`,
    `artTried`,
    `lastState`,
    `backend`,
  ];
function je(e) {
  let t = 3735928559,
    n = 1103547991;
  for (let r = 0; r < e.length; r++) {
    let i = e.charCodeAt(r);
    (t = Math.imul(t ^ i, 2654435761)), (n = Math.imul(n ^ i, 1597334677));
  }
  return (
    (t =
      Math.imul(t ^ (t >>> 16), 2246822507) ^
      Math.imul(n ^ (n >>> 13), 3266489909)),
    (n =
      Math.imul(n ^ (n >>> 16), 2246822507) ^
      Math.imul(t ^ (t >>> 13), 3266489909)),
    (
      (n >>> 0).toString(16).padStart(8, `0`) +
      (t >>> 0).toString(16).padStart(8, `0`)
    ).slice(0, 14)
  );
}
var S = (e) => {
    let t = e.lastIndexOf(`.`);
    return t < 0 ? `` : e.slice(t + 1).toLowerCase();
  },
  Me = (e) => {
    let t = e.lastIndexOf(`.`);
    return t <= 0 ? e : e.slice(0, t);
  },
  C = (e, t) => `${e.replace(/\/+$/, ``)}/${t}`,
  Ne = (e) => e.slice(0, e.lastIndexOf(`/`)) || `/`,
  Pe = (e) => e.slice(e.lastIndexOf(`/`) + 1);
function Fe(e, t) {
  let n = (t.startsWith(`/`) ? t : `${e}/${t}`).replace(/\\/g, `/`).split(`/`),
    r = [];
  for (let e of n) e && e !== `.` && (e === `..` ? r.pop() : r.push(e));
  return `/${r.join(`/`)}`;
}
async function w(e) {
  try {
    let t = await x.listDir({ path: e });
    return t.ok ? t.entries : [];
  } catch {
    return [];
  }
}
async function Ie(e) {
  try {
    return (await x.readText({ path: e, max: 262144 })).text;
  } catch {
    return ``;
  }
}
async function Le(e, t, n) {
  let r = [],
    i = await Ie(C(e, t));
  if (n === `m3u`)
    for (let t of i.split(/\r?\n/)) {
      let n = t.trim();
      n && !n.startsWith(`#`) && r.push(Fe(e, n.split(`|`)[0]));
    }
  else if (n === `cue`)
    for (let t of i.matchAll(
      /FILE\s+"?([^"\r\n]+?)"?\s+(BINARY|MOTOROLA|WAVE|MP3|AIFF)/gi,
    ))
      r.push(Fe(e, t[1]));
  else if (n === `gdi`)
    for (let t of i.split(/\r?\n/).slice(1)) {
      let n = t.match(/^\s*\d+\s+\d+\s+\d+\s+\d+\s+"?([^"]+?)"?\s+\d+\s*$/);
      n && r.push(Fe(e, n[1]));
    }
  return r;
}
async function T(e, t, n, r, i = 0) {
  let a = m[t];
  if (!a) return;
  let o = await w(e),
    s = new Set(o.map((e) => e.name)),
    c = new Set(a.exts);
  for (let a of o) {
    if (a.name.startsWith(`.`)) continue;
    let o = C(e, a.name);
    if (a.dir) {
      let e = a.name.toLowerCase();
      if (De.has(e)) continue;
      i < ke && (await T(o, t, n, r, i + 1));
      continue;
    }
    let l = S(a.name);
    if (c.has(l)) {
      if (l === `m3u` || l === `cue` || l === `gdi`)
        for (let t of await Le(e, a.name, l)) n.referenced.add(t);
      n.files.push({
        sysId: t,
        full: o,
        name: a.name,
        dir: e,
        names: s,
        sysDir: r,
      });
    }
  }
}
function Re(e, t, n) {
  for (let r of Oe) {
    let i = `${t}.${r}`;
    if (n.has(i)) return C(e, i);
  }
  return null;
}
function ze(e) {
  let t = Me(e.name);
  e.sysId === `wiiu` &&
    S(e.name) === `rpx` &&
    (t = Pe(e.dir).toLowerCase() === `code` ? Pe(Ne(e.dir)) : t);
  let n = Ce(t),
    r = we(n.title);
  return {
    id: je(e.full),
    system: e.sysId,
    path: e.full,
    sysDir: e.sysDir,
    file: e.name,
    base: Me(e.name),
    title: n.title,
    sortKey: r,
    letter: Te(r),
    region: n.region,
    disc: n.disc,
    flags: n.flags,
    localArt: Re(e.dir, Me(e.name), e.names),
    fav: !1,
    playtime: 0,
    plays: 0,
    lastPlayed: 0,
  };
}
async function Be(e, t = {}) {
  let n = { files: [], referenced: new Set() };
  for (let t of (e.romRoots || []).filter(Boolean)) {
    let e = _(Pe(t));
    if (e) {
      await T(t, e, n, t);
      continue;
    }
    let r = await w(t),
      i = new Set(r.map((e) => e.name));
    for (let e of r) {
      if (e.name.startsWith(`.`)) continue;
      let r = C(t, e.name);
      if (e.dir) {
        let t = _(e.name);
        if (t) await T(r, t, n, r);
        else if (!De.has(e.name.toLowerCase()))
          for (let e of await w(r)) {
            if (!e.dir) continue;
            let t = _(e.name);
            t && (await T(C(r, e.name), t, n, C(r, e.name)));
          }
      } else {
        let a = te(S(e.name));
        a &&
          n.files.push({
            sysId: a,
            full: r,
            name: e.name,
            dir: t,
            names: i,
            sysDir: t,
          });
      }
    }
  }
  for (let [t, r] of Object.entries(e.systemFolders || {}))
    for (let e of r || []) await T(e, t, n, e);
  let r = new Map();
  for (let e of Object.values(t)) r.set(`${e.system}|${e.base}`, e);
  let i = {};
  for (let e of n.files) {
    if (n.referenced.has(e.full)) continue;
    let a = ze(e);
    if (i[a.id]) continue;
    let o = t[a.id] || r.get(`${a.system}|${a.base}`);
    if (o) for (let e of Ae) o[e] !== void 0 && (a[e] = o[e]);
    i[a.id] = a;
  }
  return i;
}
async function Ve(e) {
  let t = [];
  for (let n of e) {
    let e = await w(n.path),
      r = e.find((e) => e.dir && e.name.toLowerCase() === `roms`);
    if (r) {
      t.push(C(n.path, r.name));
      continue;
    }
    for (let [r, i] of [
      [`emulation`, `roms`],
      [`games`, `roms`],
    ]) {
      let a = e.find((e) => e.dir && e.name.toLowerCase() === r);
      if (!a) continue;
      let o = (await w(C(n.path, a.name))).find(
        (e) => e.dir && e.name.toLowerCase() === i,
      );
      if (o) {
        t.push(C(C(n.path, a.name), o.name));
        break;
      }
    }
  }
  return t;
}
var He = {
    gb: [0.12, 0.27, 0.885, 0.875],
    gbc: [0.12, 0.27, 0.885, 0.875],
    gba: [0.135, 0.225, 0.868, 0.875],
    ds: [0.09, 0.05, 0.91, 0.89],
    "3ds": [0.08, 0.035, 0.878, 0.888],
    switch: [0.07, 0.06, 0.93, 0.78],
    n64: [0.26, 0.085, 0.735, 0.905],
    snes: [0.19, 0, 0.815, 0.448],
    nes: [0.4, 0, 0.862, 0.68],
    umd: [0, 0, 1, 1],
  },
  Ue = {
    gb: 0.87,
    gbc: 0.87,
    gba: 1.734,
    ds: 0.943,
    "3ds": 1,
    switch: 0.684,
    n64: 1.526,
    snes: 1.579,
    nes: 0.896,
    disc: 1,
    umd: 0.99,
  },
  We = { snes: [`US`, `W`, ``], nes: [`US`, `EU`, `AU`, `W`, ``] };
function E(e, t) {
  return e[t] * 0.11 + e[t + 1] * 0.59 + e[t + 2] * 0.3;
}
function Ge(e, t, n) {
  let r = !1;
  for (let [i, a] of [
    [1, 1],
    [t - 2, 1],
    [1, n - 2],
    [t - 2, n - 2],
  ])
    e[(a * t + i) * 4 + 3] < 200 && (r = !0);
  let i = [e[(2 * t + 2) * 4], e[(2 * t + 2) * 4 + 1], e[(2 * t + 2) * 4 + 2]],
    a = (t) =>
      r
        ? e[t + 3] > 128
        : Math.abs(e[t] - i[0]) +
            Math.abs(e[t + 1] - i[1]) +
            Math.abs(e[t + 2] - i[2]) >
          48,
    o = t,
    s = n,
    c = -1,
    l = -1,
    u = new Int32Array(n),
    d = new Int32Array(t);
  for (let e = 0; e < n; e++)
    for (let n = 0; n < t; n++) a((e * t + n) * 4) && (u[e]++, d[n]++);
  for (let e = 0; e < n; e++)
    u[e] > t * 0.02 && ((s = Math.min(s, e)), (l = e));
  for (let e = 0; e < t; e++)
    d[e] > n * 0.02 && ((o = Math.min(o, e)), (c = e));
  return c < 0 || l < 0
    ? { x: 0, y: 0, w: t, h: n }
    : { x: o, y: s, w: c - o + 1, h: l - s + 1 };
}
function Ke(e, t, n, r, i) {
  let a =
    (Math.max(0, Math.min(n - 1, i)) * t + Math.max(0, Math.min(t - 1, r))) * 4;
  if (e[(t + 1) * 4 + 3] < 200) return e[a + 3] < 128;
  let o = (2 * t + 2) * 4;
  return (
    Math.abs(e[a] - e[o]) +
      Math.abs(e[a + 1] - e[o + 1]) +
      Math.abs(e[a + 2] - e[o + 2]) <
    48
  );
}
function qe(e, t, n, r) {
  return (
    [
      [0.05, 0.05],
      [0.95, 0.05],
      [0.05, 0.95],
      [0.95, 0.95],
    ].filter(([i, a]) =>
      Ke(e, t, n, Math.round(r.x + i * r.w), Math.round(r.y + a * r.h)),
    ).length >= 3
  );
}
function Je(e, t, n, r, i, a, o) {
  let s = 0,
    c = 0;
  if (r === `v`) {
    let r = Math.max(1, Math.min(t - 2, i));
    for (let i = Math.max(0, a); i < Math.min(n, o); i += 2)
      (s += Math.abs(E(e, (i * t + r + 1) * 4) - E(e, (i * t + r - 1) * 4))),
        c++;
  } else {
    let r = Math.max(1, Math.min(n - 2, i));
    for (let n = Math.max(0, a); n < Math.min(t, o); n += 2)
      (s += Math.abs(
        E(e, ((r + 1) * t + n) * 4) - E(e, ((r - 1) * t + n) * 4),
      )),
        c++;
  }
  return c ? s / c : 0;
}
function D(e, t, n, r, i, a, o, s) {
  let c = i,
    l = -1,
    u = [];
  for (let d = Math.round(i - a); d <= Math.round(i + a); d++) {
    let i = Je(e, t, n, r, d, o, s);
    u.push(i), i > l && ((l = i), (c = d));
  }
  u.sort((e, t) => e - t);
  let d = u[Math.floor(u.length / 2)] || 0;
  return l > Math.max(12, d * 2.2) ? c : i;
}
function Ye(e, t, n, r) {
  let i = Ge(e, t, n),
    a = Ue[r];
  if (!a || Math.abs(Math.log(i.w / i.h / a)) > 0.12) return null;
  if (r === `umd`) return i;
  if (r === `disc`) {
    let e = Math.min(i.w, i.h);
    return {
      x: i.x + Math.round((i.w - e) / 2),
      y: i.y + Math.round((i.h - e) / 2),
      w: e,
      h: e,
    };
  }
  let o = He[r];
  if (!o) return null;
  let [s, c, l, u] = o,
    d = i.x + s * i.w,
    f = i.x + l * i.w,
    p = i.y + c * i.h,
    m = i.y + u * i.h,
    h = i.w * 0.03,
    g = i.h * 0.03,
    ee = [p + (m - p) * 0.2, p + (m - p) * 0.8],
    _ = [d + (f - d) * 0.2, d + (f - d) * 0.8];
  (d = D(e, t, n, `v`, d, h, ...ee)),
    (f = D(e, t, n, `v`, f, h, ...ee)),
    c > 0.01 && (p = D(e, t, n, `h`, p, g, ..._)),
    (m = D(e, t, n, `h`, m, g, ..._));
  let te = (f - d) * 0.006,
    v = (m - p) * 0.006;
  return {
    x: Math.round(d + te),
    y: Math.round(p + v),
    w: Math.max(8, Math.round(f - d - te * 2)),
    h: Math.max(8, Math.round(m - p - v * 2)),
  };
}
var Xe = new URL(`labels.json-BIJCideO.bin`, import.meta.url).href,
  Ze = `https://thumbnails.libretro.com`,
  Qe = {
    box: { dir: `Named_Boxarts`, width: 520, format: `jpg` },
    snap: { dir: `Named_Snaps`, width: 640, format: `jpg` },
    title: { dir: `Named_Titles`, width: 640, format: `jpg` },
    logo: { dir: `Named_Logos`, width: 480, format: `png` },
  },
  $e = 1024,
  et = 12096e5,
  tt = 6048e5,
  nt = (e) =>
    /\b(404|410)\b|not an image|does not match|decode/i.test(
      String((e && e.message) || e),
    ),
  rt = (e) => e.replace(/[&*/:`<>?\\|"]/g, `_`);
function it(e) {
  let t = new Set();
  for (let n = 0; n < e.length - 1; n++) t.add(e.slice(n, n + 2));
  return t;
}
function at(e, t) {
  if (!e.size || !t.size) return 0;
  let n = 0;
  for (let r of e) t.has(r) && n++;
  return (2 * n) / (e.size + t.size);
}
function ot(e) {
  let t = e.media || {};
  if (t.type === `disc`) return `disc`;
  let n = e.id === `gbc` ? `gbc` : t.shape;
  return He[n] ? n : null;
}
var st = {
  US: [`US`, `W`, `AU`, `EU`, ``, `JP`],
  EU: [`EU`, `AU`, `W`, `US`, ``, `JP`],
  JP: [`JP`, `AS`, `W`, `US`, ``, `EU`],
  W: [`W`, `US`, `EU`, `AU`, ``, `JP`],
};
async function ct(e, t) {
  let n = new Image();
  (n.src = e), await n.decode();
  let r = n.naturalWidth,
    i = n.naturalHeight,
    a = document.createElement(`canvas`);
  (a.width = r), (a.height = i);
  let o = a.getContext(`2d`, { willReadFrequently: !0 });
  o.drawImage(n, 0, 0);
  let s = o.getImageData(0, 0, r, i).data,
    c = new Uint8ClampedArray(s.length);
  for (let e = 0; e < s.length; e += 4)
    (c[e] = s[e + 2]),
      (c[e + 1] = s[e + 1]),
      (c[e + 2] = s[e]),
      (c[e + 3] = s[e + 3]);
  let l = Ye(c, r, i, t);
  if (!l) throw Error(`scan does not match the cart shape`);
  let u = t === `umd` && qe(c, r, i, l),
    d = Math.min(1, $e / Math.max(l.w, l.h)),
    f = Math.max(1, Math.round(l.w * d)),
    p = Math.max(1, Math.round(l.h * d)),
    m = document.createElement(`canvas`);
  (m.width = f), (m.height = p);
  let h = m.getContext(`2d`);
  return (
    (h.imageSmoothingQuality = `high`),
    u
      ? (h.beginPath(),
        h.arc(f / 2, p / 2, Math.min(f, p) / 2, 0, Math.PI * 2),
        h.clip())
      : ((h.fillStyle = `#ffffff`), h.fillRect(0, 0, f, p)),
    h.drawImage(a, l.x, l.y, l.w, l.h, 0, 0, f, p),
    { dataUrl: m.toDataURL(u ? `image/png` : `image/jpeg`, 0.88), round: u }
  );
}
var lt = class {
    constructor({ mediaDir: e, cacheDir: t, log: n = () => {} }) {
      (this.mediaDir = e),
        (this.cacheDir = t),
        (this.log = n),
        (this.indexes = new Map()),
        (this.cancelled = !1),
        (this.labelsP = null),
        (this.labelKeys = {});
    }
    labels() {
      return (
        (this.labelsP ||= (async () => {
          try {
            let e = await fetch(Xe);
            if (!e.ok) throw Error(`HTTP ${e.status}`);
            let t = new Uint8Array(await e.arrayBuffer()),
              n;
            if (t[0] === 31 && t[1] === 139) {
              let e = new Blob([t])
                .stream()
                .pipeThrough(new DecompressionStream(`gzip`));
              n = await new Response(e).text();
            } else n = new TextDecoder().decode(t);
            let r = JSON.parse(n);
            return (
              this.log(
                `label index: ${Object.keys(r.index || {}).length} systems`,
              ),
              r
            );
          } catch (e) {
            return this.log(`label index failed: ${e.message}`), null;
          }
        })()),
        this.labelsP
      );
    }
    async matchLabel(e, t, n) {
      let r = await this.labels(),
        i = r && r.index[e.id],
        a = ot(e);
      if (!i || !a) return null;
      let o = Ee(t);
      if (!o) return null;
      let s = i[o];
      if (!s) {
        this.labelKeys[e.id] ||
          (this.labelKeys[e.id] = Object.keys(i).map((e) => [e, it(e)]));
        let t = it(o),
          n = null,
          r = 0;
        for (let [i, a] of this.labelKeys[e.id]) {
          if (Math.abs(i.length - o.length) > Math.max(5, o.length * 0.3))
            continue;
          let e = at(t, a);
          e > r && ((r = e), (n = i));
        }
        n && r >= 0.88 && (s = i[n]);
      }
      if (!s) return null;
      let c = We[a],
        l = st[n] || st.US,
        u = a === `disc` || a === `umd` ? `d` : `c`,
        d = s
          .filter(
            ([, e, t]) => (!c || c.includes(e)) && (t === u || t === `f${u}`),
          )
          .map(([e, t, n]) => {
            let r = l.indexOf(t);
            return {
              file: e,
              score: (n === u ? 0 : 100) + (r < 0 ? 50 : r * 10),
            };
          })
          .sort((e, t) => e.score - t.score);
      return d.length
        ? { urls: d.slice(0, 3).map((e) => r.base + e.file), shape: a }
        : null;
    }
    async downloadLabel(e, t, n) {
      let r = `${this.cacheDir}/labeltmp/${Math.random().toString(36).slice(2)}.png`,
        i = await x.download({
          url: e,
          dest: r,
          maxWidth: 1400,
          format: `png`,
        });
      if (!i.ok) throw Error(i.error || `download failed`);
      try {
        let { dataUrl: e, round: i } = await ct(`${b(r)}?t=${Date.now()}`, n),
          a = `${t}.${i ? `png` : `jpg`}`;
        return (
          await x.writeBase64({ path: a, data: e.slice(e.indexOf(`,`) + 1) }), a
        );
      } finally {
        x.remove({ path: r }).catch(() => {});
      }
    }
    index(e, t) {
      let n = `${e}__${t}`;
      return (
        this.indexes.has(n) || this.indexes.set(n, this.loadIndex(e, t, n)),
        this.indexes.get(n)
      );
    }
    async loadIndex(e, t, n) {
      let r = `${this.cacheDir}/thumbindex/${n.replace(/[^a-z0-9_-]+/gi, `_`)}.json`,
        i = null;
      try {
        let e = await x.stat({ path: r });
        e.exists &&
          Date.now() - e.mtime < et &&
          (i = JSON.parse((await x.readText({ path: r })).text));
      } catch {}
      if (!i)
        try {
          let n = await x.httpText({
            url: `${Ze}/${encodeURIComponent(e)}/${Qe[t].dir}/`,
          });
          if (n.status < 200 || n.status >= 300) throw Error(String(n.status));
          i = [];
          for (let e of n.text.matchAll(/href="([^"?/][^"]*?)\.png"/g))
            try {
              i.push(decodeURIComponent(e[1]));
            } catch {}
          await x.writeText({ path: r, text: JSON.stringify(i) });
        } catch (r) {
          return (
            this.log(`index ${e}/${t} failed: ${r.message}`),
            setTimeout(() => this.indexes.delete(n), 6e4),
            {
              names: [],
              exact: new Set(),
              byKey: new Map(),
              grams: null,
              failed: !0,
            }
          );
        }
      let a = new Set(i),
        o = new Map();
      for (let e of i) {
        let t = Ee(e);
        o.has(t) || o.set(t, []), o.get(t).push(e);
      }
      return { names: i, exact: a, byKey: o, grams: null };
    }
    pickBest(e, t) {
      let n = (e) => {
        let n = [...e.matchAll(/\(([^)]*)\)/g)].map((e) => e[1]),
          r = Se(n),
          i = t.indexOf(r.region);
        return (i < 0 ? 50 : i * 10) + r.flags.length * 3 + n.length;
      };
      return [...e].sort((e, t) => n(e) - n(t))[0];
    }
    match(e, t, n) {
      if (!e.names.length) return null;
      let r = rt(t);
      if (e.exact.has(r)) return r;
      let i = Ee(t);
      if (!i) return null;
      let a = e.byKey.get(i);
      if (a) return this.pickBest(a, n);
      e.grams ||= [...e.byKey.keys()].map((e) => [e, it(e)]);
      let o = it(i),
        s = null,
        c = 0;
      for (let [t, n] of e.grams) {
        if (Math.abs(t.length - i.length) > Math.max(6, i.length * 0.4))
          continue;
        let e = at(o, n);
        e > c && ((c = e), (s = t));
      }
      return s && c >= 0.84 ? this.pickBest(e.byKey.get(s), n) : null;
    }
    async run(
      e,
      {
        kinds: t = [`box`, `snap`, `logo`],
        regionPref: n = [`US`, `W`, `EU`, `JP`],
        force: r = !1,
        retry: i = !1,
        systems: a,
        onProgress: o = () => {},
        onGame: s = () => {},
      },
    ) {
      this.cancelled = !1;
      let c = t.filter((e) => Qe[e] || e === `label`),
        l = e.filter(
          (e) =>
            a[e.system] &&
            (a[e.system].thumbs || (c.includes(`label`) && ot(a[e.system]))),
        ),
        u = 0,
        d = l.length;
      o({ done: u, total: d, running: !0 }),
        await Promise.all(
          Array.from({ length: 5 }, async () => {
            for (; l.length && !this.cancelled; ) {
              let e = l.shift(),
                t = a[e.system],
                f = {
                  art: { ...(e.art || {}) },
                  artTried: { ...(e.artTried || {}) },
                },
                p = !1;
              for (let a of c) {
                if (this.cancelled) break;
                if (!r && f.art[a]) continue;
                let o = f.artTried[a];
                if (!r && !i && o && Date.now() - o < tt) continue;
                let s = !1,
                  c = !1;
                if (a === `label`) {
                  if (!(await this.labels())) continue;
                  let n = ot(t)
                    ? await this.matchLabel(t, e.base, e.region)
                    : null;
                  for (let t of (n && n.urls) || [])
                    try {
                      let r = await this.downloadLabel(
                        t,
                        `${this.mediaDir}/${e.system}/label/${e.id}`,
                        n.shape,
                      );
                      (f.art.label = `${r.slice(this.mediaDir.length + 1)}?v=${Date.now().toString(36)}`),
                        (s = !0),
                        (p = !0);
                      break;
                    } catch (e) {
                      this.log(`label ${t} skipped: ${e.message}`),
                        nt(e) || (c = !0);
                    }
                  !s && !c && ((f.artTried[a] = Date.now()), (p = !0));
                  continue;
                }
                if (t.thumbs) {
                  for (let r of [t.thumbs, ...(t.thumbsAlt || [])]) {
                    let t = await this.index(r, a);
                    if (t.failed) {
                      c = !0;
                      continue;
                    }
                    let i = this.match(t, e.base, n);
                    if (!i) continue;
                    let o = Qe[a],
                      l = `${e.system}/${a}/${e.id}.${o.format}`,
                      u = `${Ze}/${encodeURIComponent(r)}/${o.dir}/${encodeURIComponent(i)}.png`,
                      d = await x
                        .download({
                          url: u,
                          dest: `${this.mediaDir}/${l}`,
                          maxWidth: o.width,
                          format: o.format,
                          color: a === `box`,
                        })
                        .catch((e) => ({ ok: !1, error: e.message }));
                    if (!d.ok) {
                      this.log(`download ${u} failed: ${d.error}`),
                        nt(d.error) || (c = !0);
                      continue;
                    }
                    (f.art[a] = `${l}?v=${Date.now().toString(36)}`),
                      d.color && (f.art.color = d.color),
                      (s = !0),
                      (p = !0);
                    break;
                  }
                  !s && !c && ((f.artTried[a] = Date.now()), (p = !0));
                }
              }
              u++,
                p && s(e.id, f),
                o({ done: u, total: d, running: !0, current: e.title });
            }
          }),
        ),
        o({ done: u, total: d, running: !1 });
    }
    cancel() {
      this.cancelled = !0;
    }
  },
  __iosModule = 0;

// ---------------------------------------------------------------------------
// iOS launch layer. Replaces the Android intent tables of the original backend.
//
// Every emulator, app and native game resolves to a *target*:
//   where     sidestore | livecontainer | appstore
//   bundleId  real bundle ID (SideStore adds ".<TEAMID>" to it)
//   lcBundle  folder name inside LiveContainer/Applications (normally "<bundleId>.app")
//   scheme    URL scheme, when the app has one
// and a launch is planned from (target, jit on/off, optional game link).
// ---------------------------------------------------------------------------

var IOS_EMUS = {
  delta: {
    name: `Delta`,
    systems: [`nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `nds`, `genesis`],
    schemes: [`delta`],
    bundleIds: [`com.rileytestut.Delta`],
    game: `delta://game/{sha1}`,
    note: `Import the game in Delta once — Cartridge opens it by its SHA-1.`,
  },
  provenance: {
    name: `Provenance`,
    systems: [`nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `nds`, `genesis`, `mastersystem`, `gamegear`, `segacd`, `sega32x`, `saturn`, `psx`, `psp`, `atari2600`, `atari7800`, `lynx`, `pcengine`, `pcenginecd`, `ngp`, `ngpc`, `wonderswan`, `wonderswancolor`, `virtualboy`, `pokemini`, `dreamcast`],
    schemes: [`provenance`],
    bundleIds: [`org.provenance-emu.provenance`],
    game: `provenance://open?md5={MD5}`,
    note: `Import the game in Provenance once — Cartridge opens it by its MD5.`,
  },
  manic: {
    name: `Manic EMU`,
    systems: [`nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `nds`, `n3ds`, `psx`, `psp`, `genesis`, `mastersystem`, `gamegear`, `segacd`, `sega32x`],
    schemes: [`manicemu`],
    bundleIds: [`com.aoshuang.manicemu`],
    game: `manicemu://game/{manic}`,
    note: `Import the game in Manic EMU once.`,
  },
  retroarch: {
    name: `RetroArch`,
    systems: [`nes`, `snes`, `n64`, `gb`, `gbc`, `gba`, `nds`, `virtualboy`, `pokemini`, `mastersystem`, `genesis`, `gamegear`, `segacd`, `sega32x`, `saturn`, `dreamcast`, `psx`, `psp`, `pcengine`, `pcenginecd`, `ngp`, `ngpc`, `wonderswan`, `wonderswancolor`, `atari2600`, `atari7800`, `lynx`, `neogeo`, `arcade`],
    schemes: [`retroarch`],
    bundleIds: [`com.libretro.dist.ios.RetroArch`],
    game: `retroarch://game/{fileEnc}`,
    exportLibrary: `retroarch://library?scheme=cartridge`,
    note: `The game has to be in RetroArch’s own library (RetroArch › Import Content).`,
  },
  ppsspp: {
    name: `PPSSPP`,
    systems: [`psp`],
    schemes: [`ppsspp`],
    bundleIds: [`org.ppsspp.ppsspp`],
    game: `ppsspp://open?path={pathEnc}`,
    exportLibrary: `ppsspp://gameInfo?scheme=cartridge`,
    jit: !0,
    note: `Keep your PSP folder inside PPSSPP’s Documents (pick it from Files › PPSSPP) so PPSSPP can read the path.`,
  },
  melonx: {
    name: `MeloNX`,
    systems: [`switch`],
    schemes: [`melonx`, `atariemulator`],
    bundleIds: [`com.stossy11.MeloNX`, `com.nur.nx`],
    // Title ID when MeloNX has shared its list, otherwise MeloNX's exact-title fallback.
    game: `melonx://game?id={titleId}`,
    gameFallback: `melonx://game?name={title}`,
    exportLibrary: `melonx://gameInfo?scheme=cartridge`,
    jit: !0,
    needsJit: !0,
    note: `Import the game list from MeloNX once so Cartridge knows each title ID (otherwise it matches by name).`,
  },
  armsx2: {
    name: `ARMSX2`,
    systems: [`ps2`],
    schemes: [`armsx2`, `armsx2-ios`, `armsx2ios`],
    bundleIds: [`com.armsx2.ios`, `com.armsx2.ios.nightly`],
    // ARMSX2 finds the game by its file name in its own library.
    game: `armsx2://launch?game={fileEnc}`,
    exportLibrary: `armsx2://library?callback=${encodeURIComponent(`cartridge://armsx2`)}`,
    jit: !0,
    needsJit: !0,
    note: `Keep the same file names as in ARMSX2’s library — Cartridge opens games by file name.`,
  },
  play: {
    name: `Play!`,
    systems: [`ps2`],
    schemes: [],
    bundleIds: [`com.virtualapplications.play`],
    game: null,
    jit: !0,
    needsJit: !0,
  },
  dolphin: {
    name: `DolphiniOS`,
    systems: [`gc`, `wii`],
    schemes: [],
    bundleIds: [`me.oatmealdome.DolphiniOS-njb`],
    game: null,
    jit: !0,
    needsJit: !0,
  },
  flycast: {
    name: `Flycast`,
    systems: [`dreamcast`, `arcade`],
    schemes: [],
    bundleIds: [`com.flyinghead.Flycast`],
    game: null,
    jit: !0,
  },
  azahar: {
    name: `Azahar`,
    systems: [`n3ds`],
    schemes: [],
    bundleIds: [`org.azahar-emu.azahar`],
    game: null,
    jit: !0,
    needsJit: !0,
  },
  xenios: {
    name: `XeniOS`,
    systems: [`xbox360`],
    schemes: [`xenios`],
    bundleIds: [`jp.xenios.xenios`],
    game: `xenios://launch?path={pathEnc}`,
    exportLibrary: `xenios://gameInfo?scheme=cartridge`,
    jit: !0,
    needsJit: !0,
  },
  madeira: {
    name: `Madeira`,
    systems: [`windows`],
    schemes: [`madeira`],
    bundleIds: [`com.willfaust.madeora`],
    // Madeira opens a game by its Windows path, so this works for .exe files kept inside
    // Madeira's own C: drive (pick that folder from Files › Madeira). Other games just open Madeira.
    game: `madeira://play?exe={winPathEnc}`,
    jit: !0,
    needsJit: !0,
    note: `Add Madeira’s C: drive folder as a ROM folder so Cartridge can start .exe games directly. Needs iOS 26.`,
  },
  husk: {
    name: `Husk`,
    systems: [`android`],
    schemes: [`husk`],
    bundleIds: [`com.husk.app`],
    // Husk names each installed app by its folder; Cartridge assumes it matches the APK name.
    game: `husk://open_app?unique_identifier={baseEnc}`,
    jit: !0,
    needsJit: !0,
    note: `Install the APK in Husk first. Cartridge opens it by the APK’s file name — rename the APK if Husk shows a different name.`,
  },
};

// Preferred order per system when "Automatic" is chosen.
var IOS_ORDER = {
  nds: [`delta`, `manic`, `provenance`, `retroarch`],
  n3ds: [`manic`, `azahar`],
  psp: [`ppsspp`, `manic`, `provenance`, `retroarch`],
  psx: [`provenance`, `manic`, `retroarch`],
  ps2: [`armsx2`, `play`],
  n64: [`delta`, `manic`, `provenance`, `retroarch`],
  dreamcast: [`flycast`, `provenance`, `retroarch`],
};

// Streaming services on iOS (ids match the shared list in the UI).
var IOS_STREAMING = {
  geforcenow: { web: `https://play.geforcenow.com` },
  xcloud: { web: `https://www.xbox.com/play` },
  moonlight: { schemes: [`moonlight`], bundleIds: [`com.moonlight-stream.Moonlight`] },
  moonlightnoir: { schemes: [`moonlight`] },
  steamlink: { schemes: [`steamlink`], bundleIds: [`com.valvesoftware.SteamLink`] },
  psremote: { bundleIds: [`com.playstation.RemotePlay`] },
  chiaki: { bundleIds: [`com.metallic.chiaki`] },
  parsec: { bundleIds: [`tv.parsec.www`] },
  boosteroid: { web: `https://cloud.boosteroid.com` },
  shadow: { bundleIds: [`com.blade.shadow`] },
  luna: { web: `https://luna.amazon.com` },
};

var _t = {};
for (let [e, t] of Object.entries(IOS_EMUS))
  for (let n of t.systems) (_t[n] ||= []).push(e);
for (let [e, t] of Object.entries(IOS_ORDER))
  _t[e] = [...new Set([...t, ...(_t[e] || [])])];

var j = IOS_EMUS;

// ---- small helpers -------------------------------------------------------

var b64 = (e) => btoa(unescape(encodeURIComponent(e))),
  iosCfg = () => (R && R.ios) || {},
  emuCfg = (e) => (iosCfg().emus || {})[e] || {},
  jitSessions = {},
  hashCache = {};

// djb2 over the SHA-256 hex string, as Manic EMU keys its library.
function manicId(e) {
  let t = 5381n;
  for (let n = 0; n < e.length; n++)
    t = ((t << 5n) + t + BigInt(e.charCodeAt(n))) & 0xffffffffffffffffn;
  return t.toString();
}

async function fileHash(e, t) {
  let n = await x.stat({ path: e }).catch(() => null),
    r = `${t}|${e}|${n && n.size}|${n && n.mtime}`;
  return (hashCache[r] ||= x.hash({ path: e, algo: t }).then((e) => e.hex));
}

// SideStore installs apps as "<original id>.<TEAMID>". Cartridge's own ID tells us the suffix.
function teamSuffix() {
  let e = iosCfg().teamSuffix;
  if (e) return e.startsWith(`.`) ? e : `.${e}`;
  let t = (I && I.ios && I.ios.bundleId) || ``,
    n = t.match(/^app\.cartridge\.ios(\.[A-Z0-9]{10})$/);
  return n ? n[1] : ``;
}

function realBundleId(e) {
  return !e || /\.[A-Z0-9]{10}$/.test(e) ? e : `${e}${teamSuffix()}`;
}

var inLC = () => !!(I && I.ios && I.ios.inLiveContainer),
  ownLcScheme = () => (I && I.ios && I.ios.lcScheme) || `livecontainer`;

// The LiveContainer instance StikDebug runs in when it is installed inside LiveContainer.
// It cannot be the one Cartridge is in: StikDebug restarts that one to attach the debugger.
function stikLcScheme() {
  let e = iosCfg().stikLcScheme || `auto`;
  return e !== `auto` ? e : inLC() && ownLcScheme() === `livecontainer` ? `livecontainer2` : `livecontainer`;
}

function stikUrl(e) {
  let t = `stikjit://enable-jit?bundle-id=${encodeURIComponent(e)}`;
  return iosCfg().stikdebug === `livecontainer`
    ? `${stikLcScheme()}://open-url?url=${encodeURIComponent(b64(t))}`
    : t;
}

// ---- where is it installed? ----------------------------------------------

var lcAppsCache = null;
async function lcAppList() {
  if (!inLC()) return [];
  if (lcAppsCache && Date.now() - lcAppsCache.at < 15e3) return lcAppsCache.apps;
  let e = await x.lcApps({ iconDir: `${L.media}/lcicons` }).catch(() => ({ apps: [] }));
  return (lcAppsCache = { at: Date.now(), apps: e.apps || [] }).apps;
}

function matchLc(e, t) {
  let n = (t || []).map((e) => e.toLowerCase());
  return (
    e.find((e) => n.includes(e.bundleId.toLowerCase())) ||
    e.find((e) => n.some((t) => e.bundleId.toLowerCase().startsWith(t))) ||
    null
  );
}

// Resolve an emulator / app config + detection into a launch target.
function resolveTarget(e, t, n) {
  let r = e.install || `auto`,
    i = e.bundleId || (t.bundleIds || [])[0] || ``,
    a = n.lc && matchLc(n.lc, [i, ...(t.bundleIds || [])]),
    o = (t.schemes || []).some((e) => n.found[`scheme:${e}`]),
    s = [i, ...(t.bundleIds || [])].some((e) => e && n.found[`bundle:${realBundleId(e)}`]),
    c = r === `auto` ? (a ? `livecontainer` : o || s ? `sidestore` : null) : r;
  if (!c) return null;
  if (c === `livecontainer`)
    return {
      where: c,
      bundleId: a ? a.bundleId : i,
      lcBundle: e.lcBundle || (a ? a.bundleName : `${i}.app`),
      container: e.container || (a ? a.container : ``),
      lcScheme: e.lcScheme || (inLC() ? ownLcScheme() : `livecontainer`),
      icon: a && a.icon,
      detected: !!a,
    };
  return {
    where: c,
    bundleId: c === `appstore` ? i : realBundleId(i),
    scheme: e.scheme || (t.schemes || [])[0] || ``,
    detected: o || s,
  };
}

async function detect(e = !1) {
  if (!e && U && Date.now() - U.at < 4e3) return U.found;
  let t = new Set(),
    n = new Set();
  for (let e of Object.values(IOS_EMUS)) {
    (e.schemes || []).forEach((e) => t.add(e));
    (e.bundleIds || []).forEach((e) => n.add(realBundleId(e)));
  }
  for (let e of Object.values(IOS_STREAMING)) {
    (e.schemes || []).forEach((e) => t.add(e));
    (e.bundleIds || []).forEach((e) => n.add(e));
  }
  for (let e of Object.values(iosCfg().emus || {})) e.bundleId && n.add(realBundleId(e.bundleId));
  [`stikjit`, `livecontainer`, `livecontainer2`, `livecontainer3`, `shortcuts`].forEach((e) => t.add(e));
  let r = {};
  try {
    r = (await x.apps({ schemes: [...t], bundleIds: [...n] })).found || {};
  } catch (e) {
    G(`apps`, e.message);
  }
  let i = { found: r, lc: await lcAppList() };
  return (U = { at: Date.now(), found: i }), i;
}

// ---- planning a launch ---------------------------------------------------

function fillTemplate(e, t) {
  return e.replace(/\{(\w+)\}/g, (e, n) => (t[n] !== void 0 && t[n] !== null ? t[n] : e));
}

async function gameLink(e, t) {
  let n = IOS_EMUS[e],
    i = emuCfg(e).game || (n && n.game);
  if (!i) return null;
  let a = t.path.match(/\/drive_c\/(.+)$/i),
    r = {
      path: t.path,
      pathEnc: encodeURIComponent(t.path),
      file: t.file,
      fileEnc: encodeURIComponent(t.file),
      base: t.base,
      baseEnc: encodeURIComponent(t.base),
      title: encodeURIComponent(t.title),
      winPathEnc: a ? encodeURIComponent(`C:\\${a[1].replace(/\//g, `\\`)}`) : null,
    };
  if (/\{winPathEnc\}/.test(i) && !r.winPathEnc) return null;
  if (/\{titleId\}/.test(i)) {
    let a = findTitleId(e, t);
    if (a) r.titleId = encodeURIComponent(a);
    else if (n && n.gameFallback && !emuCfg(e).game) i = n.gameFallback;
    else return { missing: `title` };
  }
  if (/\{(sha1|SHA1)\}/.test(i)) {
    let e = await fileHash(t.path, `sha1`);
    (r.sha1 = e), (r.SHA1 = e.toUpperCase());
  }
  if (/\{(md5|MD5)\}/.test(i)) {
    let e = await fileHash(t.path, `md5`);
    (r.md5 = e), (r.MD5 = e.toUpperCase());
  }
  /\{manic\}/.test(i) && (r.manic = manicId(await fileHash(t.path, `sha256`)));
  return fillTemplate(i, r);
}

// Turns (target, jit, link) into the one URL iOS should open, plus what to tell the player.
async function planLaunch(e, { jit: t, link: n, key: r, name: i }) {
  let a = iosCfg();
  if (e.where === `livecontainer`) {
    let o = `bundle-name=${encodeURIComponent(e.lcBundle)}`;
    e.container && (o += `&container-folder-name=${encodeURIComponent(e.container)}`);
    n && (o += `&open-url=${encodeURIComponent(b64(n))}`);
    if (!inLC() || !t)
      return { url: `${e.lcScheme}://livecontainer-launch?${o}&jit=${t ? `true` : `false`}` };
    // Cartridge is itself a LiveContainer guest: pick the app LiveContainer boots next,
    // then let StikDebug restart LiveContainer under the debugger.
    let s = await x.lcPrepareJIT({ bundleName: e.lcBundle, container: e.container || ``, openUrl: n || `` });
    if (!s.ok) return { error: s.error };
    if (a.stikdebug === `livecontainer` && stikLcScheme() === ownLcScheme())
      return {
        error: `StikDebug can’t run in the same LiveContainer as Cartridge. Install a second LiveContainer (or turn on multitasking) and pick it under Settings › Emulators › StikDebug.`,
      };
    return { url: stikUrl(s.lcMainBundleId || `com.kdt.livecontainer`) };
  }
  if (!t || e.where === `appstore`)
    return n ? { url: n } : e.scheme ? { url: `${e.scheme}://` } : { bundleId: e.bundleId };
  let o = stikUrl(e.bundleId);
  if (!n) return { url: o };
  if (a.handoff === `shortcut`) {
    let e = `${o}\nwait ${a.handoffDelay || 3}\n${n}`;
    return {
      url: `shortcuts://run-shortcut?name=${encodeURIComponent(a.shortcutName || `Cartridge Launch`)}&input=text&text=${encodeURIComponent(e)}`,
    };
  }
  // Two-step: the first press starts the emulator with JIT, the next press (within 30 min) opens the game.
  let s = jitSessions[r];
  if (s && Date.now() - s < 18e5) return { url: n, reused: !0 };
  return (
    (jitSessions[r] = Date.now()),
    { url: o, toast: `${i} is starting with JIT. Come back to Cartridge and press A again to load the game.` }
  );
}

async function runPlan(e) {
  if (e.error) return { ok: !1, error: e.error };
  let t = e.url ? await x.launch({ url: e.url }) : await x.launch({ bundleId: e.bundleId });
  return t.ok && e.toast ? { ...t, note: e.toast } : t;
}

// ---- title IDs from emulators that share their game list ------------------

function titleKey(e) {
  return Ee(String(e || ``));
}

function findTitleId(e, t) {
  let n = (iosCfg().titles || {})[e] || {};
  return n[titleKey(t.title)] || n[titleKey(t.base)] || n[titleKey(t.file)] || null;
}

async function importTitles(e, t) {
  let n = [];
  try {
    n = JSON.parse(decodeURIComponent(escape(atob(t.replace(/-/g, `+`).replace(/_/g, `/`)))));
  } catch (e) {
    return G(`titles`, e.message), 0;
  }
  let r = {};
  for (let e of Array.isArray(n) ? n : n.games || []) {
    let t = e.titleId || e.fileName || e.game;
    t && ((r[titleKey(e.titleName || e.name || e.title)] = t), e.fileName && (r[titleKey(e.fileName)] = t));
  }
  return (
    (R = N(R, { ios: { titles: { [e]: { ...((iosCfg().titles || {})[e] || {}), ...r } } } })),
    K(),
    F(`settings:changed`, R),
    Object.keys(r).length
  );
}

function onIncomingUrl({ url: e }) {
  let t;
  try {
    t = new URL(e);
  } catch {
    return;
  }
  let n = (t.host || t.pathname.replace(/^\/+/, ``)).toLowerCase(),
    // MeloNX/PPSSPP/XeniOS send ?games=, ARMSX2 sends ?payload=.
    r = t.searchParams.get(`games`) || t.searchParams.get(`payload`);
  if (!r) return;
  let i = Object.entries(IOS_EMUS).find(([e, t]) => e === n || (t.schemes || []).includes(n));
  i &&
    importTitles(i[0], r).then((e) => {
      G(`imported ${e} titles from ${i[1].name}`), F(`toast`, `${e} games imported from ${i[1].name}`);
    });
}

// ---- native games & apps (App Store games, ports, LiveContainer apps) ------

function iosApps() {
  return iosCfg().apps || [];
}

function appGames() {
  let e = {};
  for (let t of iosApps()) {
    if (t.kind !== `game`) continue;
    let n = `app:${t.id}`;
    e[n] = {
      id: n,
      system: t.system || `ports`,
      path: n,
      sysDir: ``,
      file: t.name,
      base: t.name,
      title: t.name,
      sortKey: we(t.name),
      letter: Te(we(t.name)),
      region: null,
      disc: null,
      flags: [],
      localArt: t.icon || null,
      fav: !1,
      playtime: 0,
      plays: 0,
      lastPlayed: 0,
      native: !0,
    };
  }
  return e;
}

function appTarget(e, t) {
  return resolveTarget(
    { install: e.install || `sidestore`, bundleId: e.bundleId, lcBundle: e.lcBundle, container: e.container, scheme: e.scheme },
    { bundleIds: [e.bundleId], schemes: e.scheme ? [e.scheme] : [] },
    t,
  ) || { where: e.install || `sidestore`, bundleId: realBundleId(e.bundleId), scheme: e.scheme };
}

async function launchAppEntry(e) {
  let t = await detect(),
    n = appTarget(e, t),
    r = e.url || null,
    i = await planLaunch(n, { jit: !!e.jit, link: r, key: `app:${e.id}`, name: e.name });
  return G(`launch app`, e.name, JSON.stringify(n), JSON.stringify(i)), runPlan(i);
}

function saveIos(e) {
  return (R = N(R, { ios: e })), K(), F(`settings:changed`, R), P(R);
}

function setApps(e) {
  return (R = { ...R, ios: { ...iosCfg(), apps: e } }), K(), mergeAppGames(), F(`settings:changed`, R), P(R);
}

function mergeAppGames() {
  if (!z) return;
  let e = appGames(),
    t = {};
  for (let [n, r] of Object.entries(z.games)) (r.native && !e[n]) || (t[n] = r);
  for (let [n, r] of Object.entries(e)) {
    let e = t[n];
    t[n] = e ? { ...r, ...Object.fromEntries(Ae.map((t) => [t, e[t]]).filter(([, e]) => e !== void 0)) } : r;
  }
  (z = { ...z, games: t }), Lt(), F(`library:replaced`, Object.values(t));
}

var ht = (e) => [],
  ut = 0;
var wt = 56;
function Tt(e) {
  for (let t = e; t && t !== document.body; t = t.parentElement) {
    let e = getComputedStyle(t);
    if (
      (e.overflowY === `auto` || e.overflowY === `scroll`) &&
      t.scrollHeight > t.clientHeight + 4
    )
      return !0;
  }
  return !1;
}
var Et = !1;
function Dt() {
  if (Et || typeof window > `u`) return;
  Et = !0;
  let t = null;
  window.addEventListener(
    `touchstart`,
    (e) => {
      if (e.touches.length !== 1) {
        t = null;
        return;
      }
      let n = e.touches[0];
      t = {
        x: n.clientX,
        y: n.clientY,
        axis: null,
        native: Tt(e.target),
        moved: !1,
      };
    },
    { passive: !0 },
  ),
    window.addEventListener(
      `touchmove`,
      (n) => {
        if (!t || n.touches.length !== 1) return;
        let r = n.touches[0],
          i = r.clientX - t.x,
          a = r.clientY - t.y;
        if (!t.axis) {
          if (Math.abs(i) < 14 && Math.abs(a) < 14) return;
          t.axis = Math.abs(i) > Math.abs(a) ? `x` : `y`;
        }
        if (t.axis === `y` && t.native) return;
        let o = t.axis === `x` ? i : a;
        if (Math.abs(o) < wt) return;
        let s =
          t.axis === `x` ? (o < 0 ? `right` : `left`) : o < 0 ? `down` : `up`;
        e(s, { source: `touch` }),
          (t.moved = !0),
          t.axis === `x` ? (t.x = r.clientX) : (t.y = r.clientY);
      },
      { passive: !0 },
    ),
    window.addEventListener(
      `click`,
      (e) => {
        t && t.moved && (e.stopPropagation(), e.preventDefault(), (t = null));
      },
      !0,
    ),
    window.addEventListener(
      `touchend`,
      () => {
        t && !t.moved && (t = null);
      },
      { passive: !0 },
    );
}
var Ot = `0.4.9-ios`,
  kt = {
    romRoots: [],
    systemFolders: {},
    emulatorPaths: {},
    emulatorArgs: {},
    systemBackend: {},
    cartLooks: {},
    streaming: {},
    systemCore: {},
    hiddenSystems: [],
    apps: [],
    views: {},
    ios: {
      stikdebug: `sidestore`,
      stikLcScheme: `auto`,
      handoff: `twostep`,
      handoffDelay: 3,
      shortcutName: `Cartridge Launch`,
      teamSuffix: ``,
      emus: {},
      apps: [],
      titles: {},
    },
    ui: {
      theme: `pocket`,
      engraving: `none`,
      insert: `front`,
      wear: `off`,
      specialCarts: !0,
      boxes: `flat`,
      background: `art`,
      palette: `game`,
      shelf: `glass`,
      sounds: !0,
      volume: 0.45,
      quality: `high`,
      logo: `classic`,
      motion: `full`,
      confirm: `south`,
      defaultView: `carousel`,
      scale: `auto`,
      clock24: !1,
    },
    behavior: {
      switcherAfterGame: !0,
      resumeOnStart: !1,
      scrapeAfterScan: !0,
      realLabels: !0,
      artKinds: [`box`, `snap`, `logo`],
      regionPref: [`US`, `W`, `EU`, `JP`],
    },
    controls: { quitCombo: 4, menuCombo: -1 },
    music: { enabled: !0, volume: 0.35, shuffle: !0, folder: `` },
  },
  At = new Set([`mp3`, `m4a`, `aac`, `ogg`, `oga`, `opus`, `wav`, `flac`]),
  M = (e) => e && typeof e == `object` && !Array.isArray(e);
function N(e, t) {
  if (!M(e) || !M(t)) return t;
  let n = { ...e };
  for (let [r, i] of Object.entries(t)) n[r] = M(i) && M(e[r]) ? N(e[r], i) : i;
  return n;
}
var P = (e) => JSON.parse(JSON.stringify(e)),
  jt = {};
function F(e, t) {
  (jt[e] || []).forEach((e) => {
    try {
      e(t);
    } catch (e) {
      console.error(e);
    }
  });
}
var I = null,
  L = null,
  R = P(kt),
  z = { games: {}, scannedAt: 0 },
  B = null,
  V = null,
  H = null,
  Mt = !1,
  Nt = null,
  U = null,
  W = [];
function G(...e) {
  let t = `[${new Date().toISOString()}] ${e.join(` `)}`;
  W.push(t), W.length > 400 && W.splice(0, W.length - 400), console.log(t);
}
function Pt() {
  L && x.remove({ path: `${L.base}/running.json` }).catch(() => {});
}
var Ft = {};
function It(e, t) {
  clearTimeout(Ft[e]),
    (Ft[e] = setTimeout(() => {
      x.writeText({
        path: `${L.base}/${e}.json`,
        text: JSON.stringify(t()),
      }).catch((t) => G(`save`, e, t.message));
    }, 400));
}
var K = () => It(`settings`, () => R),
  q = [];
function J(e) {
  let t = u(q, e, Date.now());
  t &&
    ((q = d(q, R, t, Date.now())), It(`settings-history`, () => ({ list: q })));
}
var Lt = () => It(`library`, () => z);
async function Rt(e) {
  try {
    return JSON.parse((await x.readText({ path: `${L.base}/${e}.json` })).text);
  } catch {
    return null;
  }
}
function Y(e, t) {
  let n = z.games[e];
  return n ? ((z.games[e] = { ...n, ...t }), Lt(), z.games[e]) : null;
}
var zt = null;
function X() {
  return (zt ||= Bt()), zt;
}
async function Bt() {
  I = await x.info();
  let t = `${I.filesDir}/cartridge`;
  if (
    ((L = { base: t, media: `${t}/media`, cache: `${t}/cache` }),
    (R = N(P(kt), (await Rt(`settings`)) || {})),
    (q = ((await Rt(`settings-history`)) || {}).list || []),
    (z = { games: {}, scannedAt: 0, ...((await Rt(`library`)) || {}) }),
    (Nt = new lt({ mediaDir: L.media, cacheDir: L.cache, log: G })),
    !(R.migrated && R.migrated.labelIndex))
  ) {
    for (let e of Object.values(z.games))
      if (e.artTried && e.artTried.label) {
        let t = { ...e.artTried };
        delete t.label, (e.artTried = t);
      }
    (R = N(R, { migrated: { labelIndex: !0 } })), K(), Lt();
  }
  if (I.preview) {
    let e = new URLSearchParams(location.search);
    e.get(`theme`) && (R.ui.theme = e.get(`theme`)),
      e.get(`hints`) && (R.ui.hints = e.get(`hints`)),
      e.get(`hintColor`) && (R.ui.hintColor = e.get(`hintColor`)),
      e.get(`defaultView`) && (R.ui.defaultView = e.get(`defaultView`));
  }
  if (
    (G(
      `start`,
      I.manufacturer,
      I.model,
      `iOS ${I.release}`, I.ios && I.ios.inLiveContainer ? `in LiveContainer (${I.ios.lcScheme})` : `standalone`,
      `allFiles=${I.allFiles}`,
    ),
    I.screen)
  ) {
    let e = I.screen,
      t = i(e);
    G(
      `screen`,
      `${e.w}x${e.h}px`,
      `dpi ${Math.round(e.xdpi)}/${Math.round(e.ydpi)}`,
      `density ${e.density}`,
      `window ${innerWidth}x${innerHeight}`,
      t ? `small handheld` : ``,
    ),
      n(t);
  }
  let a = await Rt(`running`);
  return (
    a && a.id && z.games[a.id] && Date.now() - a.startedAt < 216e5
      ? (B = a)
      : a && Pt(),
    x.addListener(`pad`, ({ b: e, d: t }) => r(e, t)),
    x.addListener(`padDevice`, ({ name: e }) => o(e)),
    x.addListener(`back`, () => {
      e(`b`, { source: `back` }) || x.moveToBack();
    }),
    x.addListener(`resume`, () => Ut()),
    x.addListener(`pause`, () => {
      !B && !V && F(`app:background`);
    }),
    x.addListener(`companion`, (e) => F(`companion`, e)),
    x.addListener(`url`, onIncomingUrl),
    mergeAppGames(),
    x.addListener(`displays`, (e) => {
      F(`displays`, e),
        e &&
          e.available &&
          R.ui.secondScreen !== `off` &&
          x.secondScreenShow().catch(() => {});
    }),
    R.ui.secondScreen !== `off` &&
      x.secondScreenShow &&
      x.secondScreenShow().catch(() => {}),
    Dt(),
    I.allFiles && !R.romRoots.length
      ? Vt()
      : I.allFiles &&
        Object.keys(z.games).length &&
        R.behavior.scrapeAfterScan &&
        setTimeout(() => Wt({}).catch((e) => G(`scrape`, e.message)), 4e3),
    !0
  );
}
async function Vt() {
  let e = await Ve(I.volumes || []);
  return e.length
    ? ((R = N(R, { romRoots: e })),
      K(),
      G(`found ROM folders`, e.join(`, `)),
      F(`settings:changed`, R),
      Q().catch((e) => G(`scan`, e.message)),
      !0)
    : !1;
}
async function Ht() {
  try {
    I = { ...I, ...(await x.info()) };
  } catch {}
  return I;
}
async function Ut() {
  if (((U = null), B)) {
    let e = B;
    (B = null), Pt();
    let t = Math.max(1, Math.round((Date.now() - e.startedAt) / 1e3)),
      n = z.games[e.id],
      r = t >= 5 && !e.warmup,
      i =
        n && r
          ? Y(e.id, {
              lastPlayed: Date.now(),
              playtime: (n.playtime || 0) + t,
              plays: (n.plays || 0) + 1,
              historyHidden: !1,
            })
          : n;
    G(`back from game`, n ? n.title : e.id, `${t}s`, r ? `` : `(not counted)`),
      F(`game:exited`, { id: e.id, game: i, session: t });
    return;
  }
  if (V) {
    let e = V;
    (V = null),
      G(`back from`, e.id, `${Math.round((Date.now() - e.startedAt) / 1e3)}s`),
      F(`external:exited`, { id: e.id });
    return;
  }
  if ((F(`app:foreground`), H)) {
    await Ht();
    let e = H;
    if (((H = null), !I.allFiles)) return;
    if (e === `addRoot`) {
      if (!R.romRoots.length && (await Vt())) return;
      Gt();
    } else e === `scan` && (R.romRoots.length ? Q() : Vt());
  }
}
async function Z(e) {
  return await Ht(), I.allFiles ? !0 : ((H = e), await x.requestAllFiles(), !1);
}
async function Q() {
  if (!(await Z(`scan`))) return Object.values(z.games);
  let e = await Be(R, z.games);
  return (
    (z = { ...z, games: e, scannedAt: Date.now() }),
    mergeAppGames(),
    G(`scan: ${Object.keys(e).length} games`),
    R.behavior.scrapeAfterScan && Wt({}).catch((e) => G(`scrape`, e.message)),
    Object.values(z.games)
  );
}
async function Wt({ system: e, ids: t, force: n = !1, retry: r = !1 } = {}) {
  if (Mt) return { busy: !0 };
  Mt = !0;
  try {
    let i = Object.values(z.games);
    e && (i = i.filter((t) => t.system === e)),
      t && (i = i.filter((e) => t.includes(e.id))),
      await Nt.run(i, {
        kinds: [
          ...R.behavior.artKinds,
          ...(R.behavior.realLabels === !1 ? [] : [`label`]),
        ],
        regionPref: R.behavior.regionPref,
        force: n,
        retry: r,
        systems: m,
        onProgress: (e) => F(`scrape:progress`, e),
        onGame: (e, t) => {
          let n = Y(e, t);
          n && F(`games:patch`, [n]);
        },
      });
  } finally {
    Mt = !1;
  }
  return { ok: !0 };
}
async function Gt() {
  if (!(await Z(`addRoot`))) return R;
  let e = await x.pickFolder().catch(() => ({ cancelled: !0 }));
  if (e.cancelled) return R;
  if (!e.path) throw Error(`Pick a folder on the phone’s storage or SD card.`);
  return (
    J({ romRoots: [] }),
    (R = N(R, { romRoots: [...new Set([...R.romRoots, e.path])] })),
    K(),
    F(`settings:changed`, R),
    Q().catch((e) => G(`scan`, e.message)),
    R
  );
}
async function Kt() {
  return detect();
}
var qt = (e, t) => e.find((e) => t[e]) || null;
function Jt(e) {
  let t = Object.values(z.games).find((t) => t.system === e && t.sysDir);
  return t ? t.sysDir.slice(t.sysDir.lastIndexOf(`/`) + 1) : null;
}
var whereLabel = (e) =>
  e.where === `livecontainer` ? `LiveContainer` : e.where === `appstore` ? `App Store` : `SideStore`;
function emuState(e, t) {
  let n = IOS_EMUS[e],
    r = emuCfg(e);
  return {
    id: e,
    name: n.name,
    target: resolveTarget(r, n, t),
    jit: r.jit === void 0 ? !!n.jit : !!r.jit,
    needsJit: !!n.needsJit,
  };
}
function Yt(e, t) {
  let n = _t[e.id] || [],
    r = R.systemBackend[e.id] || `auto`,
    i = { choice: r, candidates: n, switcher: !1, bios: [], cores: [] },
    a = (r) => {
      let a = IOS_EMUS[r] && emuState(r, t);
      return a && a.target
        ? {
            ...i,
            kind: `standalone`,
            emu: r,
            name: a.name,
            entry: r,
            ios: !0,
            where: a.target.where,
            jit: a.jit,
            needsFolder: !1,
            sysDirName: Jt(e.id),
          }
        : null;
    },
    o = (e) => ({ ...i, kind: `none`, reason: e, fix: null });
  if (r !== `auto` && r !== `retroarch`)
    return a(r) || o(`${IOS_EMUS[r] ? IOS_EMUS[r].name : r} isn’t set up yet — Settings › Emulators.`);
  for (let e of r === `retroarch` ? [`retroarch`] : n) {
    let t = a(e);
    if (t) return t;
  }
  return n.length
    ? o(`Install ${IOS_EMUS[n[0]].name} (through SideStore or in LiveContainer), then set it up in Settings › Emulators.`)
    : o(`No iOS emulator for ${e.short} yet.`);
}
async function $() {
  let e = await Kt(),
    t = {};
  for (let [n, r] of Object.entries(IOS_EMUS)) {
    let i = emuState(n, e);
    t[n] = {
      id: n,
      name: r.name,
      app: i.target ? `${r.name} · ${whereLabel(i.target)}${i.target.detected ? `` : ` (not checked)`}` : null,
      entry: i.target ? n : null,
      store: null,
      systems: r.systems,
      target: i.target,
      jit: i.jit,
      needsJit: i.needsJit,
    };
  }
  let n = {};
  for (let t of p) n[t.id] = Yt(t, e);
  let r = {};
  for (let t of a) {
    let n = IOS_STREAMING[t.id] || {},
      i = n.schemes || n.bundleIds ? resolveTarget({}, n, e) : null;
    r[t.id] = { id: t.id, name: t.name, app: i ? t.name : null, pkg: t.id, web: n.web || t.web || null, target: i };
  }
  return {
    android: !0,
    ios: !0,
    retroarch: { app: null, entry: null, cores: [], store: null },
    standalone: t,
    systems: n,
    apps: r,
    lc: e.lc,
    inLC: inLC(),
  };
}
async function startSession(e, t, n) {
  let r = await t();
  if (!r.ok) return { ok: !1, error: r.error || `It didn’t open.` };
  // The first press of a two-step JIT launch only starts the emulator: it isn't counted as play.
  return (
    (B = { id: e, startedAt: Date.now(), warmup: !!r.note }),
    await x.writeText({ path: `${L.base}/running.json`, text: JSON.stringify(B) }).catch(() => {}),
    { ok: !0, backend: { ...n, android: !0, note: r.note } }
  );
}
async function Xt(e) {
  if ((await X(), B)) return { ok: !1, error: `A game is already running.` };
  let t = z.games[e];
  if (!t) return { ok: !1, error: `That game isn’t in the library any more — try a rescan.` };
  if (t.native) {
    let n = iosApps().find((t) => `app:${t.id}` === e);
    return n
      ? startSession(e, () => launchAppEntry(n), { kind: `standalone`, name: n.name })
      : { ok: !1, error: `That game was removed from Settings › Emulators.` };
  }
  let n = await Kt(),
    r = Yt(m[t.system], n);
  if (r.kind === `none`) return { ok: !1, error: r.reason };
  let i = emuState(r.emu, n),
    o = await gameLink(r.emu, t).catch((e) => (G(`link`, e.message), null));
  if (o && o.missing)
    return {
      ok: !1,
      error: `${i.name} hasn’t shared its game list yet. Settings › Emulators › ${i.name} › Import game list.`,
    };
  // No way to start a game directly: hand the file over with "Open in…" if the player asked for that.
  if (!o && emuCfg(r.emu).openIn) {
    let e = await x.share({ path: t.path });
    return e.ok ? { ok: !0, backend: r } : { ok: !1, error: `Cancelled.` };
  }
  let a = await planLaunch(i.target, { jit: i.jit, link: o, key: r.emu, name: i.name });
  return (
    G(`launch`, t.title, `${i.name} · ${whereLabel(i.target)} · JIT ${i.jit ? `on` : `off`}`, JSON.stringify(a)),
    startSession(e, () => runPlan(a), r)
  );
}
function Zt() {
  return R.music.folder || `${I.primary}/Music/Cartridge`;
}
async function Qt() {
  await X();
  let e = Zt(),
    t = [];
  try {
    let n = await x.listDir({ path: e });
    t = n.ok ? n.entries : [];
  } catch {}
  return {
    folder: e,
    tracks: t
      .filter((e) => !e.dir && At.has(S(e.name)) && !e.name.startsWith(`.`))
      .sort((e, t) => e.name.localeCompare(t.name))
      .map((t) => ({
        title: Me(t.name),
        url: b(`${e}/${t.name}`),
        file: `${e}/${t.name}`,
      })),
  };
}
// ---- iOS settings rows ----------------------------------------------------
// Built from the same row types the rest of Settings uses (header, info, choice,
// toggle, button), so the screens keep Cartridge's look and controller navigation.

async function ask(e) {
  if (x.prompt) return x.prompt(e);
  let t = window.prompt(`${e.title}${e.message ? `\n${e.message}` : ``}`, e.value || ``);
  return t === null ? { cancelled: !0 } : { cancelled: !1, value: t };
}

async function pick(e, t, n) {
  if (x.choose) return (await x.choose({ title: e, message: n, options: t })).index;
  let r = window.prompt(`${e}\n${t.map((e, t) => `${t + 1}. ${e}`).join(`\n`)}`, `1`);
  return r === null ? -1 : Number(r) - 1;
}

var whereOptions = [
  { value: `auto`, label: `Find automatically` },
  { value: `sidestore`, label: `SideStore / AltStore` },
  { value: `livecontainer`, label: `LiveContainer` },
  { value: `none`, label: `Not installed` },
];

function newAppId() {
  return Math.random().toString(36).slice(2, 10);
}

// Walks the player through adding an App Store game, a port or any other app.
async function addAppFlow(e) {
  let t = [`Installed with SideStore / AltStore`, `From the App Store`, `In LiveContainer`],
    n = await pick(`Where is it installed?`, t);
  if (n < 0) return null;
  let r = [`sidestore`, `appstore`, `livecontainer`][n],
    i = { id: newAppId(), install: r, jit: !1, kind: e };
  if (r === `livecontainer` && inLC()) {
    let e = (await lcAppList()).filter((e) => e.bundleId !== (I.ios && I.ios.bundleId));
    if (e.length) {
      let t = await pick(`Pick the app`, e.map((e) => e.name));
      if (t < 0) return null;
      let n = e[t];
      Object.assign(i, {
        name: n.name,
        bundleId: n.bundleId,
        lcBundle: n.bundleName,
        container: n.container,
        icon: n.icon || null,
        jit: !!n.jit,
      });
    }
  } else if (r !== `livecontainer`) {
    let e = (await x.deviceApps().catch(() => ({ apps: [] }))).apps || [];
    if (e.length) {
      e.sort((e, t) => e.name.localeCompare(t.name));
      let t = await pick(`Pick the app`, [...e.map((e) => e.name), `Type the bundle ID…`]);
      if (t < 0) return null;
      t < e.length && Object.assign(i, { name: e[t].name, bundleId: e[t].bundleId });
    }
  }
  if (!i.bundleId) {
    let e = await ask({
      title: `Bundle ID`,
      message:
        r === `livecontainer`
          ? `The app’s bundle ID as LiveContainer shows it (long-press the app › Settings).`
          : `For example com.example.game. SideStore adds your team ID — Cartridge adds that for you.`,
      placeholder: `com.example.game`,
    });
    if (e.cancelled || !e.value.trim()) return null;
    i.bundleId = e.value.trim();
    r === `livecontainer` && (i.lcBundle = `${i.bundleId}.app`);
  }
  if (!i.name) {
    let e = await ask({ title: `Name`, message: `How it should be labelled on the shelf.`, value: i.bundleId.split(`.`).pop() });
    if (e.cancelled) return null;
    i.name = e.value.trim() || i.bundleId;
  }
  return i;
}

async function editAppFlow(e, t) {
  let n = iosApps(),
    r = n.find((t) => t.id === e);
  if (!r) return;
  let i = [
      r.kind === `game` ? `Move to Apps only` : `Show on the game shelf`,
      `Rename`,
      `Change bundle ID`,
      `Change where it’s installed`,
      `Open with a link instead (URL scheme)`,
      `Remove`,
    ],
    a = await pick(r.name, i),
    o = { ...r };
  if (a === 0) o.kind = r.kind === `game` ? `app` : `game`;
  else if (a === 1) {
    let e = await ask({ title: `Name`, value: r.name });
    if (e.cancelled) return;
    o.name = e.value.trim() || r.name;
  } else if (a === 2) {
    let e = await ask({ title: `Bundle ID`, value: r.bundleId });
    if (e.cancelled) return;
    o.bundleId = e.value.trim();
    o.install === `livecontainer` && (o.lcBundle = `${o.bundleId}.app`);
  } else if (a === 3) {
    let e = await pick(`Where is it installed?`, [`SideStore / AltStore`, `App Store`, `LiveContainer`]);
    if (e < 0) return;
    o.install = [`sidestore`, `appstore`, `livecontainer`][e];
    o.install === `livecontainer` && !o.lcBundle && (o.lcBundle = `${o.bundleId}.app`);
  } else if (a === 4) {
    let e = await ask({
      title: `Link`,
      message: `Optional link that opens it straight into the game, e.g. mygame://play. Leave empty to just open the app.`,
      value: r.url || ``,
    });
    if (e.cancelled) return;
    o.url = e.value.trim() || null;
  } else if (a === 5) {
    if (x.confirm && !(await x.confirm({ title: `Remove ${r.name}?`, ok: `Remove` })).ok) return;
    return setApps(n.filter((t) => t.id !== e));
  } else return;
  return setApps(n.map((t) => (t.id === e ? o : t)));
}

function iosRows(e, t) {
  let { s: n, set: r, run: i, emu: a, d: o, st: s, refreshEmu: c, setEmu: l } = t,
    u = n.ios || {},
    d = (e) => r({ ios: e }).then(() => c()),
    f = (e, t) => d({ emus: { [e]: t } }),
    p = [];
  if (e === `emulators`) {
    let e = I && I.ios ? I.ios : {};
    p.push({ type: `header`, label: `This device` }),
      p.push({
        type: `info`,
        label: `Cartridge is running`,
        value: e.inLiveContainer ? `Inside LiveContainer (${e.lcScheme})` : `On its own (SideStore / AltStore)`,
      }),
      p.push({
        key: `ios-team`,
        type: `button`,
        label: `SideStore team ID`,
        desc: teamSuffix()
          ? `Bundle IDs of SideStore apps end in ${teamSuffix()}. Cartridge adds it for you.`
          : `If SideStore renamed your apps (com.app.ID.ABCDE12345), enter the part after the last dot.`,
        button: `Edit`,
        icon2: `pad`,
        act: () =>
          i(`ios-team`, async () => {
            let e = await ask({ title: `SideStore team ID`, value: (u.teamSuffix || teamSuffix()).replace(/^\./, ``), placeholder: `ABCDE12345` });
            e.cancelled || (await d({ teamSuffix: e.value.trim() }));
          }),
      });
    p.push({ type: `header`, label: `JIT · StikDebug` }),
      p.push({
        key: `ios-stik`,
        type: `choice`,
        label: `StikDebug is installed`,
        desc:
          u.stikdebug === `livecontainer`
            ? `In LiveContainer, as a shared app. Convert it to a shared app in LiveContainer (long-press › Convert to shared app).`
            : `With SideStore / AltStore. Keep LocalDevVPN on and your pairing file in StikDebug.`,
        options: [
          { value: `sidestore`, label: `SideStore / AltStore` },
          { value: `livecontainer`, label: `LiveContainer` },
        ],
        value: u.stikdebug || `sidestore`,
        change: (e) => d({ stikdebug: e }),
      }),
      u.stikdebug === `livecontainer` &&
        p.push({
          key: `ios-stiklc`,
          type: `choice`,
          label: `StikDebug runs in`,
          desc: inLC()
            ? `Must be a different LiveContainer than Cartridge’s (${ownLcScheme()}) — StikDebug restarts that one to switch JIT on. Install LiveContainer2 or turn on multitasking.`
            : `The LiveContainer copy that opens StikDebug.`,
          options: [
            { value: `auto`, label: `Automatic (${stikLcScheme()})` },
            { value: `livecontainer`, label: `LiveContainer` },
            { value: `livecontainer2`, label: `LiveContainer 2` },
            { value: `livecontainer3`, label: `LiveContainer 3` },
          ],
          value: u.stikLcScheme || `auto`,
          change: (e) => d({ stikLcScheme: e }),
        }),
      p.push({
        key: `ios-handoff`,
        type: `choice`,
        label: `Opening a game with JIT`,
        desc:
          u.handoff === `shortcut`
            ? `Automatic: the “${u.shortcutName || `Cartridge Launch`}” shortcut asks StikDebug for JIT, waits, then opens the game. Apps in LiveContainer always do this in one step.`
            : `Two presses: the first starts the emulator with JIT, come back and press A again to load the game. Apps in LiveContainer do it in one step.`,
        options: [
          { value: `twostep`, label: `Two presses (no setup)` },
          { value: `shortcut`, label: `Shortcut (one press)` },
        ],
        value: u.handoff || `twostep`,
        change: (e) => d({ handoff: e }),
      }),
      u.handoff === `shortcut` &&
        p.push({
          key: `ios-shortcut`,
          type: `button`,
          label: `Shortcut name`,
          desc: `${u.shortcutName || `Cartridge Launch`} · waits ${u.handoffDelay || 3}s between JIT and the game. The README shows how to build it (4 actions).`,
          button: `Edit`,
          icon2: `bolt`,
          act: () =>
            i(`ios-shortcut`, async () => {
              let e = await ask({ title: `Shortcut name`, value: u.shortcutName || `Cartridge Launch` });
              if (e.cancelled) return;
              let t = await ask({ title: `Seconds to wait`, message: `Time StikDebug needs before the game link opens.`, value: String(u.handoffDelay || 3) });
              await d({ shortcutName: e.value.trim() || `Cartridge Launch`, handoffDelay: Math.max(1, Number(t.value) || 3) });
            }),
        }),
      p.push({
        key: `ios-stikopen`,
        type: `button`,
        label: `Open StikDebug`,
        desc: `Check the VPN, pairing file and Developer Disk Image are ready.`,
        button: `Open`,
        icon2: `external`,
        act: () =>
          i(`ios-stikopen`, async () => {
            let e =
              u.stikdebug === `livecontainer`
                ? `${stikLcScheme()}://open-url?url=${encodeURIComponent(b64(`stikjit://`))}`
                : `stikjit://`;
            let t = await x.launch({ url: e });
            if (!t.ok) throw Error(t.error);
          }),
      });
    p.push({ type: `header`, label: `Systems` });
    let t = new Set(s.games.map((e) => e.system));
    for (let e of o.systems.map((e) => e.id)) {
      let n = o.sysById[e],
        i = a && a.systems[e];
      if (!n || !i || !t.has(e) || e === `ports`) continue;
      let s = [{ value: `auto`, label: `Automatic` }, ...(i.candidates || []).map((e) => ({ value: e, label: `${IOS_EMUS[e].name}${a.standalone[e] && a.standalone[e].target ? `` : ` (not set up)`}` }))];
      p.push({
        key: `be:${e}`,
        type: `choice`,
        label: n.name,
        tone: i.kind === `none` ? `warn` : void 0,
        desc: i.kind === `none` ? i.reason : `${i.name} · ${i.where === `livecontainer` ? `LiveContainer` : `SideStore`} · JIT ${i.jit ? `on` : `off`}`,
        options: s,
        value: s.some((t) => t.value === R.systemBackend[e]) ? R.systemBackend[e] : `auto`,
        change: (t) => r({ systemBackend: { [e]: t } }).then(() => c()),
      });
    }
    p.push({ type: `header`, label: `Emulators` });
    for (let [e, t] of Object.entries(IOS_EMUS)) {
      let n = (a && a.standalone[e]) || {},
        r = (u.emus || {})[e] || {},
        o = n.target;
      p.push({
        key: `emu:${e}`,
        type: `choice`,
        label: t.name,
        tone: o ? `good` : `plain`,
        desc: o
          ? `${whereLabel(o)}${o.detected ? `` : ` · not checked`} · ${o.where === `livecontainer` ? o.lcBundle : o.bundleId}${t.note ? ` — ${t.note}` : ``}`
          : `${t.systems.map((e) => (s.systems.find((t) => t.id === e) || {}).short || e).join(`, `)}${t.needsJit ? ` · needs JIT` : ``}`,
        options: whereOptions,
        value: r.install || `auto`,
        change: (t) => f(e, { install: t }),
      });
      if (!o) continue;
      p.push({
        key: `jit:${e}`,
        type: `toggle`,
        label: `${t.name} · JIT`,
        desc: n.jit
          ? `Opens through StikDebug${o.where === `livecontainer` ? ` (LiveContainer’s JIT setting)` : ``}.`
          : t.needsJit
            ? `Off — ${t.name} won’t run games without JIT.`
            : `Off — opens instantly, no StikDebug.`,
        value: !!n.jit,
        change: () => f(e, { jit: !n.jit }),
      }),
        p.push({
          key: `bid:${e}`,
          type: `button`,
          label: `${t.name} · bundle ID`,
          desc: o.where === `livecontainer` ? `LiveContainer app folder: ${o.lcBundle}` : o.bundleId,
          button: `Edit`,
          icon2: `pad`,
          act: () =>
            i(`bid:${e}`, async () => {
              if (o.where === `livecontainer` && inLC()) {
                let t = await lcAppList(),
                  n = await pick(`Which LiveContainer app is ${IOS_EMUS[e].name}?`, t.map((e) => `${e.name} (${e.bundleId})`));
                if (n < 0) return;
                return f(e, { bundleId: t[n].bundleId, lcBundle: t[n].bundleName, container: t[n].container });
              }
              let t = await ask({ title: `${IOS_EMUS[e].name} bundle ID`, value: r.bundleId || (IOS_EMUS[e].bundleIds || [])[0] });
              t.cancelled || (await f(e, { bundleId: t.value.trim(), lcBundle: o.where === `livecontainer` ? `${t.value.trim()}.app` : void 0 }));
            }),
        }),
        t.exportLibrary &&
          p.push({
            key: `imp:${e}`,
            type: `button`,
            label: `${t.name} · import game list`,
            desc: `${Object.keys((u.titles || {})[e] || {}).length} games known. ${t.name} opens and sends its list back to Cartridge.`,
            button: `Import`,
            icon2: `refresh`,
            act: () =>
              i(`imp:${e}`, async () => {
                let n = await runPlan(await planLaunch(o, { jit: !1, link: t.exportLibrary, key: `imp:${e}`, name: t.name }));
                if (!n.ok) throw Error(n.error);
              }),
          }),
        !t.game &&
          p.push({
            key: `oi:${e}`,
            type: `toggle`,
            label: `${t.name} · send the file with Open in…`,
            desc: `${t.name} has no link to start a game. On: Cartridge shows Open in… with the game file. Off: it opens ${t.name} and you pick the game there.`,
            value: !!r.openIn,
            change: () => f(e, { openIn: !r.openIn }),
          }),
        p.push({
          key: `open:${e}`,
          type: `button`,
          label: `Open ${t.name}`,
          button: `Open`,
          icon2: `external`,
          act: () =>
            i(`open:${e}`, async () => {
              let t = await $t.openEmulator(e);
              if (t && !t.ok) throw Error(t.error);
            }),
        });
    }
    p.push({ type: `header`, label: `iOS games, ports & apps` });
    for (let [e, t] of [
      [`game`, `Add an iOS game or port`],
      [`app`, `Add an app`],
    ])
      p.push({
        key: `add:${e}`,
        type: `button`,
        label: t,
        desc:
          e === `game`
            ? `App Store games, ports and anything from LiveContainer — they get their own shelf next to your consoles.`
            : `Shows up in Apps. Works for SideStore, App Store and LiveContainer apps.`,
        button: `Add`,
        icon2: `plus`,
        primary: e === `game`,
        act: () =>
          i(`add:${e}`, async () => {
            let t = await addAppFlow(e);
            t && (setApps([...iosApps(), t]), c());
          }),
      });
    for (let e of iosApps()) {
      p.push({
        key: `app:${e.id}`,
        type: `button`,
        label: e.name,
        desc: `${e.kind === `game` ? `Game shelf` : `Apps`} · ${e.install === `livecontainer` ? `LiveContainer` : e.install === `appstore` ? `App Store` : `SideStore`} · ${e.bundleId}`,
        button: `Edit`,
        icon2: `pad`,
        act: () => i(`app:${e.id}`, async () => (await editAppFlow(e.id), c())),
      }),
        e.install !== `appstore` &&
          p.push({
            key: `appjit:${e.id}`,
            type: `toggle`,
            label: `${e.name} · JIT`,
            desc: e.jit ? `Opens through StikDebug.` : `Off — opens instantly.`,
            value: !!e.jit,
            change: () => (setApps(iosApps().map((t) => (t.id === e.id ? { ...t, jit: !t.jit } : t))), c()),
          });
    }
    return (
      p.push({
        type: `info`,
        label: `App Store apps`,
        value: `Open instantly. iOS doesn’t allow JIT for them.`,
      }),
      p
    );
  }
  if (e === `playing`) {
    let e = n.behavior;
    return [
      {
        key: `swafter`,
        type: `toggle`,
        label: `Open the Game Switcher after playing`,
        desc: `When you come back from an emulator.`,
        value: e.switcherAfterGame,
        change: () => r({ behavior: { switcherAfterGame: !e.switcherAfterGame } }),
      },
      {
        key: `resstart`,
        type: `toggle`,
        label: `Resume last game when Cartridge opens`,
        value: e.resumeOnStart,
        change: () => r({ behavior: { resumeOnStart: !e.resumeOnStart } }),
      },
      { type: `info`, label: `Save states`, value: `Handled inside each emulator on iOS` },
      { type: `info`, label: `Play time`, value: `Counted while you’re away from Cartridge` },
    ];
  }
  if (e === `about`) {
    let e = s.device || {},
      t = I && I.ios ? I.ios : {};
    return [
      { type: `info`, label: `Cartridge`, value: `v${s.version || Ot} · iOS port` },
      { type: `info`, label: `Device`, value: `${e.model || ``} · iOS ${e.release || ``}` },
      {
        type: `info`,
        label: `Installed`,
        value: t.inLiveContainer ? `Inside LiveContainer (${t.lcScheme})` : `${t.bundleId || ``}`,
      },
      { type: `info`, label: `Library`, value: `${s.games.length} games · ${o.systems.length} systems` },
      { type: `info`, label: `Your games`, value: `Files › On My iPhone › Cartridge › ROMs` },
      {
        key: `fps`,
        type: `toggle`,
        label: `Show frame rate`,
        desc: `A small readout at the bottom of the screen.`,
        value: !!n.ui.showFps,
        change: () => r({ ui: { showFps: !n.ui.showFps } }),
      },
      {
        key: `quit`,
        type: `button`,
        label: `Close Cartridge`,
        button: `Close`,
        icon2: `power`,
        act: () => $t.quitApp(),
      },
    ];
  }
  return null;
}

var $t = {
  isElectron: !1,
  isAndroid: !0,
  async getState() {
    return (
      await X(),
      {
        settings: P(R),
        systems: p.map(
          ({
            id: e,
            name: t,
            short: n,
            maker: r,
            year: i,
            color: a,
            media: o,
            handheld: s,
            heavy: c,
            thumbs: l,
            cores: u,
            standalone: d,
          }) => ({
            id: e,
            name: t,
            short: n,
            maker: r,
            year: i,
            color: a,
            media: o,
            handheld: !!s,
            heavy: !!c,
            hasArt: !!l,
            cores: u,
            standalone: d,
          }),
        ),
        games: Object.values(z.games),
        running: null,
        fullscreen: !0,
        platform: `android`,
        arch: `arm64`,
        version: I.version || Ot,
        device: {
          model: I.model,
          manufacturer: I.manufacturer,
          release: I.release,
          allFiles: I.allFiles,
        },
        paths: { userData: L.base },
      }
    );
  },
  async setSettings(e) {
    await X();
    let t = JSON.stringify({ r: R.romRoots, f: R.systemFolders });
    return (
      J(e),
      (R = N(R, e || {})),
      K(),
      JSON.stringify({ r: R.romRoots, f: R.systemFolders }) !== t &&
        Q().catch((e) => G(`scan`, e.message)),
      P(R)
    );
  },
  scan: () => X().then(Q),
  async settingsHistory() {
    return await X(), f(q);
  },
  async restoreSettings(e) {
    await X();
    let t = q.find((t) => t.at === e);
    return t
      ? ((q = d(q, R, `before restore`, Date.now())),
        It(`settings-history`, () => ({ list: q })),
        (R = N(P(kt), P(t.settings))),
        K(),
        G(`settings restored from`, new Date(e).toISOString()),
        F(`settings:changed`, R),
        Q().catch((e) => G(`scan`, e.message)),
        P(R))
      : P(R);
  },
  addRomRoot: () => X().then(Gt).then(P),
  async removeRomRoot(e) {
    return (
      J({ romRoots: [] }),
      (R = N(R, { romRoots: R.romRoots.filter((t) => t !== e) })),
      K(),
      Q().catch((e) => G(`scan`, e.message)),
      P(R)
    );
  },
  async addSystemFolder(e) {
    if ((await X(), !(await Z(null)))) return P(R);
    let t = await x.pickFolder().catch(() => ({ cancelled: !0 }));
    if (t.cancelled || !t.path) return P(R);
    let n = R.systemFolders[e] || [];
    return (
      J({ systemFolders: {} }),
      (R = N(R, { systemFolders: { [e]: [...new Set([...n, t.path])] } })),
      K(),
      Q().catch((e) => G(`scan`, e.message)),
      P(R)
    );
  },
  async removeSystemFolder(e, t) {
    let n = (R.systemFolders[e] || []).filter((e) => e !== t);
    return (
      J({ systemFolders: {} }),
      (R = N(R, { systemFolders: { [e]: n } })),
      K(),
      Q().catch((e) => G(`scan`, e.message)),
      P(R)
    );
  },
  launch: Xt,
  async quitGame() {
    return B ? ((B = { ...B }), await Ut(), !0) : !1;
  },
  async setFavorite(e, t) {
    return Y(e, { fav: !!t });
  },
  async hideFromHistory(e) {
    return Y(e, { historyHidden: !0 });
  },
  async resetState(e) {
    return Y(e, { lastState: null });
  },
  async reveal() {},
  scrape: (e) => X().then(() => Wt(e || {})),
  async cancelScrape() {
    Nt && Nt.cancel();
  },
  emulatorStatus: () => X().then($),
  async locateEmulator() {
    return (U = null), (lcAppsCache = null), $();
  },
  async installCore() {
    return { ok: !1, error: `Cores are managed inside each iOS emulator.`, status: await $() };
  },
  async openEmulator(e) {
    let t = await Kt(),
      n = IOS_EMUS[e] && emuState(e, t);
    if (!n || !n.target) return { ok: !1, error: `Set up where ${(IOS_EMUS[e] || {}).name || e} is installed first.` };
    return runPlan(await planLaunch(n.target, { jit: n.jit, link: null, key: e, name: n.name }));
  },
  async getEmulator(e) {
    let t = IOS_STREAMING[e];
    if (t && t.web) return x.openUrl({ url: t.web });
    let n = (IOS_EMUS[e] || { name: e }).name;
    return x.openUrl({ url: `https://www.google.com/search?q=${encodeURIComponent(`${n} iOS IPA`)}` });
  },
  async setFullscreen() {
    return !0;
  },
  async isFullscreen() {
    return !0;
  },
  async quitApp() {
    await x.exitApp();
  },
  // Apps screen: your iOS apps/games plus everything inside LiveContainer (when Cartridge runs there).
  async listApps() {
    await X();
    let e = iosApps().map((e) => ({ package: `ios:${e.id}`, label: e.name, icon: e.icon ? b(e.icon) : null })),
      t = new Set(iosApps().map((e) => e.lcBundle).filter(Boolean));
    for (let n of await lcAppList())
      t.has(n.bundleName) ||
        n.bundleId === (I.ios && I.ios.bundleId) ||
        e.push({ package: `lc:${n.bundleName}`, label: n.name, icon: n.icon ? b(n.icon) : null });
    return e.sort((e, t) => e.label.localeCompare(t.label, void 0, { sensitivity: `base` }));
  },
  async drawAppIcons() {
    return {};
  },
  async openApp(e) {
    await X();
    let t;
    if (e.startsWith(`ios:`)) {
      let n = iosApps().find((t) => `ios:${t.id}` === e);
      t = n ? await launchAppEntry(n) : { ok: !1, error: `That app was removed.` };
    } else if (e.startsWith(`lc:`)) {
      let n = (await lcAppList()).find((t) => `lc:${t.bundleName}` === e);
      t = n
        ? await runPlan(
            await planLaunch(
              { where: `livecontainer`, bundleId: n.bundleId, lcBundle: n.bundleName, container: n.container, lcScheme: ownLcScheme() },
              { jit: !!n.jit, link: null, key: e, name: n.name },
            ),
          )
        : { ok: !1, error: `Not found in LiveContainer any more.` };
    } else t = await x.launch({ bundleId: e });
    return !t || !t.ok
      ? { ok: !1, error: (t && t.error) || `Couldn’t open it.` }
      : (t.note && F(`toast`, t.note),
        (V = { id: `app:${e}`, startedAt: Date.now() }),
        F(`external:started`, { id: `app:${e}` }),
        { ok: !0 });
  },
  async launchExternal(e) {
    let t = (await $()).apps[e];
    if (!t || !t.target)
      return t && t.web
        ? (await x.openUrl({ url: t.web }), { ok: !0, web: !0 })
        : { ok: !1, error: `${(t && t.name) || e} isn’t installed.` };
    let n = await runPlan(await planLaunch(t.target, { jit: !1, link: null, key: e, name: t.name }));
    return n.ok
      ? ((V = { id: e, startedAt: Date.now() }), F(`external:started`, { id: e }), { ok: !0 })
      : { ok: !1, error: n.error };
  },
  setIosApps: (e) => X().then(() => setApps(e)),
  setIos: (e) => X().then(() => saveIos(e)),
  // Settings rows for the iOS-specific sections (same row types the rest of Settings uses).
  iosRows: (e, t) => iosRows(e, t),
  async openLogs() {
    return W.slice(-80).join(`
`);
  },
  async graphicsStatus() {
    return {
      pref: `auto`,
      mode: `default`,
      legacy: !1,
      accelerated: !0,
      feature: {},
      gpus: [],
    };
  },
  async relaunch() {
    location.reload();
  },
  async keyboardReference() {
    return [];
  },
  async applyKeyboardLayout() {
    return [];
  },
  async restoreKeyboardLayout() {
    return [];
  },
  async fixEmulator() {
    return { ok: !1, note: `Not needed on iOS.` };
  },
  async azaharStatus() {
    return null;
  },
  async dolphinStatus() {
    return null;
  },
  musicList: Qt,
  async musicOpen() {
    return Zt();
  },
  async musicAdd() {
    return (
      await X(),
      (await Z(null)) &&
        (await x
          .pickFiles({ mime: `audio/*`, destDir: Zt() })
          .catch(() => null)),
      Qt()
    );
  },
  async musicChooseFolder() {
    if ((await X(), !(await Z(null)))) return Qt();
    let e = await x.pickFolder().catch(() => ({ cancelled: !0 }));
    return (
      !e.cancelled &&
        e.path &&
        ((R = N(R, { music: { folder: e.path } })), K()),
      Qt()
    );
  },
  async permissionStatus() {
    return await Ht(), { allFiles: I.allFiles };
  },
  async secondScreenInfo() {
    try {
      return await x.secondScreenInfo();
    } catch {
      return { available: !1 };
    }
  },
  async setSecondScreen(e) {
    (R = N(R, { ui: { secondScreen: e ? `auto` : `off` } })), K();
    try {
      e ? await x.secondScreenShow() : await x.secondScreenHide();
    } catch {}
    return P(R);
  },
  companionPost(e) {
    x.secondScreenPost({ data: e }).catch(() => {});
  },
  async findRoms() {
    return (
      await Ht(),
      I.allFiles
        ? { ok: await Vt(), roots: R.romRoots }
        : { ok: !1, needsAccess: !0 }
    );
  },
  async requestAccess() {
    return Z(`scan`);
  },
  openUrl(e) {
    return x.openUrl({ url: e }).catch(() => {});
  },
  setHome() {
    return x.setHome().catch(() => null);
  },
  async deviceInfo() {
    return await X(), P(I);
  },
  fileUrl(e, t) {
    if (!t || !L) return null;
    if (e === `local`) return b(t);
    if (e === `media`) {
      let [e, n] = String(t).split(`?v=`);
      return `${b(`${L.media}/${e}`)}${n ? `?v=${n}` : ``}`;
    }
    return null;
  },
  on(e, t) {
    return (
      (jt[e] ||= []).push(t),
      () => {
        jt[e] = jt[e].filter((e) => e !== t);
      }
    );
  },
};
export { $t as default };
