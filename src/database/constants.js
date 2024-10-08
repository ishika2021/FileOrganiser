const storeName = "constants";
import DB from "./db";

// ObjectStore having constant values
const Constants = {
  async init() {
    try {
      await DB.init(storeName, "type");
      const isCurrentFolderID = await this.getConstant("currentFolderID");
      const isTheme = await this.getConstant("theme");
      const isScreenSize = await this.getConstant("screenSize");
      if (!isCurrentFolderID) {
        await this.updateCurrentFolder("root");
      }
      if (!isTheme) {
        await this.updateTheme(null);
      }
      if (!isScreenSize) {
        await this.updateScreenSize(null);
      }
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

  async updateTheme(item) {
    try {
      await addToConstants("theme", item);
    } catch (error) {
      console.log(error);
    }
  },

  async updateScreenSize(item) {
    try {
      await addToConstants("screenSize", item);
    } catch (error) {
      console.log(error);
    }
  },

  async getConstant(key) {
    try {
      const res = await DB.getData(storeName, key);
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllConstants() {
    try {
      const res = await DB.getAllData(storeName);
      return res;
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
