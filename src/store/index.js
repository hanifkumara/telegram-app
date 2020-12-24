import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '' || localStorage.getItem('id'),
    token: '' || localStorage.getItem('token'),
    contact: []
  },
  mutations: {
    SET_AUTH (state, payload) {
      state.id = payload.id
      state.token = payload.token
    },
    GET_ALL_CONTACT (state, payload) {
      state.contact = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    }
  },
  actions: {
    getAllContact (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/list-users`)
          .then((res) => {
            const { result } = res.data
            context.commit('GET_ALL_CONTACT', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/login`, payload)
          .then(res => {
            const { result } = res.data
            localStorage.setItem('id', result.id)
            localStorage.setItem('token', result.token)
            const payload = {
              id: result.id,
              token: result.token
            }
            context.commit('SET_AUTH', payload)
            resolve(result)
          })
          .catch(err => {
            reject(err.response.data.err)
          })
      })
    },
    signup (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/register`, payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err.response.data.err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          if (error.response.data.err.message === 'Invalid Token') {
            localStorage.clear()
            context.commit('REMOVE_TOKEN')
            router.push({ name: 'Login' })
          } else if (error.response.data.err.message === 'Token Expired') {
            localStorage.clear()
            context.commit('REMOVE_TOKEN')
            router.push({ name: 'Login' })
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    allContact (state) {
      return state.contact
    }
  },
  modules: {
  }
})
