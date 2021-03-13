import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import chart from '../views/chart.vue'
import toyApp from '../views/toyApp.vue'
import toyEdit from '../views/toyEdit.vue'
import toyDetails from '../views/toyDetails.vue'
import toyAdd from '../views/toyAdd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/about',
    name: 'About',
    component: about
  },
  {
    path: '/chart',
    name: 'Chart',
    component: chart
  },
  {
    path: '/toy',
    name: 'Toy',
    component: toyApp
  },
  {
    path: '/toy/add',
    name: 'Add',
    component: toyAdd
  },
  {
    path: '/toy/edit/:toyId',
    name: 'Edit',
    component: toyEdit
  },
  {
    path: '/toy/details/:toyId',
    name: 'Details',
    component: toyDetails
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
