const CACHE_NAME = 'cache-v1';
const OFFLINE_URL = '/offline.html'; // La página que mostrarás cuando el usuario esté offline

const urlsToCache = [
  OFFLINE_URL,
  // Añade aquí otras URLs que quieras cachear, como tu CSS, JS, e imágenes
  'images/coffee1.jpg',
  'images/coffee2.jpg',
  'images/coffee3.jpg',
  'images/coffee4.jpg',
  'images/coffee5.jpg',
  'images/coffee6.jpg',
  'images/coffee7.jpg',
  'images/coffee8.jpg',
  'images/coffee9.jpg',
  // Añade también tu CSS y JS si es necesario
  'styles.css',
  'app.js'
];

// Instalar el Service Worker y almacenar en caché los recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Manejar las solicitudes de la red y servir desde la caché cuando esté offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para la caché
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request)
        .then((cachedResponse) => cachedResponse || caches.match(OFFLINE_URL)))
  );
});
