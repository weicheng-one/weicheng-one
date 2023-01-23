import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";

// App and Router
import App from "./App.vue";
import router from "./router";

// Import CSS
import "./assets/main.css";

//CKEditor
import CKEditor from "@ckeditor/ckeditor5-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
app.use(CKEditor);
app.mount("#app");
