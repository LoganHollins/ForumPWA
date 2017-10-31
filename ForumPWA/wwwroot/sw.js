const version = 'v8';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(version)
            .then(function (cache) {
                return cache.addAll([
                    '/css/site.css',
                    'offline.html',
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
    // handle action clicks
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
