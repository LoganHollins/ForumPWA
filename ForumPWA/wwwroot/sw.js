const version = 'v7';

//self.addEventListener('beforeinstallprompt', evt => {
//    evt.preventDefault();
//    promptEvt = evt;

//    promptEvt.userChoice.then(choice => {
//        console.log(choice.outcone);
//    });
//    console.log('The app was installed!');
//});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(version)
            .then(function (cache) {
                return cache.addAll([
                    '/css/site.css',
                    'offline.html',
                    '/images/android-chrome-192x192.png',
                    '/images/android-chrome-512x512.png',
                    'sw.js'
                ]);
            })
    );
});

self.addEventListener('fetch', function (event) {

    event.respondWith(caches.match(event.request)
        .then(function (cResposne) {
            console.log(navigator.onLine);
            if (!navigator.onLine) {
                if (cResposne) {
                    return cResposne;
                }

                return caches.match(new Request('offline.html'));
            }

            return fetchAndUpdate(event.request);
        }).catch(function (err) {
            console.error(err);
        })
    );
});



function fetchAndUpdate(request) {
    return fetch(request)
        .then(function (res) {
            if (res) {
                return caches.open(version)
                    .then(function (cache) {
                        return cache.put(request, res.clone())
                            .then(function () {
                                return res;
                            });
                    });
            }
        })
}