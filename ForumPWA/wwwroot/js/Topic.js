var pubkey = 'BIzudo5gPnMUVAhQrTRDEuIMPOLwtIInO-KHrukWLkguSyCyKNrYnaHr36_zK4bfvJ5hMxu7HFWlAr0n579-tbE';
// eCB1JO4enyxjbeXxzMbTDiYHVhJeeweq3hWMXkOHliU

var notifyButton = document.getElementById('notify-btn'),
    btnIcon = notifyButton.children[0];

var sp = {};

if ('serviceWorker' in navigator && 'PushManager' in window) {
    notifyButton.classList.remove('hidden');

    if (Notification.permission !== 'denied') {
        notifyButton.disabled = false;
    }

    navigator.serviceWorker.ready.then(sw => {
        sp.sw = sw;

        sw.pushManager.getSubscription()
            .then(s => {
                var isSubscribed = s !== null;
                if (s) {
                    btnIcon.classList.remove('glyphicon-bell');
                    btnIcon.classList.add('glyphicon-check');
                }
                else {
                    btnIcon.classList.remove('glyphicon-check');
                    btnIcon.classList.add('glyphicon-bell');
                }
            })
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

notifyButton.addEventListener('click', function (evt) {
    this.disabled = true;
    sp.sw.pushManager.getSubscription().then(s => {
        if (s !== null) {
            s.unsubscribe();
            btnIcon.classList.remove('glyphicon-check');
            btnIcon.classList.add('glyphicon-bell');
            this.disabled = false;
        } else {
            sp.sw.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(pubkey)
            }).then(s => fetch('/Topic/subscription', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(s)
            }))
            .then(res => {
                btnIcon.classList.remove('glyphicon-bell');
                btnIcon.classList.add('glyphicon-check');
                this.disabled = false;
            });
        }
    })
})