import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/page/index'
import Clue from '../components/page/clue'
import Business from '../components/page/business'
import Customer from '../components/page/customer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/Clue',
        name: 'Clue',
        component: Clue
    },
    {
        path: '/Business',
        name: 'Business',
        component: Business
    },
    {
        path: '/Customer',
        name: 'Customer',
        component: Customer
    }
  ]
})
