import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from "../views/Auth";
import Account from "../views/Account";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
