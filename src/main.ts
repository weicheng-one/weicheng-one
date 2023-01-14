import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";

// Apollo
import apolloClient from "./plugins/apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";

// App and Router
import App from "./App.vue";
import router from "./router";

// Import CSS
import "./assets/main.css";

const app = createApp(App);

app.provide(DefaultApolloClient, apolloClient);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
app.mount("#app");
