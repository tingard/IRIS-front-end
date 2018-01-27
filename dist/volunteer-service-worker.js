!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),self.addEventListener("push",e=>{console.log("[Service Worker] Push Received."),console.log(`[Service Worker] Push had this data: "${e.data.text()}"`);e.waitUntil(self.registration.showNotification("Push Codelab",{body:"Yay it works.",icon:"images/icon.png",badge:"images/badge.png"}))}),self.addEventListener("notificationclick",e=>{console.log("[Service Worker] Notification click Received."),e.notification.close()})},function(e,t){const n={offline:"offline-v1"};self.addEventListener("install",e=>{e.waitUntil(fetch(function(e){const t=new Request(e,{cache:"reload"});if("cache"in t)return t;const n=new URL(e,self.location.href);return n.search+=`${n.search?"&":""}cachebust=${Date.now()}`,new Request(n)}("offline.html")).then(e=>caches.open(n.offline).then(t=>t.put("offline.html",e))))}),self.addEventListener("activate",e=>{const t=Object.keys(n).map(e=>n[e]);e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>-1===t.indexOf(e)?(console.log("Deleting out of date cache:",e),caches.delete(e)):null))))}),self.addEventListener("fetch",e=>{("navigate"===e.request.mode||"GET"===e.request.method&&e.request.headers.get("accept").includes("text/html"))&&e.respondWith(fetch(e.request).catch(e=>(console.log("Fetch failed; returning offline page instead.",e),caches.match("offline.html"))))})}]);