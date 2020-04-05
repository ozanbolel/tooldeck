self.addEventListener("install", (event) => {
  const preLoaded = caches.open("cache-pages").then((cache) => cache.addAll(["/"]));

  event.waitUntil(preLoaded);
});

self.addEventListener("fetch", (event) => {
  const response = caches.match(event.request).then((match) => match || fetch(event.request));

  event.respondWith(response);
});
