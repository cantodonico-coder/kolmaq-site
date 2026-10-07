// Kolmaq: permite instalar site e painel como aplicativo. Não guarda dados.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate')return;
  e.respondWith(fetch(e.request).catch(()=>new Response('<meta charset=utf-8><body style="font:18px system-ui;padding:40px;text-align:center">Sem conexão. Verifique a internet e tente de novo.</body>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));
});
