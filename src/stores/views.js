import { addToRecent, getRecentFiles } from "@/utils/functionUtils/viewHelpers";
import { ViewStore } from "@/database";
export default {
  namespaced: true,
  state: {
    recent: [],
    recentFiles: [],
  },
  getters: {
    recentFiles: (state) => state.recentFiles,
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
  },
};
