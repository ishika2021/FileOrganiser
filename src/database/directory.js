const storeName = "directories";
import DB from "./db";
import { getDefaultFolders } from "./dbHelpers";

// ObjectStore having rootDirectory
const Directories = {
  async init() {
    try {
      await DB.init(storeName);
      const directories = await this.getDirectories();
      // creates default folders for new users
      if (!directories) {
        const defaultFolders = getDefaultFolders();
        const rootDirectory = {
          children: defaultFolders,
          files: [],
        };
        await this.updateDirectories(JSON.parse(JSON.stringify(rootDirectory)));
      }
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
