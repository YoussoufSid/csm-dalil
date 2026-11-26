// Service worker: يجلب أحدث نسخة أولاً متى توفّر الإنترنت، ويستعمل النسخة المحفوظة دون اتصال
const VERSION = "csm-v59";
const SHELL = [
  "./", "./index.html", "./app.js", "./firebase-config.js", "./manifest.webmanifest",
  "./logo.png","./mali-flag.svg","./lib/qrcode.js", "./mosque.jpg", "./gate.jpg",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/favicon.png"
];
const RUNTIME_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com", "unpkg.com", "cdn.jsdelivr.net"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !RUNTIME_HOSTS.includes(url.hostname)) return;
  if (same && url.pathname.endsWith("/version.json")) return; // فحص الإصدار يذهب للشبكة دائماً
  if (same) {
    // ملفات التطبيق: الشبكة أولاً (تصل التحديثات فوراً)، ثم المحفوظ عند انقطاع الاتصال
    e.respondWith(fetch(req, { cache: "no-cache" }).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || (req.mode === "navigate" ? caches.match("./index.html") : undefined))));
    return;
  }
  // المكتبات الخارجية: المحفوظ أولاً
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
    return res;
  }));
});
