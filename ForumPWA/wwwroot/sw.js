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
    return new Request('offline.html');
    return caches.match(new Request('offline.html'));

    return caches.match(event.request)
        .then(function (cResposne) {
            console.log(navigator.onLine);
            if (!navigator.onLine) {
                //if (cResposne) {
                //    return cResposne;

                //}

                return caches.match(new Request('offline.html'));
            }

            return fetchAndUpdate(event.request);
        }).catch(function (err) {
            console.error(err);
        });

    //Not Cache First
    //event.respondWith(
    //    caches.match(event.request).then(function (cResposne) {
    //        if (cResposne)
    //            fetch(event.request).then(function (fResponse) {
    //                caches.open(version).then(function (cache) {
    //                    return cache.put(event.request, fResponse.clone());
    //                })
    //            });

    //    })
    //);

    // Network first
    //event.respondWith(
    //    fetch(event.request).then(function (fResponse) {
    //        return caches.open(version).then(function (cache) {
    //            if (!fResponse.ok) {
    //                return cache.match(event.request);
    //            } else {
    //                cache.put(event.request, fResponse.clone());
    //                return fResponse;
    //            }
    //        });
    //    }));


    //Fastest (Doesnt work)
    //event.respondWith(function () {
    //    var promises = [caches.match(event.request), fetchAndUpdate(event.request)];

    //    return new Promise((resolve, reject) => {
    //        promises.map(p => Promise.resolve(promise));
    //        promises.forEach(p => p.then(resolve));
    //        promises.reduce((a, b) => a.catch(() => b))
    //            .catch(() => reject(new Error('Both promises failed.')));
    //    });
    //});
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