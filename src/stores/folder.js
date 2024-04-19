import { getCurrentFolder } from "../utils/functionUtils/folderHelpers";
export default {
  namespaced: true,
  state: {
    folders: [],
    newFolder: false,
    selectedFolder: [],
  },
  getters: {
    folders: (state) => state.folders,
    isNewFolder: (state) => state.newFolder,
    selectedFolder: (state) => state.selectedFolder,
  },
  mutations: {
    UPDATE_FOLDERS(state, payload) {
      state.folders = payload;
    },
    ADD_FOLDER(state, payload) {
      const { folder, parent } = payload;
      if (parent === "Home") {
        state.folders.push(folder);
      } else {
        // call a fn that will return the parent's object then add folder to its children
        const res = getCurrentFolder(parent, state.folders);
        res.children.push(folder);
      }
    },
    ADD_NEW_FOLDER(state, payload) {
      state.newFolder = payload;
    },
    UPDATE_SELECTED_FOLDER(state, title) {
      if (title === "Home") {
        state.selectedFolder = state.folders;
      } else {
        const selectedFolder = getCurrentFolder(title, state.folders);
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
