import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from "../views/Auth/Auth";
import Account from "../views/Account";
import Devices from "@/views/Devices/Devices";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";
import Device from "@/views/Devices/Device";
import store from "../store/index.js";

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
    component: Devices,
    children: [
      {
        path: ':id',
        component: Device
      },
    ]
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

router.beforeEach((to, from, next) => {
  //todo check the correct status set after login.
  if(!(to.name == "Inloggen" || to.name == "Account Aanmaken") && store.state.status != "loggedIn") {
    next({name: 'Inloggen'})
  }
  else {
    next()
  }
  console.log(store.state.status)
  console.log(to, from, next)
})
export default router
