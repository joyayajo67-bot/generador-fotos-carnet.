const CACHE_NAME = 'carnet-pwa-v9';


const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];


// Install Event - Pre-cache essential files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Offline-first cache fallback strategy
self.addEventListener('fetch', (e) => {
  // Let browser handle non-GET or cross-origin / chrome-extension schemes
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request).then((networkResponse) => {
        // Only cache valid basic responses or CDNs (Google Fonts / FontAwesome CDNs)
        const isCdn = e.request.url.startsWith('https://fonts.googleapis.com') || 
                      e.request.url.startsWith('https://fonts.gstatic.com') || 
                      e.request.url.startsWith('https://cdnjs.cloudflare.com');
                      
        const isBasic = networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic';

        if (isBasic || isCdn) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(() => {
        // Silent catch for network drops
      });
    })
  );
});
