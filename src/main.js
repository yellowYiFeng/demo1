// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Filter from './assets/js/filter.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Axios from './http'
import store from './store/store'
import Axios from './services/http.js'


Vue.config.productionTip = false
Object.keys(Filter).forEach(key => {
    Vue.filter(key, Filter[key])
})
Vue.use(ElementUI, { size: 'small' })






new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})


