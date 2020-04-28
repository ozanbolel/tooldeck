addEventListener("install", (event) => {
  const cachePages = caches.open("CACHE_PAGES").then((cache) => cache.addAll(["/", "/deck", "/explore"]));

  event.waitUntil(cachePages);
});

addEventListener("fetch", (event) => {
  const response = caches
    .match(event.request)
    .then((match) => match || fetch(event.request))
    .catch(() => {});

  event.respondWith(response);
});
