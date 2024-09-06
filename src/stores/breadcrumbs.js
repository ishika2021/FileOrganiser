export default {
  namespaced: true,
  state: {
    breadcrumbs: {},
  },
  getters: {
    breadcrumbs: (state) => state.breadcrumbs,
  },
  mutations: {
    UPDATE_BREADCRUMBS(state, payload) {
      state.breadcrumbs = payload;
    },
    UPDATE_SINGLE_BREADCRUMB(state, payload) {
      const { page, breadcrumb } = payload;
      state.breadcrumbs[page] = [...breadcrumb];
    },
    ADD_BREADCRUMB(state, payload) {
      const { page, breadcrumb } = payload;
      state.breadcrumbs[page].push(breadcrumb);
    },
  },
  actions: {
    updateBreadcrumbs({ commit }, allBreadcrumbs) {
      commit("UPDATE_BREADCRUMBS", allBreadcrumbs);
    },
    updateSingleBreadcrumb({ commit }, breadcrumb) {
      commit("UPDATE_SINGLE_BREADCRUMB", breadcrumb);
    },
    addBreadcrumb({ commit }, item) {
      commit("ADD_BREADCRUMB", item);
    },
  },
};
