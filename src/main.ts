import { createApp } from 'vue';
import { createPinia } from 'pinia';
//FormKit
import { plugin, defaultConfig } from '@formkit/vue';
// App and Router
import App from '@/App.vue';
import router from '@/router';
// Import CSS
import '@/assets/main.css';
import 'remixicon/fonts/remixicon.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig);
app.mount('#app');
