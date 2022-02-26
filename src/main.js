import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'
import store from "./store"
import VueSweetalert2 from 'vue-sweetalert2';
import Vuex from 'vuex'
Vue.use(require('vue-moment'));
Vue.config.productionTip = false
import 'sweetalert2/dist/sweetalert2.min.css';

import EventBus from './event-bus'
console.log(EventBus);
axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.withCredentials = true;

Vue.use(VueSweetalert2,{
  confirmButtonColor: '#008e79',
  cancelButtonColor: '#959399',
});
Vue.use(Vuex)

Vue.prototype.$axios = axios;


const baseURL = 'http://127.0.0.1:8000';
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(function (config) {
  document.body.classList.add('loader');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  document.body.classList.remove('loader');
  return response;
}, function (error) {
  document.body.classList.remove('loader');
  return Promise.reject(error);
});


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
