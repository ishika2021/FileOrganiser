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
