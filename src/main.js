import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入ElementUI
import './assets/scss/element-ui.scss';
import ElementUI from 'element-ui'

import {getRequest} from './utils/api'
import {uploadFileRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {apis} from 'utils/apis'
import {putRequest} from './utils/api'


Vue.prototype.getRequest = getRequest
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.apis = apis;
Vue.prototype.putRequest = putRequest;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
