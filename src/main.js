import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


axios.defaults.baseURL = 'https://randomuser.me/api';
window.axios = axios;

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
