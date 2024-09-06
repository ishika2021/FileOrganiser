import {
  addToStarred,
  removeFromStarred,
  getStarredContent,
  getStarredContentFromFolder,
  removeAllFromStarred,
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
        const result = getStarredContent(state.starred, rootDirectory);
        if (result) {
          state.starredItems = result;
        }
      } else {
        // when a folder is opened in starred view
        const res = getStarredContentFromFolder(folderID, rootDirectory);
        if (res) {
          state.starredItems = res;
        }
      }
    },
    async REMOVE_DELETED_STARRED_CONTENT(state, payload) {
      const res = removeAllFromStarred(state.starred, payload);
      if (res) {
        state.starred = res;
        await ViewStore.updateStarred(JSON.parse(JSON.stringify(res)));
      }
    },
  },
  actions: {
    addToStarred({ commit, dispatch, rootState }, item) {
      commit("ADD_TO_STARRED", item);
      dispatch("updateStarredContent");
      const root = rootState.breadcrumbs.breadcrumbs["starred"][0];
      // updates the breadcrumb with page change
      const payload = {
        page: "starred",
        breadcrumb: [root],
      };
      dispatch("breadcrumbs/updateSingleBreadcrumb", payload, { root: true });
    },
    removeFromStarred({ commit, dispatch, rootState }, item) {
      commit("REMOVE_FROM_STARRED", item);
      const root = rootState.breadcrumbs.breadcrumbs["starred"][0];
      const payload = {
        page: "starred",
        breadcrumb: [root],
      };
      dispatch("breadcrumbs/updateSingleBreadcrumb", payload, { root: true });
      dispatch("updateStarredContent");
    },
    updateStarred({ commit, dispatch }, allStarredItems) {
      commit("UPDATE_STARRED", allStarredItems);
      dispatch("updateStarredContent");
    },
    updateStarredContent({ commit, rootState }, folderID = "root") {
      commit("UPDATE_STARRED_CONTENT", { rootState, folderID });
    },
    removeDeletedStarredContent({ commit, dispatch }, Ids) {
      commit("REMOVE_DELETED_STARRED_CONTENT", Ids);
      dispatch("updateStarredContent");
    },
  },
};
