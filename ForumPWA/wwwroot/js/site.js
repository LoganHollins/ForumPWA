// Write your Javascript code.
if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(console.log)
        .catch(console.error);
}

if (Notification.permission === 'granted') {
    showNotification();
} else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
        if (p === 'granted')
            showNotification();
    });
}

function showNotification() {
    var notification = new Notification('Welcome to the site!', {
        body: 'Welcome to SuperForum!',
        badge: '/images/favicon-32x32.png',
       icon: '/images/android-chrome-512x512.png',
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
