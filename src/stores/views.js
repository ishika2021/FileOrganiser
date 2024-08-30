import {
  addToRecent,
  getRecentFiles,
  addToTrash,
  getTrashedContent,
  restoreItem,
  restoreAllItems,
  deleteItem,
  deleteAll,
} from "@/utils/functionUtils/viewHelpers";
import { ViewStore } from "@/database";
export default {
  namespaced: true,
  state: {
    recent: [],
    recentFiles: [],
    trash: [],
    trashedItems: {},
  },
  getters: {
    recentFiles: (state) => state.recentFiles,
    trashedItems: (state) => state.trashedItems,
  },
  mutations: {
    async ADD_TO_RECENT(state, payload) {
      const res = addToRecent(payload, state.recent);
      if (res) {
        state.recent = res;
        await ViewStore.updateRecent(JSON.parse(JSON.stringify(res)));
      }
    },
    UPDATE_RECENT(state, payload) {
      state.recent = payload;
    },
    UPDATE_RECENT_FILES(state, rootState) {
      const files = getRecentFiles(state.recent, rootState.data.rootDirectory);
      if (files) {
        state.recentFiles = files;
      }
    },
    UPDATE_TRASH(state, payload) {
      state.trash = payload;
    },
    async ADD_TO_TRASH(state, payload) {
      const res = addToTrash(payload, state.trash);
      if (res) {
        state.trash = res;
        await ViewStore.updateTrash(JSON.parse(JSON.stringify(res)));
      }
    },
    UPDATE_TRASHED_CONTENT(state, rootState) {
      const content = getTrashedContent(
        state.trash,
        rootState.data.rootDirectory
      );
      if (content) {
        state.trashedItems = content;
      }
    },
    async RESTORE_ITEM(state, payload) {
      const { item, rootState } = payload;
      const res = restoreItem(item, state.trash, rootState.data.rootDirectory);
      if (res) {
        state.trash = res;
        await ViewStore.updateTrash(JSON.parse(JSON.stringify(res)));
      }
    },
    async RESTORE_ALL_ITEMS(state, rootState) {
      const res = restoreAllItems(state.trash, rootState.data.rootDirectory);
      if (res) {
        state.trash = res;
        await ViewStore.updateTrash(JSON.parse(JSON.stringify(res)));
      }
    },
    async PERMANENT_DELETE_ITEM(state, payload) {
      const { item, rootState } = payload;
      const res = deleteItem(item, state.trash, rootState.data.rootDirectory);
      if (res) {
        state.trash = res;
        await ViewStore.updateTrash(JSON.parse(JSON.stringify(res)));
      }
    },
    async PERMANENT_DELETE_ALL(state, rootState) {
      const res = deleteAll(state.trash, rootState.data.rootDirectory);
      if (res) {
        state.trash = res;
        await ViewStore.updateTrash(JSON.parse(JSON.stringify(res)));
      }
    },
  },
  actions: {
    addToRecent({ commit, dispatch }, file) {
      commit("ADD_TO_RECENT", file);
      dispatch("updateRecentFiles");
    },
    updateRecent({ commit, dispatch }, files) {
      commit("UPDATE_RECENT", files);
      dispatch("updateRecentFiles");
    },
    updateRecentFiles({ commit, rootState }) {
      commit("UPDATE_RECENT_FILES", rootState);
    },
    addToTrash({ commit, dispatch }, file) {
      commit("ADD_TO_TRASH", file);
      dispatch("updateTrashedContent");
    },
    updateTrash({ commit, dispatch }, files) {
      commit("UPDATE_TRASH", files);
      dispatch("updateTrashedContent");
    },
    updateTrashedContent({ commit, rootState }) {
      commit("UPDATE_TRASHED_CONTENT", rootState);
    },
    restoreItem({ commit, dispatch, rootState }, item) {
      commit("RESTORE_ITEM", { item, rootState });
      dispatch("updateTrashedContent");
    },
    restoreAllItems({ commit, dispatch, rootState }) {
      commit("RESTORE_ALL_ITEMS", rootState);
      dispatch("updateTrashedContent");
    },
    permanentDeleteItem({ commit, dispatch, rootState }, item) {
      commit("PERMANENT_DELETE_ITEM", { item, rootState });
      dispatch("updateTrashedContent");
    },
    permanentDeleteAll({ commit, dispatch, rootState }) {
      commit("PERMANENT_DELETE_ALL", rootState);
      dispatch("updateTrashedContent");
    },
  },
};
