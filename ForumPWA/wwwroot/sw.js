const spCaches = {
    'static': 'static-v5',
    'dynamic': 'dynamic-v5',
};
var db;


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.filter(function (key) {
                    return !Object.values(spCaches).includes(key);

                }).map(function (key) {
                    return caches.delete(key);
                }));
            }));
});


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(spCaches.static)
            .then(function (cache) {
                return cache.addAll([
                    'offline.html',
                    '/',
                    '/images/android-chrome-192x192.png',
                    '/images/android-chrome-512x512.png'
                ]);
            }));
});

var dbVersion = 8;

self.addEventListener('sync', function (event) {
    console.log('handling sync event');
    if (event.tag === 'sync-topics') {
        event.waitUntil(
            openDatabase('superforum', dbVersion)
                .then(evt => {
                    console.log('handling sync-topics event')
                    db = evt.target.result,
                        topics = db.transaction(['topics'], 'readwrite').objectStore('topics');
                    return getData(topics, t => t.isSynced === false);
                }).then(results => {
                    for (result of results) {
                        var body = new FormData();
                        for (key in result) {
                            body.append(key, result[key]);
                        }
                        console.log("Sending create request");

                        fetch('/Topic/create', {
                            method: 'POST',
                            body: body,
                            credentials: 'include'
                        })
                            .then(res => {
                                if (res.ok) {
                                    console.log("Writing To IndexDB");
                                    result.isSynced = true;
                                    db.transaction(['topics'], 'readwrite').objectStore('topics').put(result, result.topcKey);
                                }
                            })
                    }
                })
        );
    }
});

importScripts('/node_modules/sw-toolbox/companion.js')

function openDatabase(name, dbVersion) {
    return new Promise((resolve, reject) => {
        var idb = indexedDB.open(name, dbVersion);
        idb.onsuccess = resolve;
        idb.onerror = reject;
    });
};

function getData(objectStore, predicate) {
    return new Promise((resolve, reject) => {
        var r = [];
        function onsuccess(evt) {
            cursor = evt.target.result;
            if (cursor) {
                if (predicate(cursor.value)) {
                    r.push(cursor.value)
                }
                cursor.continue();
            } else {
                resolve(r);
            }
        }
        objectStore.openCursor().onsuccess = onsuccess;
    });
};


self.addEventListener('push', evt => {
    console.log('pushed');
    var payload = evt.data.json(),
        options = {
            body: 'New Topic: ' + payload.topic.title,
            icon: '/images/android-chrome-512x512.png',
            badge: '/images/favicon-32x32.png',
            data: payload,
            actions: [
                { action: 'view', title: 'See Topic', icon: '/images/favicon-32x32.png' },
                { action: 'later', title: 'Check it Later', icon: '/images/favicon-32x32.png' },
            ]
        };

    evt.waitUntil(self.registration.showNotification('New topic on SuperForum!', options));
});


self.addEventListener('notificationclick', evt => {
    evt.notification.close();

    var payload = evt.notification.data;

    switch (evt.action) {
        case 'later':
            break;
        case 'view':
        default:
            evt.waitUntil(clients.openWindow(`${evt.target.location.origin}/Topic/show/${payload.topic.id}`));
    }
});

self.addEventListener('notificationclose', evt => {
    console.log('notification closed');
});

toolbox.router.get('/css/*', toolbox.cacheFirst, {
    cache: {
        name: spCaches.static,
        maxAgeSections: 60 * 60 * 24 * 365
    }
});

toolbox.router.get('/images/*', toolbox.cacheFirst, {
    cache: {
        name: spCaches.static,
        maxAgeSections: 60 * 60 * 24 * 365
    }
});

toolbox.router.get('/js/*', toolbox.cacheFirst, {
    cache: {
        name: spCaches.static,
        maxAgeSections: 60 * 60 * 24 * 365
    }
});

toolbox.router.get('/lib/*', toolbox.cacheFirst, {
    cache: {
        name: spCaches.static,
        maxAgeSections: 60 * 60 * 24 * 365
    }
});

//self.addEventListener('fetch', function (event) {

//    event.respondWith(caches.match(event.request)
//        .then(function (cResposne) {
//            if (!navigator.onLine) {
//                if (cResposne) {
//                    return cResposne;
//                }

//                return caches.match(new Request('offline.html'));
//            }
//            return fetchAndUpdate(event);
//        }).catch(function (err) {
//            console.error(err);
//        })
//    );
//});

//function fetchAndUpdate(evt) {
//    return fetch(evt.request)
//        .then(function (res) {
//            if (res) {
//                return caches.open(version)
//                    .then(function (cache) {
//                        if (evt.method === 'POST' || evt.method === 'DELETE' && evt.method === 'GET')
//                            return;
//                        else
//                            return cache.put(evt.request, res.clone())
//                                .then(function () {
//                                    return res;
//                                });
//                    });
//            }
//        })
//}
