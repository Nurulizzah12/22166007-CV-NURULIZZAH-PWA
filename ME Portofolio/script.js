function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
 
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(assetsToCache);
    }).then(() => {
      self.skipWaiting();
    }).catch((error) => {
      console.error('Failed to cache some assets:', error);
    })
  );
});


const dbRequest = indexedDB.open("FeedbackMessage", 1);

dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains("ulasan")) {
      const objectStore = db.createObjectStore("ulasan", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("username", "username", { unique: false });
      objectStore.createIndex("feedback", "feedback", { unique: false });
  }
};

dbRequest.onsuccess = function(event) {
  const db = event.target.result;
}