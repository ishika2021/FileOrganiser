export default {
  namespaced: true,
  state: {
    screenSize: "full",
    theme: "light",
    notification: null,
  },
  getters: {
    screenSize: (state) => state.screenSize,
    theme: (state) => state.theme,
    notification: (state) => state.notification,
  },
  mutations: {
    UPDATE_SCREEN_SIZE(state, payload) {
      state.screenSize = payload;
    },
    UPDATE_THEME(state, payload) {
      state.theme = payload;
    },
    UPDATE_NOTIFICATION(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    updateScreenSize({ commit }, size) {
      commit("UPDATE_SCREEN_SIZE", size);
    },
    updateTheme({ commit }, theme) {
      commit("UPDATE_THEME", theme);
    },
    updateNotification({ commit }, obj) {
      commit("UPDATE_NOTIFICATION", obj);
    },
  },
};
