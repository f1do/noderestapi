import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { auth } from "./db/firebase";

import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.use(Vuelidate)

Vue.config.productionTip = false

auth.onAuthStateChanged(function(user) {
    
    if (user) {
      store.dispatch('firmarUsuario', user);
    } 
    
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');

  });