import { IDB } from "./config";
const dbName = "fileManager";

const DB = {
  init(storeName, keyPath = null) {
    const db = IDB.db;
    if (db && !db.objectStoreNames.contains(storeName)) {
      const version = db.version + 1;
      db.close();
      const request = window.indexedDB.open(dbName, version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (keyPath) {
          db.createObjectStore(storeName, { keyPath: keyPath });
        } else {
          db.createObjectStore(storeName);
        }
      };

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          IDB.db = event.target.result;
          resolve(IDB.db);
        };
        request.onerror = (event) => {
          reject(event);
        };
      });
    }

    return db;
  },

  addData(storeName, data, index = -1) {
    return new Promise((resolve, reject) => {
      const db = IDB.getDB();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      if (index < 0) {
        store.put(data);
      } else {
        // stored value is an array
        store.put(data, index);
      }

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject(event);
      };
    });
  },

  getData(storeName, key = null) {
    return new Promise((resolve, reject) => {
      const db = IDB.getDB();
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      let request;

      if (key) {
        request = store.get(key);
      } else {
        // when value is an array, get it by 0th index
        request = store.get(0);
      }

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  },

  getAllData(storeName) {
    return new Promise((resolve, reject) => {
      const db = IDB.getDB();
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  },
};

export default DB;
