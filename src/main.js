// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faSignOutAlt, faSignInAlt, faSearch, faEdit, faTrash, faTimes, faCheck, faPlayCircle, faPause, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookie from 'vue-cookie';
import App from './App';
import router from './router';
import store from './store';
import '../node_modules/normalize.css/normalize.css';

Vue.use(Cookie);

library.add(
  faCog,
  faSignOutAlt,
  faSignInAlt,
  faSearch,
  faEdit,
  faTrash,
  faTimes,
  faCheck,
  faPlayCircle,
  faPause,
  faPlus
  );

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
