import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from "./store";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp({
  extends: App,
});

app.use(vuetify);
app.use(store);
app.mount("#app");
