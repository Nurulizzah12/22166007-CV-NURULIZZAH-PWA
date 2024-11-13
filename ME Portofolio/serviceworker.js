const cacheName = 'Portfolio-Me-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/mediaqueries.css',
  '/assets/icon.jpg',
  '/assets/foto1.png',
  '/assets/loppy1.jpg',
  '/assets/experience.png',
  '/assets/arrow.png',
  '/assets/gmail1.jpg',
  '/assets/linkend1.jpg',
  '/assets/github1.png',
  '/assets/WhatsApp1.jpg',
  '/assets/instagram1.jpg',
  '/assets/Resume-Nurul Izzah.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js'
];

// Install event - caching assets saat pertama kali service worker terpasang
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Caching Files');
            return cache.addAll(assetsToCache);
        }).then(function() {
            self.skipWaiting();
        }).catch(function(error) {
            console.error('Failed to cache some assets:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

firebase.initializeApp({
  apiKey: "AIzaSyBtpvn07blOacc0ejq224rD1hX05NobtfY",
  authDomain: "portofolio-608b3.firebaseapp.com",
  projectId: "portofolio-608b3",
  storageBucket: "portofolio-608b3.firebasestorage.app",
  messagingSenderId: "170764643590",
  appId: "1:170764643590:web:1640fc133c822d7e8b8287",
  measurementId: "G-VBMNS54FQZ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Portfolio Me';
  const notificationOptions = {
    body: 'Halo! Selamat Datang di Portfolio Me',
    icon: 'assets/icon.jpg',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
