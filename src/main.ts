import { createApp } from "vue";
import { createPinia } from "pinia";
//FormKit
import { plugin, defaultConfig } from "@formkit/vue";
// App and Router
import App from "./App.vue";
import router from "./router";
// Import CSS
import "./assets/main.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(plugin, defaultConfig);
app.mount("#app");
