export default {
  namespaced: true,
  state: {
    lastActiveFolder: null,
    selectedItems: [],
  },
  getters: {
    lastActiveFolder: (state) => state.lastActiveFolder,
    selectedItems: (state) => state.selectedItems,
  },
  mutations: {
    UPDATE_LAST_ACTIVE_FOLDER(state, payload) {
      state.lastActiveFolder = payload;
    },
    UPDATE_SELECTED_ITEM(state, payload) {
      state.selectedItems = payload;
    },
  },
  actions: {
    updateLastActiveFolder({ commit }, id) {
      commit("UPDATE_LAST_ACTIVE_FOLDER", id);
    },
    updateSelectedItem({ commit }, items) {
      commit("UPDATE_SELECTED_ITEM", items);
    },
  },
};
