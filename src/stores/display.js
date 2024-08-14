export default {
  namespaced: true,
  state: {
    screenSize: "full",
    theme: "light",
  },
  getters: {
    screenSize: (state) => state.screenSize,
    theme: (state) => state.theme,
  },
  mutations: {
    UPDATE_SCREEN_SIZE(state, payload) {
      state.screenSize = payload;
    },
    UPDATE_THEME(state, payload) {
      state.theme = payload;
    },
  },
  actions: {
    updateScreenSize({ commit }, size) {
      commit("UPDATE_SCREEN_SIZE", size);
    },
    updateTheme({ commit }, theme) {
      commit("UPDATE_THEME", theme);
    },
  },
};
