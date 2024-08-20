import { getFolderByID } from "../utils/functionUtils/folderHelpers";
export default {
  namespaced: true,
  state: {
    rootDirectory: {
      id: "root",
      children: [],
      files: [],
    },
    currentFolder: {},
    newFolder: false,
    selectedFiles: [],
  },
  getters: {
    rootDirectory: (state) => state.rootDirectory,
    isNewFolder: (state) => state.newFolder,
    currentFolder: (state) => state.currentFolder,
    selectedFiles: (state) => state.selectedFiles,
  },
  mutations: {
    ADD_FOLDER(state, payload) {
      const { folder, parent } = payload;
      const res = getFolderByID(parent, state.rootDirectory);
      if (res) {
        res.children.push(folder);
      }
    },
    ADD_NEW_FOLDER(state, payload) {
      state.newFolder = payload;
    },
    UPDATE_FOLDERS(state, payload) {
      const { folders, files } = payload;
      state.rootDirectory.children = folders;
      state.rootDirectory.files = files;
    },
    UPDATE_CURRENT_FOLDER(state, title) {
      const res = getFolderByID(title, state.rootDirectory);
      if (res) {
        state.currentFolder = res;
        state.selectedFiles = res.files;
      }
    },
    UPDATE_SELECTED_FILES(state, payload) {
      state.files = payload;
    },
    ADD_NEW_FILES(state, payload) {
      state.currentFolder.files = [...state.currentFolder.files, ...payload];
      state.selectedFiles = state.currentFolder.files;
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
    updateCurrentFolder({ commit }, folder) {
      commit("UPDATE_CURRENT_FOLDER", folder);
    },
    updateSelectedFiles({ commit }, files) {
      commit("UPDATE_FILES", files);
    },
    addNewFiles({ commit }, files) {
      commit("ADD_NEW_FILES", files);
    },
  },
};
