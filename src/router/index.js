import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/auth/Auth.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Main from '../views/main/Main.vue'
import Room from '../views/room/Room.vue'
import MapPage from '../views/map/Map.vue'
import Map2 from '../views/map/Map2.vue'
import ChatList from '../views/main/ChatList.vue'
import ChatRoom from '../views/main/ChatRoom.vue'
import LoginDev from '../views/login/LoginDev.vue'
import store from '../store/index'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/auth/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login-dev',
    name: 'LoginDev',
    component: LoginDev
  },
  {
    path: '/room',
    name: 'Room',
    component: Room
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
    meta: { requiresVisitor: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'chat-list',
        name: 'ChatList',
        component: ChatList
      },
      {
        path: 'chat-room',
        name: 'ChatRoom',
        component: ChatRoom
      }
    ]
  },
  {
    path: '/map-page',
    name: 'MapPage',
    component: MapPage
  },
  {
    path: '/map-page-leaflet',
    name: 'Map2',
    component: Map2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      Swal.fire(
        'Must be logged in!!',
        '',
        'error'
      )
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      Swal.fire(
        'You already logged in!!',
        '',
        'error'
      )
      next({
        path: '/main/chat-list'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
