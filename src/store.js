import { createStore } from "vuex";
import stores from "./stores/index.js";

export default createStore({
  modules: { ...stores },
});
