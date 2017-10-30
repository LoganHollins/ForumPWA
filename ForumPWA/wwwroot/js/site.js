// Write your Javascript code.
if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(console.log)
        .catch(console.error);
}
