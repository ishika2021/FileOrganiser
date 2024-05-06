import { getCurrentFolder } from "../utils/functionUtils/folderHelpers";
export default {
  namespaced: true,
  state: {
    folders: {
      id: "00",
      name: "Home",
      children: [],
    },
    newFolder: false,
    selectedFolder: [],
  },
  getters: {
    folders: (state) => state.folders.children,
    isNewFolder: (state) => state.newFolder,
    selectedFolder: (state) => state.selectedFolder,
  },
  mutations: {
    UPDATE_FOLDERS(state, payload) {
      state.folders.children = payload;
    },
    ADD_FOLDER(state, payload) {
      const { folder, parent } = payload;
      const res = getCurrentFolder(parent, state.folders);
      if (res) {
        res.children.push(folder);
      }
    },
    ADD_NEW_FOLDER(state, payload) {
      state.newFolder = payload;
    },
    UPDATE_SELECTED_FOLDER(state, title) {
      const selectedFolder = getCurrentFolder(title, state.folders);
      if (selectedFolder) {
        state.selectedFolder = selectedFolder.children;
      }
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
    updateSelectedFolder({ commit }, folder) {
      commit("UPDATE_SELECTED_FOLDER", folder);
    },
  },
};
