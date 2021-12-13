import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from "../views/Auth/Auth";
import Account from "../views/Account";
import Devices from "@/views/Devices";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta:{
      noNav: true
    },
    children:[
      {
        path: '/',
        name: "Inloggen",
        component: Login,
        meta:{
          noNav: true
        },
      },
      {
        path: 'register',
        name: "Account Aanmaken",
        component: Register,
        meta:{
          noNav: true
        },
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
