/* ============================================================
   DezoMax Admin — kompyuter dasturi (Electron)
   Admin panel saytdan ochiladi (https://abdulazizjuraev.github.io/dezomax/admin.html),
   shuning uchun dasturni yangilash shart emas — saytdagi o'zgarishlar darhol shu yerda ham.
   Token va sozlamalar dastur ichida (o'z profilida) saqlanadi.
   Yig'ish: cd desktop && npm install && npm run dist  →  dist/DezoMax-Admin-Setup-x.y.z.exe
   ============================================================ */

const { app, BrowserWindow, shell, Menu, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const SITE = 'https://abdulazizjuraev.github.io';
const START = SITE + '/dezomax/admin.html';

// bitta nusxa: dastur qayta ochilsa — mavjud oyna oldinga chiqadi
if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }

let win = null;
const stateFile = () => path.join(app.getPath('userData'), 'window.json');
const readState = () => { try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch { return {}; } };

function createWindow() {
  const st = readState();
  const area = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: st.width || Math.min(1320, area.width),
    height: st.height || Math.min(900, area.height),
    x: st.x, y: st.y,
    minWidth: 420, minHeight: 560,
    title: 'DezoMax Admin',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#07080c',
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, sandbox: true, spellcheck: false }
  });
  if (st.maximized) win.maximize();
  win.once('ready-to-show', () => win.show());

  // oyna o'lchami va joyi eslab qolinadi
  const save = () => {
    if (!win || win.isDestroyed()) return;
    const b = win.getNormalBounds();
    try { fs.writeFileSync(stateFile(), JSON.stringify({ ...b, maximized: win.isMaximized() })); } catch {}
  };
  win.on('close', save);

  // admin panel sahifasi dastur ichida, qolgani (sayt, GitHub, YouTube...) — odatiy brauzerda
  const inside = url => url.startsWith(START) || url.startsWith('file:');
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (inside(url)) return;
    e.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url);
  });

  // internet bo'lmasa — «Internet yo'q» sahifasi (Qayta urinish admin panelni ochadi)
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (!isMain || code === -3) return;          // -3: foydalanuvchi to'xtatdi / qayta yo'naltirish
    win.loadFile(path.join(__dirname, 'offline.html'));
  });

  // F5 / Ctrl+R — sahifani yangilash, Ctrl+± / Ctrl+0 — masshtab
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type !== 'keyDown') return;
    if (i.key === 'F5' || (i.control && i.key.toLowerCase() === 'r')) { e.preventDefault(); win.webContents.reloadIgnoringCache(); }
    const wc = win.webContents;
    if (i.control && (i.key === '=' || i.key === '+')) { e.preventDefault(); wc.setZoomLevel(wc.getZoomLevel() + 0.5); }
    if (i.control && i.key === '-') { e.preventDefault(); wc.setZoomLevel(wc.getZoomLevel() - 0.5); }
    if (i.control && i.key === '0') { e.preventDefault(); wc.setZoomLevel(0); }
  });

  win.loadURL(START);
}

app.on('second-instance', () => {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.focus();
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
});

app.on('window-all-closed', () => app.quit());
