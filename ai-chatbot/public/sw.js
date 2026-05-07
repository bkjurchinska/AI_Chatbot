const CACHE_NAME = 'chatai-v1';
const OFFLINE_URL = '/offline.html';

const SSETS_TO_CACHE = [
  '/',
  '/manifest.webmanifest',
  '/icon-192x192.png',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      if(request.mode === 'navigate'){
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/offline.html');
      }
      
      else {
        return caches.match(request);
      }
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.ServiceWorkerRegistration.showNotification(data.title, {
    body: data.body,
    icon: '/tomato_logo.png',
  });
});