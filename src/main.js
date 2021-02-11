import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import Map from './components/Map.vue'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import VEmojiPicker from 'v-emoji-picker'

Vue.config.productionTip = false
Vue.use(VEmojiPicker)

Vue.use(require('vue-moment'))

Vue.use(Toasted)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC44CF_DtBrKh42a-abHf5x3mCSezs7ytc',
    libraries: 'places'
  }
})

Vue.use(VueGeolocation)

Vue.component('MapComponent', Map)

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
