import {
  addToStarred,
  removeFromStarred,
  getStarredContent,
  getStarredContentFromFolder,
} from "@/utils/functionUtils/starredHelpers";
import { ViewStore } from "@/database";

export default {
  namespaced: true,
  state: {
    starred: [],
    starredItems: {},
  },

  getters: {
    starredItems: (state) => state.starredItems,
  },

  mutations: {
    async ADD_TO_STARRED(state, payload) {
      const res = addToStarred(payload, state.starred);
      if (res) {
        state.starred = res;
        await ViewStore.updateStarred(JSON.parse(JSON.stringify(res)));
      }
    },
    async REMOVE_FROM_STARRED(state, payload) {
      const res = removeFromStarred(payload, state.starred);
      if (res) {
        state.starred = res;
        await ViewStore.updateStarred(JSON.parse(JSON.stringify(res)));
      }
    },

    UPDATE_STARRED(state, payload) {
      state.starred = payload;
    },
    UPDATE_STARRED_CONTENT(state, payload) {
      const { rootState, folderID } = payload;
      const rootDirectory = rootState.data.rootDirectory;
      if (folderID === "root") {
        const res = getStarredContent(state.starred, rootDirectory);
        if (res) {
          state.starredItems = res;
        }
      } else {
        // when a folder is opened in starred view
        const res = getStarredContentFromFolder(folderID, rootDirectory);
        if (res) {
          state.starredItems = res;
        }
      }
    },
  },
  actions: {
    addToStarred({ commit, dispatch }, item) {
      commit("ADD_TO_STARRED", item);
      dispatch("updateStarredContent");
    },
    removeFromStarred({ commit, dispatch }, item) {
      commit("REMOVE_FROM_STARRED", item);
      dispatch("updateStarredContent");
    },
    updateStarred({ commit, dispatch }, allStarredItems) {
      commit("UPDATE_STARRED", allStarredItems);
      dispatch("updateStarredContent");
    },
    updateStarredContent({ commit, rootState }, folderID = "root") {
      commit("UPDATE_STARRED_CONTENT", { rootState, folderID });
    },
  },
};
