window.addEventListener("DOMContentLoaded", function () {

    if ('serviceWorker' in navigator) {
        navigator
            .serviceWorker
            .register('/sw.js', { scope: '/' })
            .then(console.log)
            .catch(console.error);
    }

    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }

    function showNotification() {
        var notification = new Notification('Welcome to the site!', {
            body: 'Welcome to SuperForum!',
            badge: '/Content/images/favicon-32x32.png',
            icon: '/Content/images/android-chrome-512x512.png',
            tag: 'SuperForumIntro',
            renotify: true,
            requireInteraction: false,
            vibrate: [200, 100, 200],
            dir: 'ltr',
            lang: 'en-CA',
            timestamp: Date.now()
        });

        notification.addEventListener('error', evt => {
            console.error('There was a problem', evt);
        });

        notification.addEventListener('click', evt => {
            console.log('Notification clicked :)');
        });
    }

    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
    }

    // showNotification();
});
