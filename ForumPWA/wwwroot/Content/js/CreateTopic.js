﻿document.addEventListener("DOMContentLoaded", function () {
    var title = document.getElementById('title');
    var categoryId = document.getElementById('categoryId');
    var content = document.getElementById('content');

    var version = 13;
    var idb = indexedDB.open('superforum', version);

    idb.onupgradeneeded = function (e) {
        var db = idb.result;

        console.log("making a new object store");
        if (!db.objectStoreNames.contains('topics')) {
            var topicOS = db.createObjectStore('topics', {
                keyPath: 'topicKey'
            });
            topicOS.createIndex('title', 'title', { keyPath: 'topicKey' });
        }
    };

    document.getElementById("new-topic-form").addEventListener("submit", function (evt) {
        console.log("submit");
        if(!navigator.onLine){
            console.log("offline submit");
            evt.preventDefault();
            var open = indexedDB.open('superforum', version);

            open.onsuccess = function (e) {
                var db = open.result;
                console.log("open onsuccess");

                var topics = db.transaction('topics', 'readwrite').objectStore('topics');
                var val = {
                    title: title.value,
                    categoryId: categoryId.value,
                    content: content.value,
                    topicKey: title.value + categoryId.value + content.value,
                    isSynced: false
                };

                operation = topics.put(val);

                operation.onsuccess = () => {
                    if ('serviceWorker' in navigator && 'SyncManager' in window) {
                        navigator.serviceWorker.ready.then(sw => {
                            console.log("Syncing topics");
                            return sw.sync.register('sync-topics')
                        })
                    } else {
                    }
                };
            };
        } else {
            //fetch('/Topic/create', {
            //    method: 'POST',
            //    body: val,
            //    credentials: 'include'
            //})
            //evt.preventDefault();
            console.log('send data to server via ajax');
}

    });
});
