// Force HTTPS and handle caching
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

// Intercept all requests and ensure they're HTTPS
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Force HTTPS for all requests
  if (request.url.startsWith("http://")) {
    const httpsUrl = request.url.replace("http://", "https://");
    event.respondWith(
      fetch(httpsUrl, {
        ...request,
        url: httpsUrl,
      })
    );
    return;
  }

  // Let other requests pass through normally
  event.respondWith(fetch(request));
});
