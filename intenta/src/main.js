import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { auth } from "./db/firebase";
import axios from 'axios'
import VueAxios from 'vue-axios'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard, faUserFriends, faAlignLeft, faHome } from '@fortawesome/free-solid-svg-icons'


import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
library.add(faClipboard, faUserFriends, faAlignLeft, faHome)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api';

auth.onAuthStateChanged(function(user) {
    
    if (user) {
      const _user = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        imagen: user.photoURL
      };
      store.dispatch('firmarUsuario', _user);
    } 
    
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');

  });