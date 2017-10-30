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

self.registration.showNotification('Welcome to SuperForum!', {
    body: 'Welcome to SuperForum.  Check out our cool fourm!',
    badge: '/images/favicon-32x32.png',
    icon: '/images/android-chrome-512x512.png',
    tag: 'SuperForumIntro',
    renotify: true,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    dir: 'ltr',
    lang: 'en-CA',
    timestamp: Date.now(),
    actions: [
        {action: 'viewCategories', title:'Browse Forum', icon: '/images/favicon-32x32.png'}
    ]
});

self.addEventListener('notificationclick', evt => {
    evt.notification.close();

    switch (evt.action) {
        case 'viewCategories':
            console.log('viewCategories clicked!');
            break;
        default:
            console.log('notification clicked');
            break;
    }
    // handle action clicks
});

self.addEventListener('notificationclose', evt => {
    console.log('notification closed');
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

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}