import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'


axios.defaults.baseURL = 'https://randomuser.me/api';
window.axios = axios;

createApp(App).mount('#app')
