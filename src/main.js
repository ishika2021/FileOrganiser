import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import {
  VList,
  VListItem,
  VMenu,
  VListItemTitle,
  VSnackbar,
  VSkeletonLoader,
  VTooltip,
} from "vuetify/components";

import "./styles/index.scss";

const vuetify = createVuetify({
  components: {
    VList,
    VSnackbar,
    VSkeletonLoader,
    VTooltip,
    VListItemTitle,
    VMenu,
    VListItem,
  },
});

const app = createApp({
  extends: App,
});

app.use(vuetify);
app.use(store);
app.use(router);
app.mount("#app");
