import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";

// Vuetify
// import "vuetify/styles";
// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Apollo
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import { DefaultApolloClient } from "@vue/apollo-composable";
// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  // 你需要在这里使用绝对路径
  uri: "https://api.spacex.land/graphql",
});

// 缓存实现
const cache = new InMemoryCache();

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp(App);
// const vuetify = createVuetify({
//   components,
//   directives,
// });

app.provide(DefaultApolloClient, apolloClient);
app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
// app.use(vuetify);
app.mount("#app");
