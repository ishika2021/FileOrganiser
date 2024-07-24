export default {
  namespaced: true,
  state: {
    screenSize: "full",
  },
  getters: {
    screenSize: (state) => state.screenSize,
  },
  mutations: {
    UPDATE_SCREEN_SIZE(state, payload) {
      state.screenSize = payload;
    },
  },
  actions: {
    updateScreenSize({ commit }, size) {
      commit("UPDATE_SCREEN_SIZE", size);
    },
  },
};
