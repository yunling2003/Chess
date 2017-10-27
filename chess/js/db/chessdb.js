define(["db/chessdata"], function (chessData) {
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

  function createChessmanStateStore(db) {
    var objectStore,
      index,
      metaData = chessData.getChessInitData();

    if (!db.objectStoreNames.contains("chessmanState")) {
      objectStore = db.createObjectStore("chessmanState", {
        keyPath: "id",
        autoIncrement: false
      });
    }

    objectStore.createIndex("name", "name", { unique: false });

    for (index = 0; index < metaData.length; index++) {
      objectStore.add(metaData[index]);
    }
  }

  function initialize(callback) {
    var db,
      request,
      deleteRequest;

    deleteRequest = indexedDB.deleteDatabase("chess");
    deleteRequest.onerror = function (e) {
      alert(e.target.errorCode);
    };

    request = indexedDB.open("chess");
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      createChessmanStateStore(db);
      if (callback && typeof callback === "function") {
        callback();
      }
    };
  }

  function getInitData(callback, storeName, nextAction) {
    var request,
      db,
      transaction,
      objectStore,
      cursor,
      metaData = [];

    request = indexedDB.open("chess");
    request.onsuccess = function (event) {
      db = this.result;
      transaction = db.transaction(["chessmanState", "boardLine"]);
      objectStore = transaction.objectStore(storeName);
      objectStore.openCursor().onsuccess = function (event) {
        cursor = event.target.result;
        if (cursor) {
          metaData.push(cursor.value);
          cursor.continue();
        } else {
          if (callback && typeof callback === "function") {
            callback(metaData, nextAction);
          }
        }
      };
    };
  }

  return {
    initialize: initialize,
    getInitData: getInitData
  };
});
