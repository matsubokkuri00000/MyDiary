console.log("Service Workerが読み込まれました");

self.addEventListener("install", (event) => {

    console.log("Service Worker：install");

    event.waitUntil(
        caches.open("my-diary-cache")
            .then((cache) => {
                console.log("キャッシュを開きました", cache);

                //URLのデータを取得して，このキャッシュに保存して
                return cache.addAll([
                    "/",
                    "/manifest.webmanifest",
                    "/icon_192.png",
                    "/icon_512.png"
                ]);
            })
    );

});

self.addEventListener("activate", () => {

    console.log("Service Worker：activate");

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
