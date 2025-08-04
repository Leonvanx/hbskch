import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index';
import pinia from './stores/index';

import 'normalize.css';
import './design/base.css';
import './design/common.scss';
import './design/flex.scss';
import './design/fonts/font.css';

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
