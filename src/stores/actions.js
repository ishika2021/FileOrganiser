import { updateTrashFlag } from "@/utils/functionUtils/folderHelpers";

export default {
  namespaced: true,
  state: {
    lastActiveFolder: null,
    selectedItems: [],
    actionMenuVisibility: false,
  },
  getters: {
    lastActiveFolder: (state) => state.lastActiveFolder,
    selectedItems: (state) => state.selectedItems,
    actionMenuVisibility: (state) => state.actionMenuVisibility,
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
  },
};
