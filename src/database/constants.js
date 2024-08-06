const storeName = "constants";
import DB from "./db";

// ObjectStore having constant values
const Constants = {
  async init() {
    try {
      await DB.init(storeName, "type");
    } catch (error) {
      console.log(error);
    }
  },

  async updateCurrentFolder(item) {
    try {
      await addToConstants("currentFolderID", item);
    } catch (error) {
      console.log(error);
    }
  },

  async getCurrentFolder(key) {
    try {
      const res = await DB.getData(storeName, key);
      return res.value;
    } catch (error) {
      console.log(error);
    }
  },
};

const addToConstants = async (type, item) => {
  try {
    await DB.addData(storeName, { type, value: item });
  } catch (error) {
    console.log(error);
  }
};

export default Constants;
