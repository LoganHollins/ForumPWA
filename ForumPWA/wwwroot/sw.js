//const version = 'v8';
var version = 7;
var db;
self.addEventListener('sync', function (event) {
    console.log('handling sync event');
    if (event.tag === 'sync-topics') {
        event.waitUntil(
            openDatabase('superforum', version)
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

function openDatabase(name, version) {
    return new Promise((resolve, reject) => {
        var idb = indexedDB.open(name, version);
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

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(version)
            .then(function (cache) {
                return cache.addAll([
                    '/css/site.css',
                    'offline.html',
                    '/',
                    '/images/android-chrome-192x192.png',
                    '/images/android-chrome-512x512.png'
                ]);
            })
    );
});

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

self.addEventListener('fetch', function (event) {

    event.respondWith(caches.match(event.request)
        .then(function (cResposne) {
            if (!navigator.onLine) {
                if (cResposne) {
                    return cResposne;
                }

                return caches.match(new Request('offline.html'));
            }
            return fetchAndUpdate(event);
        }).catch(function (err) {
            console.error(err);
        })
    );
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

function fetchAndUpdate(evt) {
    return fetch(evt.request)
        .then(function (res) {
            if (res) {
                return caches.open(version)
                    .then(function (cache) {
                        if (evt.method === 'POST' || evt.method === 'DELETE' && evt.method === 'GET')
                            return;
                        else
                            return cache.put(evt.request, res.clone())
                                .then(function () {
                                    return res;
                                });
                    });
            }
        })
}
