
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Vant from 'vant'
// import axios from './utils/index1.js'
//引入vuex 并且挂载到vue实例上
// import store from "./store"
Vue.prototype.$store = store
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Vant)
App.mpType = 'app'

const app = new Vue({
   ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
// import { service } from './utils/request.js'
import App from './App.vue'
import store from "./store"
export function createApp() {
   const app = createSSRApp(App)
   app.use(store)
   return {
      app
   }
}
// #endif