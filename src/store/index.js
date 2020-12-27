import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '' || localStorage.getItem('id'),
    token: '' || localStorage.getItem('token'),
    contact: [],
    historyChat: [],
    myProfile: {},
    profile: {}
  },
  mutations: {
    SET_AUTH (state, payload) {
      state.id = payload.id
      state.token = payload.token
    },
    GET_ALL_CONTACT (state, payload) {
      state.contact = payload
    },
    GET_PROFILE_USER (state, payload) {
      state.profile = payload
    },
    GET_MY_PROFILE (state, payload) {
      state.myProfile = payload
    },
    SET_HISTORY_PRIVATE (state, payload) {
      state.historyChat = payload
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
            const result = res.data.result
            console.log(result)
            context.commit('GET_ALL_CONTACT', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getProfileUser (context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${id}`)
          .then((res) => {
            const result = res.data.result[0]
            context.commit('GET_PROFILE_USER', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getMyProfile (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/myprofile`)
          .then((res) => {
            const result = res.data.result[0]
            context.commit('GET_MY_PROFILE', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateMyProfile (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/users`, payload)
          .then(res => {
            const { result } = res.data
            console.log('ini result update', result)
            resolve(result)
          })
          .catch(err => {
            console.log(err.response.data)
            reject(err.response.data.err.message)
          })
      })
    },
    historyChatPrivate (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/message/chat-private`, payload)
          .then(res => {
            const result = res.data.result
            context.commit('SET_HISTORY_PRIVATE', result)
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
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
    },
    profileUser (state) {
      return state.profile
    },
    myProfile (state) {
      return state.myProfile
    },
    chatHistory (state) {
      return state.historyChat
    }
  },
  modules: {
  }
})
