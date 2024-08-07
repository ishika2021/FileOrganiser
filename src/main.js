import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import selectable from "./directives/selectable.js";
import store from "./store";
import "./styles/index.scss";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp({
  extends: App,
});

app.directive("drag-select", selectable);

app.use(vuetify);
app.use(store);
app.use(router);
app.mount("#app");
