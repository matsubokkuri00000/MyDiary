const CACHE_NAME = "my-diary-cache-v1";

console.log("Service Workerが読み込まれました");

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("キャッシュを開きました", cache);

                //URLのデータを取得して，このキャッシュに保存
                return cache.addAll([
                    "/",
                    "/manifest.webmanifest",
                    "/icon_192.png",
                    "/icon_512.png"
                ]);
            })
    );

});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if(cacheName !== CACHE_NAME){
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
    )
});


self.addEventListener("fetch", (event) => [

    event.respondWith(
        caches.match(event.request)
            .then((response) => {

                if(response){
                    console.log("キャッシュから返しました：", event.request.url);
                    return response;
                }
                
                console.log("ネットワークから取得：", event.request.url);
                return fetch(event.request);
            })
    )
]);
