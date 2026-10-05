const C='rtz-v8',F=['./','./index.html','./manifest.webmanifest','./logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||!(u.origin===location.origin||u.hostname==='cdn.jsdelivr.net'))return;
e.respondWith(Promise.race([fetch(e.request),new Promise((_,j)=>setTimeout(j,4000))]).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(m=>m||Response.error())))});
