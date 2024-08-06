const storeName = "actions";
import DB from "./db";

//ObjectStore having file actions
const Actions = {
  async init() {
    try {
      const res = await DB.init(storeName, "type");
      if (res) {
        // default initialization of copy and cut
        this.updateCopy([]);
        this.updateCut([]);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async updateCopy(item) {
    try {
      await addItemToAction("copy", item);
    } catch (error) {
      console.log(error);
    }
  },

  async updateCut(item) {
    try {
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
};

const addItemToAction = async (type, item) => {
  try {
    await DB.addData(storeName, { type, value: item });
  } catch (error) {
    console.log(error);
  }
};

export default Actions;
