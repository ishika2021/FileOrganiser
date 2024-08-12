const storeName = "breadcrumbs";
import DB from "./db";

//ObjectStore having breadcrumbs
const Breadcrumbs = {
  async init() {
    try {
      await DB.init(storeName);
    } catch (error) {
      console.log(error);
    }
  },

  async updateBreadcrumbs(item) {
    try {
      const index = 0;
      await DB.addData(storeName, item, index);
    } catch (error) {
      console.log(error);
    }
  },

  async getBreadcrumbs() {
    try {
      const res = await DB.getData(storeName);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Breadcrumbs;
