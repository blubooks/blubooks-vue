import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {PromiseDialog} from "vue3-promise-dialog"


import './assets/main.scss'

import setupInterceptors from './services/setupInterceptors';
setupInterceptors(store);

const app = createApp(App)

app.use(PromiseDialog).use(router).use(store)

app.mount('#app')
