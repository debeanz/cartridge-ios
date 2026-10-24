/* Cartridge — RetroAchievements add-on (prototype 1)
 *
 * Self-contained: no build step, no imports. Loaded by index.html after the app bundle.
 * The app calls   window.__ra.open(game, system)   from the game menu ("Achievements").
 * The app's input dispatcher calls   window.__raInput(name, meta)   first; while this
 * overlay is open it handles the input and returns true so nothing underneath reacts.
 *
 * Talks to the RetroAchievements Web API (https://api-docs.retroachievements.org):
 *   API_GetUserProfile, API_GetGameList, API_GetGameInfoAndUserProgress
 * The username and Web API key are kept in this device's localStorage only.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__ra) return;
  if (new URLSearchParams(location.search).get('screen') === 'companion') return; // not on the second screen

  var API = 'https://retroachievements.org/API/';
  var MEDIA = 'https://media.retroachievements.org';
  var CRED_KEY = 'cartridge.ra.v1';
  var LIST_KEY = 'cartridge.ra.list.';   // + consoleId
  var MATCH_KEY = 'cartridge.ra.match';  // { cartridgeGameId: raGameId }
  var LIST_TTL = 7 * 864e5;

  // Cartridge system id -> [RetroAchievements console id, name check]
  var CONSOLES = {
    genesis: [1, /genesis|mega drive/i], n64: [2, /nintendo 64/i], snes: [3, /snes|super nintendo/i],
    gb: [4, /^game boy$/i], gba: [5, /game boy advance/i], gbc: [6, /game boy color/i], nes: [7, /nes|famicom/i],
    pcengine: [8, /pc engine|turbografx/i], segacd: [9, /sega cd/i], sega32x: [10, /32x/i],
    mastersystem: [11, /master system/i], psx: [12, /^playstation$/i], lynx: [13, /lynx/i],
    ngp: [14, /neo geo pocket/i], ngpc: [14, /neo geo pocket/i], gamegear: [15, /game gear/i],
    gc: [16, /gamecube/i], nds: [18, /nintendo ds$/i], wii: [19, /^wii$/i], ps2: [21, /playstation 2/i],
    pokemini: [24, /pokemon mini/i], atari2600: [25, /atari 2600/i], arcade: [27, /arcade/i], neogeo: [27, /arcade/i],
    virtualboy: [28, /virtual boy/i], saturn: [39, /saturn/i], dreamcast: [40, /dreamcast/i],
    psp: [41, /playstation portable/i], atari7800: [51, /atari 7800/i], wonderswan: [53, /wonderswan/i],
    wonderswancolor: [53, /wonderswan/i], pcenginecd: [76, /pc engine cd|turbografx-cd/i]
  };

  /* ---------- storage ---------- */
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---------- network (native first: no CORS, works in the app; fetch as a fallback) ---------- */
  function nativeHttp() {
    var cap = window.Capacitor;
    var n = window.__cartridgeNative || (cap && cap.Plugins && cap.Plugins.CartridgeNative) || window.__fakeNative;
    if (n && typeof n.httpText === 'function') return function (url) { return n.httpText({ url: url }); };
    if (cap && typeof cap.nativePromise === 'function') return function (url) { return cap.nativePromise('CartridgeNative', 'httpText', { url: url }); };
    return null;
  }
  function httpJson(url) {
    var nat = nativeHttp();
    var p = nat
      ? nat(url).then(function (r) { if (!r || r.status < 200 || r.status >= 300) { var e = new Error('HTTP ' + (r && r.status)); e.status = r && r.status; throw e; } return r.text; })
      : fetch(url).then(function (r) { if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; } return r.text(); });
    return p.then(function (t) { try { return JSON.parse(t); } catch (e) { throw new Error('Unexpected reply from RetroAchievements'); } });
  }
  function api(name, params, cred) {
    var q = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
    return httpJson(API + name + '.php?y=' + encodeURIComponent(cred.key) + (q ? '&' + q : ''));
  }
  function friendly(err) {
    var s = err && err.status;
    if (s === 401 || s === 403 || s === 419) return 'RetroAchievements did not accept that username and key.';
    if (s === 404) return 'RetroAchievements could not find that.';
    if (s === 429) return 'RetroAchievements is rate-limiting requests. Try again in a minute.';
    if (s) return 'RetroAchievements answered with an error (' + s + ').';
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'You appear to be offline.';
    return 'Could not reach RetroAchievements.';
  }

  /* ---------- title matching ---------- */
  function norm(t) {
    return String(t || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/\s*[\[(][^\])]*[\])]/g, ' ')        // (USA), [Subset - ...]
      .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ')
      .replace(/\b(the|a|an)\b/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function grams(s) { var o = {}, n = 0; for (var i = 0; i < s.length - 1; i++) { var g = s.slice(i, i + 2); if (!o[g]) { o[g] = 1; n++; } } return { o: o, n: n }; }
  function dice(a, b) { if (!a.n || !b.n) return 0; var c = 0; for (var g in a.o) if (b.o[g]) c++; return 2 * c / (a.n + b.n); }
  function special(title) { return /^~[^~]+~/.test(title) || /\[subset/i.test(title); }  // hacks, homebrew, subsets
  function rank(list, title) {
    var want = norm(title), wg = grams(want), out = [];
    for (var i = 0; i < list.length; i++) {
      var it = list[i], n = it[3] || (it[3] = norm(it[1])), sc = n === want ? 1 : dice(wg, grams(n));
      if (special(it[1])) sc -= 0.2;
      if (sc > 0.45) out.push({ id: it[0], title: it[1], count: it[2], score: sc });
    }
    out.sort(function (a, b) { return b.score - a.score || b.count - a.count; });
    return out.slice(0, 12);
  }

  /* ---------- data ---------- */
  var mem = {};
  function consoleFor(system) { var c = system && CONSOLES[system.id]; return c ? c[0] : 0; }
  function gameList(consoleId, cred) {
    if (mem[consoleId]) return Promise.resolve(mem[consoleId]);
    var cached = lsGet(LIST_KEY + consoleId, null);
    if (cached && Date.now() - cached.at < LIST_TTL) return Promise.resolve(mem[consoleId] = cached.games);
    return api('API_GetGameList', { i: consoleId, f: 1, h: 0 }, cred).then(function (rows) {
      if (!Array.isArray(rows)) throw new Error('Unexpected reply from RetroAchievements');
      var games = rows.map(function (r) { return [r.ID, r.Title, r.NumAchievements || 0]; });
      if (games.length) lsSet(LIST_KEY + consoleId, { at: Date.now(), games: games });   // never cache an empty list
      else return games;
      return mem[consoleId] = games.map(function (g) { return g.slice(); });
    });
  }

  /* ---------- tiny DOM helper ---------- */
  function el(tag, props) {
    var n = document.createElement(tag), i, k;
    if (props) for (k in props) {
      if (k === 'class') n.className = props[k];
      else if (k === 'text') n.textContent = props[k];
      else if (k === 'style') n.setAttribute('style', props[k]);
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), props[k]);
      else if (props[k] != null) n.setAttribute(k, props[k]);
    }
    for (i = 2; i < arguments.length; i++) { var c = arguments[i]; if (c == null || c === false) continue; n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return n;
  }

  var CSS = [
    '.ra{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;background:var(--bg,#0b0b12);color:var(--text,#f2f1f6);font:inherit;--ra:var(--accent,#7b6cf0);animation:ra-in .16s ease-out}',
    '@keyframes ra-in{from{opacity:0;transform:translateY(.6rem)}to{opacity:1;transform:none}}',
    '.ra *{box-sizing:border-box}',
    '.ra__head{display:flex;align-items:center;gap:1rem;padding:1rem 1.4rem .9rem;border-bottom:1px solid var(--line,#ffffff1a)}',
    '.ra__icon{width:3.6rem;height:3.6rem;border-radius:.5rem;flex:none;background:var(--surface,#ffffff12);object-fit:cover}',
    '.ra__titles{flex:1;min-width:0}',
    '.ra__eyebrow{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3,#9a98a6);font-weight:700}',
    '.ra__title{font-family:var(--font-display,inherit);font-size:1.35rem;font-weight:800;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.ra__bar{height:.4rem;border-radius:99px;background:var(--surface-2,#ffffff1f);overflow:hidden;margin-top:.5rem;max-width:26rem}',
    '.ra__bar i{display:block;height:100%;background:var(--ra);border-radius:99px}',
    '.ra__sub{font-size:.82rem;color:var(--text-2,#c9c7d4);margin-top:.35rem}',
    '.ra__user{text-align:right;font-size:.8rem;color:var(--text-2,#c9c7d4);flex:none}',
    '.ra__user b{display:block;color:var(--text,#f2f1f6);font-size:.95rem}',
    '.ra__body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:.7rem 1rem 1rem}',
    '.ra__group{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3,#9a98a6);font-weight:700;padding:.7rem .5rem .35rem}',
    '.ra__row{display:flex;align-items:center;gap:.9rem;padding:.55rem .5rem;border-radius:.7rem;border:2px solid transparent;cursor:pointer}',
    '.ra__row.is-focus{background:var(--surface,#ffffff12);border-color:var(--ra)}',
    '.ra__row.is-locked .ra__name,.ra__row.is-locked .ra__desc{opacity:.62}',
    '.ra__badge{width:3rem;height:3rem;border-radius:.45rem;flex:none;background:var(--surface,#ffffff12)}',
    '.ra__text{flex:1;min-width:0}',
    '.ra__name{font-weight:700;font-size:.98rem}',
    '.ra__desc{font-size:.82rem;color:var(--text-2,#c9c7d4);margin-top:.1rem}',
    '.ra__meta{flex:none;text-align:right;font-size:.75rem;color:var(--text-3,#9a98a6);min-width:4.6rem}',
    '.ra__pts{display:block;font-weight:800;font-size:.95rem;color:var(--text,#f2f1f6)}',
    '.ra__tag{display:inline-block;font-size:.62rem;font-weight:800;letter-spacing:.06em;padding:.05rem .35rem;border-radius:99px;border:1px solid var(--ra);color:var(--ra);margin-left:.4rem;vertical-align:.1rem}',
    '.ra__center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem;padding:1.5rem;text-align:center;color:var(--text-2,#c9c7d4)}',
    '.ra__center h2{font-family:var(--font-display,inherit);font-size:1.3rem;color:var(--text,#f2f1f6);margin:0}',
    '.ra__center p{margin:0;max-width:30rem;font-size:.9rem;line-height:1.45}',
    '.ra__spin{width:2rem;height:2rem;border-radius:50%;border:.22rem solid var(--surface-2,#ffffff1f);border-top-color:var(--ra);animation:ra-spin .8s linear infinite}',
    '@keyframes ra-spin{to{transform:rotate(360deg)}}',
    '.ra__form{display:flex;flex-direction:column;gap:.6rem;width:min(26rem,100%)}',
    '.ra__field{font:inherit;font-size:1rem;color:var(--text,#f2f1f6);background:var(--surface,#ffffff12);border:2px solid var(--line-2,#ffffff2e);border-radius:.6rem;padding:.65rem .8rem;width:100%;outline:none}',
    '.ra__field.is-focus,.ra__field:focus{border-color:var(--ra)}',
    '.ra__btn{font:inherit;font-weight:800;font-size:.95rem;border:2px solid transparent;border-radius:99px;padding:.6rem 1.3rem;background:var(--surface-2,#ffffff1f);color:var(--text,#f2f1f6);cursor:pointer}',
    '.ra__btn.is-primary{background:var(--ra);color:var(--accent-ink,#fff)}',
    '.ra__btn.is-focus{border-color:var(--text,#f2f1f6)}',
    '.ra__err{color:#ff8f8f;font-size:.85rem;min-height:1.1rem}',
    '.ra__foot{display:flex;flex-wrap:wrap;gap:.5rem 1.1rem;justify-content:flex-end;padding:.6rem 1.4rem .8rem;border-top:1px solid var(--line,#ffffff1a);font-size:.8rem;color:var(--text-2,#c9c7d4)}',
    '.ra__hint{display:inline-flex;align-items:center;gap:.4rem;background:none;border:0;color:inherit;font:inherit;padding:.15rem 0;cursor:pointer}',
    '.ra__hint kbd{font:inherit;font-weight:800;font-size:.72rem;min-width:1.45rem;height:1.45rem;display:inline-flex;align-items:center;justify-content:center;border-radius:99px;border:1.5px solid var(--text-3,#9a98a6);color:var(--text,#f2f1f6)}'
  ].join('\n');

  /* ---------- overlay state ---------- */
  var root = null, st = null;   // st: { game, system, view, focus, items, ... }

  function cred() { var c = lsGet(CRED_KEY, null); return c && c.user && c.key ? c : null; }
  function isOpen() { return !!root; }

  function close() {
    if (!root) return;
    root.remove(); root = null; st = null;
  }

  function hint(key, label, fn) { return el('button', { class: 'ra__hint', type: 'button', onclick: fn }, el('kbd', { text: key }), label); }
  function foot(hints) { var f = el('div', { class: 'ra__foot' }); hints.forEach(function (h) { if (h) f.appendChild(hint(h[0], h[1], h[2])); }); return f; }

  function mount(body, hints, head) {
    root.textContent = '';
    root.appendChild(head || el('div', { class: 'ra__head' },
      el('div', { class: 'ra__titles' },
        el('div', { class: 'ra__eyebrow', text: 'RetroAchievements' }),
        el('div', { class: 'ra__title', text: st.game.title }))));
    root.appendChild(body);
    root.appendChild(foot(hints));
  }

  function center() {
    var c = el('div', { class: 'ra__center' });
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) c.appendChild(arguments[i]);
    return c;
  }

  function showLoading(text) {
    st.view = 'loading';
    mount(center(el('div', { class: 'ra__spin' }), el('p', { text: text || 'Loading…' })), [['B', 'Close', close]]);
  }

  function showMessage(title, text, actionLabel, action) {
    st.view = 'message'; st.action = action || null;
    mount(center(el('h2', { text: title }), el('p', { text: text }),
      action && el('button', { class: 'ra__btn is-primary is-focus', type: 'button', text: actionLabel, onclick: action })),
      [action && ['A', actionLabel, action], ['X', 'Account', showLogin], ['B', 'Close', close]]);
  }

  /* ---------- sign in ---------- */
  function showLogin(message) {
    st.view = 'login'; st.focus = 0;
    var c = cred() || {};
    var user = el('input', { class: 'ra__field', type: 'text', placeholder: 'RetroAchievements username', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false' });
    var key = el('input', { class: 'ra__field', type: 'password', placeholder: 'Web API key', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false' });
    user.value = c.user || ''; key.value = c.key || '';
    var err = el('div', { class: 'ra__err', text: typeof message === 'string' ? message : '' });
    var go = el('button', { class: 'ra__btn is-primary', type: 'button', text: 'Sign in', onclick: submit });
    var out = c.key ? el('button', { class: 'ra__btn', type: 'button', text: 'Sign out', onclick: function () { lsDel(CRED_KEY); showLogin('Signed out on this device.'); } }) : null;
    st.fields = [user, key, go].concat(out ? [out] : []);
    function submit() {
      var u = user.value.trim(), k = key.value.trim();
      if (!u || !k) { err.textContent = 'Enter both your username and your Web API key.'; return; }
      user.blur(); key.blur(); err.textContent = ''; go.textContent = 'Checking…'; go.disabled = true;
      api('API_GetUserProfile', { u: u }, { key: k }).then(function (p) {
        if (!p || !p.User) throw new Error('bad');
        lsSet(CRED_KEY, { user: p.User, key: k, points: p.TotalPoints || 0, soft: p.TotalSoftcorePoints || 0 });
        load();
      }).catch(function (e) {
        if (!root || st.view !== 'login') return;
        go.textContent = 'Sign in'; go.disabled = false; err.textContent = friendly(e);
      });
    }
    st.submit = submit;
    mount(center(
      el('h2', { text: 'Sign in to RetroAchievements' }),
      el('p', { text: 'Your Web API key is on retroachievements.org under Settings › Keys. It is stored on this device only.' }),
      el('div', { class: 'ra__form' }, user, key, err, go, out)),
      [['A', 'Select', function () { act('a'); }], ['B', 'Close', close]]);
    paintFields();
  }
  function paintFields() {
    st.fields.forEach(function (f, i) { f.classList.toggle('is-focus', i === st.focus); });
    var f = st.fields[st.focus]; if (f && f.scrollIntoView) f.scrollIntoView({ block: 'nearest' });
  }

  /* ---------- achievements ---------- */
  function load(forcePick) {
    var c = cred();
    if (!c) return showLogin();
    var consoleId = consoleFor(st.system);
    if (!consoleId) return showMessage('Not supported here', (st.system && st.system.name || 'This system') + ' has no RetroAchievements support in Cartridge yet.');
    var token = st.token = {};
    var saved = lsGet(MATCH_KEY, {})[st.game.id];
    if (saved && !forcePick) return showGame(saved, c, token);
    showLoading('Finding this game on RetroAchievements…');
    gameList(consoleId, c).then(function (list) {
      if (!root || st.token !== token) return;
      var cands = rank(list, st.game.title);
      var best = cands[0], next = cands[1];
      if (!forcePick && best && (best.score >= 0.999 || (best.score >= 0.86 && (!next || best.score - next.score > 0.06)))) return showGame(best.id, c, token);
      showPick(cands);
    }).catch(function (e) { fail(e, token); });
  }
  function fail(e, token) {
    if (!root || st.token !== token) return;
    if (e && (e.status === 401 || e.status === 403)) return showLogin(friendly(e));
    showMessage('Something went wrong', friendly(e), 'Try again', function () { load(); });
  }

  function showPick(cands) {
    st.view = 'pick'; st.focus = 0; st.cands = cands;
    if (!cands.length) return showMessage('No match found', 'Could not find “' + st.game.title + '” in the RetroAchievements list for ' + (st.system.name || 'this system') + '. It may not have achievements yet.');
    var body = el('div', { class: 'ra__body' }, el('div', { class: 'ra__group', text: 'Which game is this?' }));
    st.rows = cands.map(function (c, i) {
      var r = el('div', { class: 'ra__row', onclick: function () { st.focus = i; choose(); } },
        el('div', { class: 'ra__text' }, el('div', { class: 'ra__name', text: c.title })),
        el('div', { class: 'ra__meta' }, el('span', { class: 'ra__pts', text: String(c.count) }), 'achievements'));
      body.appendChild(r); return r;
    });
    mount(body, [['A', 'Choose', choose], ['B', 'Close', close]]);
    paintRows();
  }
  function choose() {
    var c = st.cands[st.focus]; if (!c) return;
    var m = lsGet(MATCH_KEY, {}); m[st.game.id] = c.id; lsSet(MATCH_KEY, m);
    showGame(c.id, cred(), st.token = {});
  }

  function showGame(raId, c, token) {
    showLoading('Loading achievements…');
    api('API_GetGameInfoAndUserProgress', { u: c.user, g: raId }, c).then(function (g) {
      if (!root || st.token !== token) return;
      if (!g || !g.ID) throw new Error('bad');
      var m = lsGet(MATCH_KEY, {}); if (m[st.game.id] !== raId) { m[st.game.id] = raId; lsSet(MATCH_KEY, m); }
      renderGame(g, c);
    }).catch(function (e) { fail(e, token); });
  }

  function day(s) { var d = new Date(String(s).replace(' ', 'T') + 'Z'); return isNaN(d) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }

  function renderGame(g, c) {
    st.view = 'list'; st.focus = 0;
    var all = g.Achievements && typeof g.Achievements === 'object' ? Object.keys(g.Achievements).map(function (k) { return g.Achievements[k]; }) : [];
    all.sort(function (a, b) { return (a.DisplayOrder || 0) - (b.DisplayOrder || 0) || a.ID - b.ID; });
    var got = all.filter(function (a) { return a.DateEarned || a.DateEarnedHardcore; });
    var locked = all.filter(function (a) { return !(a.DateEarned || a.DateEarnedHardcore); });
    var total = all.length, pct = total ? Math.round(got.length / total * 100) : 0;
    var pts = function (l) { return l.reduce(function (n, a) { return n + (a.Points || 0); }, 0); };

    var head = el('div', { class: 'ra__head' },
      g.ImageIcon && el('img', { class: 'ra__icon', src: MEDIA + g.ImageIcon, alt: '' }),
      el('div', { class: 'ra__titles' },
        el('div', { class: 'ra__eyebrow', text: 'RetroAchievements · ' + (g.ConsoleName || st.system.name || '') }),
        el('div', { class: 'ra__title', text: g.Title || st.game.title }),
        el('div', { class: 'ra__bar' }, el('i', { style: 'width:' + pct + '%' })),
        el('div', { class: 'ra__sub', text: total ? got.length + ' of ' + total + ' unlocked · ' + pts(got) + ' of ' + pts(all) + ' points · ' + pct + '%' : 'No achievements for this game yet' })),
      el('div', { class: 'ra__user' }, el('b', { text: c.user }), (c.points || c.soft) ? (c.points || c.soft) + ' points' : ''));

    var body = el('div', { class: 'ra__body' }); st.rows = [];
    function group(label, list, isLocked) {
      if (!list.length) return;
      body.appendChild(el('div', { class: 'ra__group', text: label + ' · ' + list.length }));
      list.forEach(function (a) {
        var i = st.rows.length, hard = !!a.DateEarnedHardcore;
        var r = el('div', { class: 'ra__row' + (isLocked ? ' is-locked' : ''), onclick: function () { st.focus = i; paintRows(); } },
          el('img', { class: 'ra__badge', loading: 'lazy', alt: '', src: MEDIA + '/Badge/' + a.BadgeName + (isLocked ? '_lock' : '') + '.png' }),
          el('div', { class: 'ra__text' },
            el('div', { class: 'ra__name' }, a.Title || '', hard ? el('span', { class: 'ra__tag', text: 'HARDCORE' }) : null),
            el('div', { class: 'ra__desc', text: a.Description || '' })),
          el('div', { class: 'ra__meta' }, el('span', { class: 'ra__pts', text: (a.Points || 0) + ' pts' }), isLocked ? 'Locked' : day(a.DateEarnedHardcore || a.DateEarned)));
        st.rows.push(r); body.appendChild(r);
      });
    }
    group('Unlocked', got, false); group('Locked', locked, true);
    if (!total) body.appendChild(center(el('p', { text: 'This game is on RetroAchievements but has no achievements yet.' })));
    mount(body, [['Y', 'Wrong game?', function () { load(true); }], ['X', 'Account', showLogin], ['B', 'Close', close]], head);
    st.body = body; paintRows(true);
  }
  function paintRows(noScroll) {
    if (!st.rows) return;
    st.rows.forEach(function (r, i) { r.classList.toggle('is-focus', i === st.focus); });
    var r = st.rows[st.focus]; if (r && !noScroll) r.scrollIntoView({ block: 'nearest' });
  }
  function move(d) {
    if (!st.rows || !st.rows.length) return;
    st.focus = Math.max(0, Math.min(st.rows.length - 1, st.focus + d)); paintRows();
  }

  /* ---------- input (names come from the app's dispatcher: up, down, a, b, x, y, l, r, lt, rt, start, submit …) ---------- */
  function act(name) {
    if (!root) return;
    if (name === 'b' || name === 'start') {
      var ae = document.activeElement;
      if (st.view === 'login' && ae && ae.tagName === 'INPUT') return ae.blur();
      return close();
    }
    if (st.view === 'login') {
      if (name === 'up' || name === 'down') { var a2 = document.activeElement; if (a2 && a2.blur) a2.blur(); st.focus = Math.max(0, Math.min(st.fields.length - 1, st.focus + (name === 'up' ? -1 : 1))); paintFields(); }
      else if (name === 'submit') st.submit();
      else if (name === 'a') { var f = st.fields[st.focus]; if (f.tagName === 'INPUT') f.focus(); else f.click(); }
      return;
    }
    if (st.view === 'message') { if (name === 'a' && st.action) st.action(); else if (name === 'x') showLogin(); return; }
    if (st.view === 'pick') { if (name === 'up') move(-1); else if (name === 'down') move(1); else if (name === 'a') choose(); return; }
    if (st.view === 'list') {
      if (name === 'up') move(-1); else if (name === 'down') move(1);
      else if (name === 'l' || name === 'lt') move(-6); else if (name === 'r' || name === 'rt') move(6);
      else if (name === 'y') load(true); else if (name === 'x') showLogin();
    }
  }
  window.__raInput = function (name) {
    if (!root) return false;
    if (typeof name === 'string' && name.indexOf(':') < 0) { try { act(name); } catch (e) { console.error('[ra]', e); } }
    return true;   // swallow everything (including button-up events) while the overlay is open
  };

  /* ---------- entry point ---------- */
  function open(game, system) {
    if (!game) return;
    if (!document.getElementById('ra-style')) document.head.appendChild(el('style', { id: 'ra-style', text: CSS }));
    close();
    st = { game: game, system: system || { id: game.system, name: '' }, view: 'loading', focus: 0 };
    root = el('div', { class: 'ra', role: 'dialog', 'aria-label': 'RetroAchievements', style: system && system.color ? '--ra:' + system.color : '' });
    if (game.art && game.art.color) root.style.setProperty('--ra', game.art.color);
    document.body.appendChild(root);
    try { load(); } catch (e) { console.error('[ra]', e); showMessage('Something went wrong', 'The achievements screen hit an error.'); }
  }

  window.__ra = { open: open, close: close, isOpen: isOpen, version: 'prototype 1' };
})();
