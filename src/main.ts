import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';
import pinia from './stores/index';

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
