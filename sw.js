const CACHE_NAME = 'wisdom-north-v1';
const urlsToCache = [
'/',
'index (1).html',
'dashboard.html',
'manifest.json',
'studentlogo.jpg'
];
​self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(urlsToCache);
})
);
});
​self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});
