// sw.js

self.addEventListener('install', (event) => {
  console.log('Service Worker: installation.');
  // Active immédiatement le nouveau service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: activation.');
  // Prend le contrôle de tous les clients (onglets) ouverts
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: notification cliquée.', event.notification.tag);
  event.notification.close();

  // Ouvre la page du site ou met le focus dessus si elle est déjà ouverte
  event.waitUntil(self.clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then((clientList) => {
    // Si un onglet est déjà ouvert, on le focus
    if (clientList.length > 0) {
      return clientList[0].focus();
    }
    // Sinon, on ouvre une nouvelle fenêtre
    if (self.clients.openWindow) {
      return self.clients.openWindow('./index.html');
    }
  }));
}); 