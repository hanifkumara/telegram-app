import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/auth/Auth.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Main from '../views/main/Main.vue'
import Room from '../views/main/Room.vue'
import MapPage from '../views/map/Map.vue'
import Map2 from '../views/map/Map2.vue'
import ChatList from '../views/main/ChatList.vue'

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
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
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
    redirect: '/main/chat-list',
    children: [
      {
        path: 'chat-list',
        name: 'ChatList',
        component: ChatList
      },
      {
        path: 'room',
        name: 'Room',
        component: Room
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

export default router
