/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/styles/react-select.css',
  '/client-bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache =>
        // Open a cache and cache our files
        cache.addAll(urlsToCache),
      ),
  );
});
