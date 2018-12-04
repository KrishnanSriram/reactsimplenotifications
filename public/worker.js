
const CACHE_NAME = 'pwa-app-cache';
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
   caches.open(CACHE_NAME).then((cache) => {
     return cache.addAll([
       '/',
       '/about',
       '/settings',
       '/topics',
       'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
       'https://fonts.googleapis.com/icon?family=Material+Icons',
       'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
       'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.15/js/mdb.min.js'
     ]);
   })
 );
});

self.addEventListener('activate', (event) => {
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

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  // NETWORK first approach
  event.respondWith(
    fetch(event.request).then(function(res) {
      return caches.open(CACHE_NAME).then(function(cache) {
          // Put in cache if succeeds
          cache.put(event.request.url, res.clone());
          return res;
        })
      }).catch(function(err) {
        console.log('[Service Worker] Network not available. Fetching from cache!');
        // Fallback to cache
        return caches.match(event.request);
      })
  );

  //CACHE first approach
  /*event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );*/
});

self.addEventListener('push', (event) => {
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

self.addEventListener('sync', (event) => {
  if (event.tag === 'pwasync') {
    event.waitUntil(
      console.log('[Service Worker] sync event FIRED')
    );
  }
});
