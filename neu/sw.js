/* Schweigfried ist von /neu/ an die Hauptadresse umgezogen.
 * Dieser Service Worker ersetzt den alten der Vorschau: Er löscht dessen Offline-Speicher, meldet sich ab
 * und schickt offene Seiten zur Hauptadresse. Spielstand und Modelldateien bleiben erhalten. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const scope = new URL(self.registration.scope).pathname;
    try { await self.clients.claim(); } catch (e) { /* egal */ }
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('schweigfried-shell-') && k.endsWith('@' + scope)).map((k) => caches.delete(k)));
    const target = new URL('../', self.registration.scope).href;
    const open = await self.clients.matchAll({ type: 'window' });
    await Promise.all(open.map((c) => c.navigate(target).catch(() => null)));
    await self.registration.unregister();
  })());
});
