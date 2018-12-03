self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  return self.clients.claim();
  // e.respondWith(
  //   caches.match(e.request).then(function(response) {
  //     return response || fetch(e.request);
  //   })
  // );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png',
    badge: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
