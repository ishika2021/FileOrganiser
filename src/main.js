import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import selectable from "./directives/selectable.js";
import store from "./store";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./styles/index.scss";
import "vuetify/dist/vuetify.css";

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
