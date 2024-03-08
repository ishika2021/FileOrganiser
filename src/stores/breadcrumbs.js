export default {
  namespaced: true,
  state: {
    breadcrumbs: [],
  },
  getters: {
    breadcrumbs: (state) => state.breadcrumbs,
  },
  mutations: {
    UPDATE_BREADCRUMBS(state, payload) {
      state.breadcrumbs = payload;
    },
    ADD_BREADCRUMB(state, payload) {
      state.breadcrumbs.push(payload);
    },
  },
  actions: {
    updateBreadcrumbs({ commit }, allBreadcrumbs) {
      commit("UPDATE_BREADCRUMBS", allBreadcrumbs);
    },
    addBreadcrumb({ commit }, item) {
      commit("ADD_BREADCRUMB", item);
    },
  },
};
