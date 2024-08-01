const dbName = "fileManager";
const dbVersion = 1;
const storeNames = ["rootDirectory", "breadcrumbs", "currentFolderID"];
const idb = window.indexedDB;

const IDB = {
  db: null,

  initDB() {
    return new Promise((resolve, reject) => {
      const request = idb.open(dbName, dbVersion);
      request.onerror = (event) => {
        reject(event);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        storeNames.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      };

      request.onsuccess = (event) => {
        console.log("Database opened successfully !!!", event.target.result);
        this.db = event.target.result;
        resolve(this.db);
      };
    });
  },

  addData(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data, 0);

      transaction.oncomplete = () => {
        resolve(request.result);
      };

      transaction.onerror = (event) => {
        reject(event);
      };
    });
  },

  getData(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(0);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  },
};

const initDB = async () => {
  try {
    const res = await IDB.initDB();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const addDataToDB = async (storeName, data) => {
  try {
    await IDB.addData(storeName, data);
  } catch (error) {
    console.error("Error in adding data:", error);
  }
};
const fetchDataFromDB = async (storeName) => {
  try {
    const result = await IDB.getData(storeName);
    return result;
  } catch (error) {
    console.error("Error in getting data:", error);
  }
};

export { initDB, addDataToDB, fetchDataFromDB };
