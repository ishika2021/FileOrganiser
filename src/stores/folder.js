import { getCurrentFolder } from "../utils/functionUtils/folderHelpers";
export default {
  namespaced: true,
  state: {
    rootDirectory: {
      id: "00",
      name: "Home",
      children: [],
      files: [],
    },
    newFolder: false,
    selectedFolder: {},
    selectedFiles: [],
  },
  getters: {
    rootDirectory: (state) => state.rootDirectory,
    isNewFolder: (state) => state.newFolder,
    selectedFolder: (state) => state.selectedFolder,
    selectedFiles: (state) => state.selectedFiles,
  },
  mutations: {
    UPDATE_FOLDERS(state, payload) {
      const { folders, files } = payload;
      state.rootDirectory.children = folders;
      state.rootDirectory.files = files;
    },
    ADD_FOLDER(state, payload) {
      const { folder, parent } = payload;
      const res = getCurrentFolder(parent, state.rootDirectory);
      if (res) {
        res.children.push(folder);
      }
    },
    ADD_NEW_FOLDER(state, payload) {
      state.newFolder = payload;
    },
    UPDATE_SELECTED_FOLDER(state, title) {
      const selectedFolder = getCurrentFolder(title, state.rootDirectory);
      if (selectedFolder) {
        state.selectedFolder = selectedFolder;
        state.selectedFiles = selectedFolder.files;
      }
    },
    UPDATE_SELECTED_FILES(state, payload) {
      state.files = payload;
    },
    ADD_NEW_FILES(state, payload) {
      state.selectedFolder.files = [...state.selectedFolder.files, ...payload];
      state.selectedFiles = state.selectedFolder.files;
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
    updateSelectedFiles({ commit }, files) {
      commit("UPDATE_FILES", files);
    },
    addNewFiles({ commit }, files) {
      commit("ADD_NEW_FILES", files);
    },
  },
};
