import { updateTrashFlag } from "@/utils/functionUtils/folderHelpers";
import { handlePaste } from "@/utils/functionUtils/actionHelpers";

export default {
  namespaced: true,
  state: {
    lastActiveFolder: null,
    selectedItems: {},
    actionMenuVisibility: false,
    copiedItems: [],
    cutItems: [],
  },
  getters: {
    lastActiveFolder: (state) => state.lastActiveFolder,
    selectedItems: (state) => state.selectedItems,
    actionMenuVisibility: (state) => state.actionMenuVisibility,
    cutItems: (state) => state.cutItems,
    copiedItems: (state) => state.copiedItems,
  },
  mutations: {
    UPDATE_LAST_ACTIVE_FOLDER(state, payload) {
      state.lastActiveFolder = payload;
    },
    UPDATE_SELECTED_ITEM(state, payload) {
      state.selectedItems = payload;
    },
    MOVE_TO_TRASH(state, payload) {
      const { parent, toBeDeleted } = payload;
      const updatedParent = updateTrashFlag(parent, toBeDeleted);

      state.selectedFiles = updatedParent.files;
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
  },
  actions: {
    updateLastActiveFolder({ commit }, id) {
      commit("UPDATE_LAST_ACTIVE_FOLDER", id);
    },
    updateSelectedItem({ commit }, items) {
      commit("UPDATE_SELECTED_ITEM", items);
    },
    moveToTrash({ commit }, obj) {
      commit("MOVE_TO_TRASH", obj);
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
    pasteItems({ commit, rootState }, obj) {
      commit("PASTE_ITEMS", { obj, rootState });
    },
  },
};
