import DB from "./db";
const storeName = "views";

// ObjectStore having the states of views (recent,trash,starred)

const addToViews = async (type, item) => {
  try {
    await DB.addData(storeName, { type, value: item });
  } catch (error) {
    console.log(error);
  }
};

const Views = {
  async init() {
    try {
      await DB.init(storeName, "type");
      // adds default values to views object store
      const isRecent = await this.getView("recent");
      const isTrash = await this.getView("trash");
      const isStarred = await this.getView("starred");
      if (!isRecent) {
        await this.updateRecent(null);
      }
      if (!isTrash) {
        await this.updateTrash(null);
      }

      if (!isStarred) {
        await this.updateStarred(null);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getView(key) {
    try {
      const res = await DB.getData(storeName, key);
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  async updateRecent(item) {
    try {
      await addToViews("recent", item);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTrash(item) {
    try {
      await addToViews("trash", item);
    } catch (error) {
      console.log(error);
    }
  },

  async updateStarred(item) {
    try {
      await addToViews("starred", item);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllViews() {
    try {
      const res = await DB.getAllData(storeName);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Views;
