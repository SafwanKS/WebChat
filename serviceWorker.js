const staticWebChat = "web-chat-site-v1"
const assets = [
    "/",
    "/index.html",
    "/index.css",
    "/index.js",
    "/dark-theme.css",
    "/images/logo.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticWebChat).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})