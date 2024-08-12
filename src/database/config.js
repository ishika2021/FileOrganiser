const dbName = "fileManager";
const idb = window.indexedDB;

// configure the database
const IDB = {
  db: null,

  initDB() {
    return new Promise((resolve, reject) => {
      const request = idb.open(dbName);

      request.onerror = (event) => {
        reject(event);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log("DB is initialized: ", db);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
    });
  },

  getDB() {
    return this.db;
  },
};

const initDB = async () => {
  try {
    const result = await IDB.initDB();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { initDB, IDB };
