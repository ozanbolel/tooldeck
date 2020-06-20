const SHELL_CACHE = "shell-v5";
const DYNAMIC_CACHE = "dynamic-v36";

const assets = [
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
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(assets)));
});

addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => (key !== SHELL_CACHE ? key !== DYNAMIC_CACHE : false)).map((key) => caches.delete(key))))
  );
});

addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (asset) =>
        asset ||
        fetch(event.request).then((response) =>
          caches.open(DYNAMIC_CACHE).then((cache) => {
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
