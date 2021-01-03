import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '' || localStorage.getItem('id'),
    token: '' || localStorage.getItem('token'),
    contact: [],
    myFriend: [],
    historyChat: [],
    historyRoomChat: [],
    groupChat: [],
    groupDetail: [],
    myProfile: {},
    profile: {},
    detailShort: {}
  },
  mutations: {
    SET_AUTH (state, payload) {
      state.id = payload.id
      state.token = payload.token
    },
    GET_ALL_CONTACT (state, payload) {
      state.contact = payload
    },
    GET_ALL_FRIEND (state, payload) {
      state.myFriend = payload
    },
    GET_GROUP_CHAT (state, payload) {
      state.groupChat = payload
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
    SET_HISTORY_ROOM (state, payload) {
      state.historyRoomChat = payload
    },
    GET_DETAIL_GROUP (state, payload) {
      state.groupDetail = payload
    },
    SHORT_DETAIL_GROUP (state, payload) {
      state.detailShort = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    }
  },
  actions: {
    getAllContact (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/list-users?name=${payload.name}`)
          .then((res) => {
            const result = res.data.result
            context.commit('GET_ALL_CONTACT', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getAllFriend (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/friend-list?name=${payload.name}`)
          .then((res) => {
            const result = res.data.result
            context.commit('GET_ALL_FRIEND', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getGroupChat (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/message-room/group-chat`)
          .then((res) => {
            const result = res.data.result
            context.commit('GET_GROUP_CHAT', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDetailGroup (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/message-room/detail-group?idRoom=${payload.idRoom}`)
          .then((res) => {
            const result = res.data.result
            console.log('ini detail', result)
            const shortDetail = {
              count: result.length,
              titleGroup: result[0].nameRoom
            }
            context.commit('SHORT_DETAIL_GROUP', shortDetail)
            context.commit('GET_DETAIL_GROUP', result)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addFriend (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/friend-list`, payload)
          .then(res => {
            const { result } = res.data
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
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
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/users`, payload)
          .then(res => {
            const { result } = res.data
            resolve(result)
          })
          .catch(err => {
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
    historyChatRoom (context, payload) {
      return new Promise((resolve, reject) => {
        console.log('ini payload', payload)
        axios.get(`${process.env.VUE_APP_SERVICE_API}/message-room/chat-room?idRoom=${payload.idRoom}`)
          .then(res => {
            const result = res.data.result
            console.log(res.data.result)
            context.commit('SET_HISTORY_ROOM', result)
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
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
            reject(err.response.data.err.message)
          })
      })
    },
    logout (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('updateMyProfile', payload)
          .then((res) => {
            localStorage.clear()
            context.commit('REMOVE_TOKEN')
            Swal.fire(
              'Logout Sucess!',
              'See you again!',
              'success'
            )
            router.push({ name: 'Auth' })
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    signup (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/register`, payload)
          .then(res => {
            Swal.fire(
              'Register Sucess!',
              '',
              'success'
            )
            router.push({ name: 'Auth' })
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
    allFriend (state) {
      return state.myFriend
    },
    profileUser (state) {
      return state.profile
    },
    allGroupChat (state) {
      return state.groupChat
    },
    myProfile (state) {
      return state.myProfile
    },
    chatHistory (state) {
      return state.historyChat
    },
    chatRoomHistory (state) {
      return state.historyRoomChat
    },
    detailGroup (state) {
      return state.groupDetail
    },
    shortDetail (state) {
      return state.detailShort
    },
    isLogin (state) {
      return state.token !== null
    }
  },
  modules: {
  }
})
