import {
  handlePaste,
  updateTrashFlag,
} from "@/utils/functionUtils/actionHelpers";

export default {
  namespaced: true,
  state: {
    lastActiveFolder: null,
    selectedItems: [],
    actionMenuVisibility: false,
    copiedItems: null,
    cutItems: null,
    temporaryCutItems: [],
    renamedItems: null,
  },
  getters: {
    lastActiveFolder: (state) => state.lastActiveFolder,
    selectedItems: (state) => state.selectedItems,
    actionMenuVisibility: (state) => state.actionMenuVisibility,
    cutItems: (state) => state.cutItems,
    copiedItems: (state) => state.copiedItems,
    temporaryCutItems: (state) => state.temporaryCutItems,
    renamedItems: (state) => state.renamedItems,
  },
  mutations: {
    UPDATE_LAST_ACTIVE_FOLDER(state, payload) {
      state.lastActiveFolder = payload;
    },
    UPDATE_SELECTED_ITEM(state, payload) {
      state.selectedItems = payload;
    },
    MOVE_TO_TRASH(state, payload) {
      const { obj, rootState } = payload;
      const rootDirectory = rootState.data.rootDirectory;
      updateTrashFlag(rootDirectory, obj);
    },
    UPDATE_ACTION_MENU_VISIBILITY(state, payload) {
      state.actionMenuVisibility = payload;
    },
    UPDATE_COPIED_ITEMS(state, payload) {
      state.copiedItems = payload;
    },
    UPDATE_CUT_ITEMS(state, payload) {
      state.cutItems = payload;
    },
    PASTE_ITEMS(state, payload) {
      const { obj, rootState } = payload;
      const rootDirectory = rootState.data.rootDirectory;
      const currentFolder = rootState.data.currentFolder;

      handlePaste(rootDirectory, currentFolder, obj);
    },
    UPDATE_TEMPORARY_CUT_ITEMS(state, payload) {
      state.temporaryCutItems = payload;
    },
    UPDATE_RENAMED_ITEMS(state, payload) {
      state.renamedItems = payload;
    },
  },
  actions: {
    updateLastActiveFolder({ commit }, id) {
      commit("UPDATE_LAST_ACTIVE_FOLDER", id);
    },
    updateSelectedItem({ commit }, items) {
      commit("UPDATE_SELECTED_ITEM", items);
    },
    moveToTrash({ commit, rootState }, obj) {
      commit("MOVE_TO_TRASH", { obj, rootState });
    },
    updateActionMenuVisibility({ commit }, obj) {
      commit("UPDATE_ACTION_MENU_VISIBILITY", obj);
    },
    updateCopiedItems({ commit }, items) {
      commit("UPDATE_COPIED_ITEMS", items);
    },
    updateCutItems({ commit }, items) {
      commit("UPDATE_CUT_ITEMS", items);
    },
    updateTemporaryCutItems({ commit }, items) {
      commit("UPDATE_TEMPORARY_CUT_ITEMS", items);
    },
    pasteItems({ commit, rootState }, obj) {
      commit("PASTE_ITEMS", { obj, rootState });
    },
    updateRenamedItems({ commit }, obj) {
      commit("UPDATE_RENAMED_ITEMS", obj);
    },
  },
};
