const CACHE='hc-ai-office-v85';
const ASSETS=['./','./index.html','./manifest.json','./data/shopify_snapshot.json','./data/office_snapshot.json','./assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.mode==='navigate'||r.destination==='document'){
    e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(x=>x||fetch(r)));
});