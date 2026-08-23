console.log("Service Workerが読み込まれました");

self.addEventListener("install", () => {
    console.log("Service Worker：install");
});

self.addEventListener("activate", () => {
    console.log("Service Worker：activate ");
});

self.addEventListener("fetch", (event)=>{
    console.log("fetch発生: ", event.request.url);
});