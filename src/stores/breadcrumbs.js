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
  },
  actions: {
    updateBreadcrumbs({ commit }, breadcrumb) {
      console.log("b=", breadcrumb);
      commit("UPDATE_BREADCRUMBS", breadcrumb);
    },
  },
};
