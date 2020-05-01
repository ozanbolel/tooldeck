const CACHE_NAME = "shell-v1";

const assets = [
  "/",
  "/deck",
  "/explore",
  "/manifest.json",
  "/static/icons.svg",
  "/static/taken.svg",
  "/static/tile.svg",
  "/static/logo/logo.svg",
  "/static/logo/logo-96.png",
  "/static/landing/add.png",
  "/static/landing/explore.png",
  "/static/landing/tabs.png",
  "/static/landing/view.png"
];

addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
});

addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
});

addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (asset) =>
        asset ||
        fetch(event.request).then((response) =>
          caches.open("dynamic").then((cache) => {
            const url = event.request.url;

            if (url.includes("_next/static") || url.includes("fonts.googleapis.com") || url.includes("fonts.gstatic.com")) {
              cache.put(url, response.clone());
            }

            return response;
          })
        )
    )
  );
});
