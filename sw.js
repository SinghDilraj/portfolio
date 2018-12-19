const staticCache = 'my-cache-1'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        return cache.addAll(
          [
            '/',
            '/index.html',
            '/app.js',
            '/dest/portfolio.css',
            '/1.png',
            '/6.png',
            '/facebook.jpg',
            '/first-image.jpg',
            '/gmail.png',
            '/instagram.png',
            '/linkedin.png',
            '/udacity-logo.png'
          ]
        )
      })
      .catch(error => {
        console.log(error)
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('my-cache') && cacheName !== staticCache
          }).map(cacheName => {
            return caches.delete(cacheName)
          })
        )
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cache => {
        return cache || fetch(event.request)
      })
  )
})
