const CACHE_NAME = 'wisdom-north-v2';
const urlsToCache = [
'./',
'./index.html',
'./dashboard.html',
'./manifest.json',
'./logo.png'
];
​self.addEventListener('install', (event) => {
self.skipWaiting();
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(urlsToCache);
})
);
});
​self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cache) => {
if (cache !== CACHE_NAME) {
return caches.delete(cache);
}
})
);
}).then(() => self.clients.claim())
);
});
​self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request).catch(() => caches.match('./index (1).html'));
})
);
});
​// Background Push Notification Event Handling
self.addEventListener('push', (event) => {
let data = { title: 'New Notification', body: 'You have a new update from Secretariat Portal', url: './index (1).html' };
if (event.data) {
try { data = event.data.json(); } catch(e) { data.body = event.data.text(); }
}
​const options = {
body: data.body,
icon: 'logo.png',
badge: 'logo.png',
vibrate: [200, 100, 200, 100, 200],
data: { url: data.url || './index (1).html' }
};
​event.waitUntil(
self.registration.showNotification(data.title, options)
);
});
​self.addEventListener('notificationclick', (event) => {
event.notification.close();
event.waitUntil(
clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
for (const client of clientList) {
if (client.url && 'focus' in client) {
return client.focus();
}
}
if (clients.openWindow) {
return clients.openWindow(event.notification.data.url || './index (1).html');
}
})
);
});
