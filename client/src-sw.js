const { StaleWhileRevalidate } = require('workbox-strategies');
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implementar el almacenamiento en caché de activos
registerRoute(
  // Aquí definimos la función de devolución de llamada de una función que filtrará las solicitudes que queremos almacenar en caché (en este caso, archivos de JS y CSS)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Nombre del almacenamiento en caché.
    cacheName: 'asset-cache',
    plugins: [
      // Este complemento almacenará en caché las respuestas con estos encabezados hasta una edad máxima de 30 días
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
