export default {
  namespaced: true,
  state: {
    isMenuVisible: false, //delete this state
    lastActiveFolder: null,
    selectedItem: [],
  },
  getters: {
    isMenuVisible: (state) => state.isMenuVisible,
    lastActiveFolder: (state) => state.lastActiveFolder,
    selectedItem: (state) => state.selectedItem,
  },
  mutations: {
    UPDATE_MENU_VISIBILITY(state, payload) {
      state.isMenuVisible = payload;
    },
    UPDATE_LAST_ACTIVE_FOLDER(state, payload) {
      state.lastActiveFolder = payload;
    },
    UPDATE_SELECTED_ITEM(state, payload) {
      state.selectedItem = payload;
    },
  },
  actions: {
    updateMenuVisibility({ commit }, visibility) {
      commit("UPDATE_MENU_VISIBILITY", visibility);
    },
    updateLastActiveFolder({ commit }, id) {
      commit("UPDATE_LAST_ACTIVE_FOLDER", id);
    },
    updateSelectedItem({ commit }, items) {
      commit("UPDATE_SELECTED_ITEM", items);
    },
  },
};
