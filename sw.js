// Minimal service worker: lets phones install the launcher and open it offline.
const CACHE = 'nyk-launcher-v2';
const FILES = ['./', './index.html', './manifest.webmanifest', './banner.jpg', './icon-192.png', './icon-512.png', './icon-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== location.origin) return;   // never touch the Google page
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
