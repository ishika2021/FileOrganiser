const storeName = "actions";
import DB from "./db";

//ObjectStore having file actions
const Actions = {
  async init() {
    try {
      await DB.init(storeName, "type");
    } catch (error) {
      console.log(error);
    }
  },

  async updateCopy(item) {
    try {
      item = JSON.parse(JSON.stringify(item));
      await addItemToAction("copy", item);
    } catch (error) {
      console.log(error);
    }
  },

  async updateCut(item) {
    try {
      item = JSON.parse(JSON.stringify(item));
      await addItemToAction("cut", item);
    } catch (error) {
      console.log(error);
    }
  },

  async getAction(key) {
    try {
      const res = await DB.getData(storeName, key);
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllActions() {
    try {
      const res = await DB.getAllData(storeName);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

const addItemToAction = async (type, obj) => {
  try {
    await DB.addData(storeName, { type, value: obj });
  } catch (error) {
    console.log(error);
  }
};

export default Actions;
