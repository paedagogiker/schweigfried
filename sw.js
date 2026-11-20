/* Schweigfried – Service Worker: macht das Spiel nach dem ersten Besuch offline nutzbar.
 * Gespeichert werden nur die Spieldateien und die KI-Bibliothek WebLLM vom CDN.
 * Die Modelldateien verwaltet WebLLM selbst im Browser-Speicher. */
const VERSION = '936362462b4c';
// Je Ordner ein eigener Speicher, damit sich zwei Fassungen auf derselben Website (z. B. /neu/) nicht gegenseitig löschen
const SCOPE = new URL(self.registration.scope).pathname;
const SHELL = 'schweigfried-shell-' + VERSION + '@' + SCOPE;
const LIB = 'schweigfried-lib-v1';
const FILES = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const SHELL_URLS = new Set(FILES.map((f) => new URL(f, self.location).href));

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('schweigfried-shell-') && k !== SHELL)
        .map((k) => isOurs(k).then((mine) => mine && caches.delete(k)))))
      .then(() => self.clients.claim())
  );
});

// Ein alter Speicher gehört zu diesem Ordner, wenn sein Name ihn nennt oder (bei früheren Fassungen ohne Ordnerangabe)
// wenn er Dateien direkt aus diesem Ordner enthält. Speicher anderer Ordner bleiben unberührt.
async function isOurs(name) {
  if (name.endsWith('@' + SCOPE)) return true;
  if (name.indexOf('@') !== -1) return false;
  const reqs = await (await caches.open(name)).keys();
  return reqs.some((r) => {
    const p = new URL(r.url).pathname;
    return p.startsWith(SCOPE) && p.slice(SCOPE.length).indexOf('/') === -1;
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Spieldateien: sofort aus dem Speicher, im Hintergrund aktualisieren
  if (url.origin === self.location.origin) {
    const key = url.origin + url.pathname;
    if (!SHELL_URLS.has(key)) {
      // Selbst gehostete Bibliotheken (Skripte): einmal laden, danach aus dem Speicher. Modelldateien speichern die Bibliotheken selbst.
      if (req.destination === 'script') event.respondWith(fromLibCache(req));
      return;
    }
    event.respondWith(
      caches.open(SHELL).then(async (cache) => {
        const hit = await cache.match(key);
        const fresh = fetch(req).then((res) => {
          if (res && res.ok) cache.put(key, res.clone());
          return res;
        }).catch(() => null);
        if (hit) { event.waitUntil(fresh); return hit; }
        return (await fresh) || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      })
    );
    return;
  }

  // KI-Bibliotheken vom CDN (fest auf eine Version gesetzt): einmal laden, danach aus dem Speicher
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(fromLibCache(req));
  }
});

function fromLibCache(req) {
  return caches.open(LIB).then(async (cache) => {
    const hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
}
