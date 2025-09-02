const CACHE_NAME = 'studygem-v2';

self.addEventListener('install', event => {
    // Skip waiting to activate the new service worker immediately.
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of all open clients.
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Always go to the network for API calls.
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(fetch(request));
        return;
    }

    // For navigation requests, try the network first, then fall back to the cache.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(() => caches.match('/index.html'))
        );
        return;
    }

    // For all other requests (assets, scripts), use a cache-first strategy.
    // Fetch from the network in the background to keep the cache updated (stale-while-revalidate).
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            const fetchPromise = fetch(request).then(networkResponse => {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, responseToCache);
                });
                return networkResponse;
            }).catch(err => {
                console.warn('Fetch failed; returning offline page instead.', err);
                return caches.match('/index.html');
            });

            return cachedResponse || fetchPromise;
        })
    );
});