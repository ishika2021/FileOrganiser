export default {
  namespaced: true,
  state: {
    folders: [],
    newFolder: false,
  },
  getters: {
    folders: (state) => state.folders,
    isNewFolder: (state) => state.newFolder,
  },
  mutations: {
    UPDATE_FOLDERS(state, payload) {
      state.folders = payload;
    },
    ADD_FOLDER(state, payload) {
      state.folders.push(payload);
    },
    ADD_NEW_FOLDER(state, payload) {
      state.newFolder = payload;
    },
  },
  actions: {
    updateFolders({ commit }, folders) {
      commit("UPDATE_FOLDERS", folders);
    },
    addFolder({ commit }, folder) {
      commit("ADD_FOLDER", folder);
    },
    addNewFolder({ commit }, status) {
      commit("ADD_NEW_FOLDER", status);
    },
  },
};
