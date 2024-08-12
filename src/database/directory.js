const storeName = "directories";
import DB from "./db";

// ObjectStore having rootDirectory
const Directories = {
  async init() {
    try {
      await DB.init(storeName);
    } catch (error) {
      console.log(error);
    }
  },

  async updateDirectories(item) {
    try {
      const index = 0;
      await DB.addData(storeName, item, index);
    } catch (error) {
      console.log(error);
    }
  },

  async getDirectories() {
    try {
      const res = await DB.getData(storeName);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Directories;
