const CACHE_NAME = 'crm-login-bms-2025-v1';

// Log all events for debugging
self.addEventListener('message', event => {
  console.log('SW Message:', event.data);
});

// Install Service Worker
self.addEventListener('install', event => {
  console.log('SW: Installing');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Cache opened');
        return cache.addAll(['/']);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('SW: Activating');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event - Network Only (no caching for dynamic content)
self.addEventListener('fetch', event => {
  // Skip caching for dynamic content
  if (event.request.url.includes('supabase') || 
      event.request.url.includes('api') ||
      event.request.method !== 'GET') {
    return fetch(event.request);
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
