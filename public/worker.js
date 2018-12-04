
const CACHE_NAME = 'pwa-app-cache';
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll([
       '/',
       '/about',
       '/settings',
       '/topics',
       'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
       'https://fonts.googleapis.com/icon?family=Material+Icons',
       'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
       'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css',
       'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
       'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js',
       'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js',
       'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.15/js/mdb.min.js'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  /*event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );*/
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
