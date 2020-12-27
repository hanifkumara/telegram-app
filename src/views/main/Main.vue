<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div class="content-left">
          <div class="title-left d-flex justify-content-between align-items-center">
            <h2 style="color: #7E98DF;">Telegram</h2>
            <div class="icon-menu" @click="handleToggle">
              <img src="@/assets/img/Menu.png" alt="menu-icon">
            </div>
          </div>
          <div class="my-profile"  ref="menuToggle">
            <div class="middle-menu-toggle">
              <h4 style="color: #7E98DF; margin-bottom: 20px;">{{myProfile.username}}</h4>
              <div class="img-profile-toggle">
                <img :src="myProfile.photo" alt="profile-user">
              </div>
              <h4>{{myProfile.name}}</h4>
              <h6 style="color: #848484;">{{myProfile.username}}</h6>
            </div>
            <h4 style="margin-bottom: 12px;">Account</h4>
            <h6>{{myProfile.phoneNumber}}</h6>
            <h6 style="color: #7E98DF;">Tap to change phone number</h6>
            <hr style="margin: 12px 0;">
            <h6>{{myProfile.username}}</h6>
            <h6 v-if="!myProfile.username">Please add your username</h6>
            <h6 style="color: #848484;">Username</h6>
            <hr style="margin: 12px 0;">
            <h6 v-if="!myProfile.biodata">Please add your Biodata</h6>
            <h6 class="biodata">{{myProfile.biodata}}</h6>
            <h6 style="color: #848484;">Bio</h6>
            <hr style="margin: 12px 0;">
            <h6>Settings</h6>
            <div class="settings d-flex align-items-center mt-2" @click="modalShow = !modalShow">
              <div class="icon-edit">
                <img src="@/assets/img/icons8-edit-104.png" alt="icon-edit">
              </div>
              <h6>Edit profile</h6>
              <b-modal title="Edit My Profile" hide-footer v-model="modalShow">
                <div class="d-flex flex-column align-items-center">
                  <div class="img-profile-edit">
                    <img :src="myProfile.photo" alt="profile-user">
                  </div>
                  <label class="custom-file-upload">
                      <input type="file" @change="hanldeUpload"/>
                      Update Photo
                  </label>
                </div>
              <form @submit.prevent="handleSubmit" class="form-toggle">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" class="form-control" v-model="phoneNumber" :placeholder="myProfile.phoneNumber" id="phoneNumber" autocomplete="off">
                <label for="username">Username</label>
                <input type="text" class="form-control" v-model="username" :placeholder="myProfile.username" id="username" autocomplete="off">
                <label for="biodata">Biodata</label>
                <textarea type="text" class="form-control" v-model="biodata" :placeholder="myProfile.biodata" id="biodata" rows="3"></textarea>
                <div class="button-edit d-flex justify-content-end mt-2">
                  <button class="btn btn-primary" type="submit">Edit Profile</button>
                </div>
              </form>
            </b-modal>
            </div>
            <div class="my-location d-flex align-items-center" @click="modalShow2 = !modalShow2">
              <div class="icon-maps">
                <img src="@/assets/img/icons8-map-marker-100.png" alt="icon-maps">
              </div>
              <h6 class="mt-2">My Location</h6>
              <b-modal size="xl" title="My Location" hide-footer v-model="modalShow2">
                <l-map
                  :zoom="zoom"
                  :center="center"
                  style="height: 500px; width: 100%"
                >
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"
                />
                <l-marker :lat-lng="markerLatLng" ></l-marker>
                </l-map>
              </b-modal>
            </div>
          </div>
          <div class="input-search my-3 d-flex justify-content-between align-items-center">
            <input type="text" placeholder="Search user">
            <img src="@/assets/img/Search.png" alt="icon-search">
            <div class="icon-plus">
              <img src="@/assets/img/Plus.png" alt="icon-plus">
            </div>
          </div>
          <div class="menu-chat d-flex justify-content-between">
            <div class="btn all">
              <p>All</p>
            </div>
            <div class="btn btn-primary important">
              <p>Important</p>
            </div>
            <div class="btn unread">
              <p>Unread</p>
            </div>
          </div>
          <div class="container-contact">
            <div class="d-flex justify-content-between mt-3" v-for="data in allContact" :key="data.id">
              <div class="card-left d-flex" @click="handleProfileUser(data.id)">
                <div class="photo">
                  <img :src="data.photo" alt="">
                </div>
                <div class="name-chat mx-2">
                  <h5 >{{data.name}}</h5>
                  <p>Pesan singkat</p>
                </div>
              </div>
              <div class="time">
                <h6>5.30</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="content-right">
          <router-view :socket="socket" :data-profile="profileUser" :chat-history="chatHistory"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import Swal from 'sweetalert2'

export default {
  name: 'Main',
  data () {
    return {
      allMassage: [],
      socket: io('http://localhost:5000'),
      dataProfile: [],
      modalShow: false,
      modalShow2: false,
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: [0, 0],
      image: null,
      phoneNumber: '',
      username: '',
      biodata: ''
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  methods: {
    ...mapActions(['getAllContact', 'getProfileUser', 'getMyProfile', 'updateMyProfile', 'historyChatPrivate']),
    handleToggle () {
      const handle = this.$refs.menuToggle
      handle.classList.toggle('slide')
    },
    handleProfileUser (id) {
      const sender = localStorage.getItem('id')
      const receiver = id
      this.socket.emit('initialUser', { idSender: sender, idReceiver: receiver, idLogin: sender })
      const payload = {
        idReceiver: id
      }
      this.historyChatPrivate(payload)
        .then(res => {
          console.log(res)
        })
      this.getProfileUser(id)
        .then((result) => {
          const resData = result[0]
          this.dataProfile.push(resData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    hanldeUpload (e) {
      console.log(e.target.files[0])
      this.image = e.target.files[0]
    },
    handleSubmit () {
      console.log('anda klik handle submit')
      const data = new FormData()
      data.append('photo', this.image)
      data.append('username', this.username)
      data.append('phoneNumber', this.phoneNumber)
      data.append('biodata', this.biodata)

      this.updateMyProfile(data)
        .then(res => {
          Swal.fire(
            'Edit profile success',
            '',
            'success'
          )
          this.getMyProfile()
        })
        .catch(err => {
          let message = ''
          if (err === 'Only images are allowed') {
            message = 'Only images are allowed'
          } else {
            message = 'File too large, max length 1MB'
          }
          Swal.fire(
            `${message}`,
            '',
            'error'
          )
          console.log(err)
        })
    }
  },
  mounted () {
    this.getAllContact()
      .then(res => {
        console.log(res)
      })
    this.getMyProfile()
    console.log(this.myProfile)
    this.$getLocation()
      .then(coordinates => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markerLatLng = [coordinates.lat, coordinates.lng]
        console.log(coordinates)
      })
  },
  computed: {
    ...mapGetters(['allContact', 'profileUser', 'myProfile', 'chatHistory'])
  }
}
</script>

<style scoped>
.content-left{
  width: 100%;
  height: 100vh;
  padding: 20px 0;
}
.content-right{
  width: 100%;
  height: 100vh;
  border: 1px solid;
}
.photo{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(209, 196, 196);
}
.photo > img {
  object-fit: contain;
  height: 100%;
  border-radius: 10px;
  width: 100%;
}
.name-chat > h5, p {
  margin: 0
}
.input-search{
  width: 100%;
  position: relative;
}
.input-search>input{
  padding: 8px 10px;
  padding-left: 40px;
  border-radius: 10px;
  width: 100%;
  border: .2px solid;
  color: #848484;
  margin-right: 10px;
}
.input-search>[alt="icon-search"]{
  position: absolute;
  left: 10px;
  top: 10px;
}
.icon-plus{
  width: 30px;
  height: 30px;
}
.icon-plus>img{
  object-fit: contain;
  height: 100%;
  width: 100%
}
.btn{
  border-radius: 20px;
  padding: 5px 15px;
}
.btn > p{
  font-size: 16px;
  font-weight: 600;
}
.btn-primary{
  background: #7E98DF;
  border: #7E98DF;
}
.container-contact{
  height: 450px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 2px;
}
.my-profile{
  z-index: 2;
  display: none;
}
.my-profile h4, h5, h6 {
  margin: 0;
}
.my-profile > h6 {
  margin-bottom: 5px;
}
.slide{
  padding: 0 22px;
  padding-top: 20px;
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  height: fit-content;
  background-color: #fff;
  transition: .4s;
}
.img-profile-toggle{
  width: 60px;
  height: 60px;
  border-radius: 15px;
  margin-top: 20px;
}
.img-profile-toggle > img {
  border-radius: 15px;
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.middle-menu-toggle{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}
.icon-edit{
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
.icon-edit > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.settings{
  width: fit-content;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  margin-top: 10px;
  border: 1px solid rgb(173, 173, 173);
  display: inline-block;
  padding: 4px 12px;
  cursor: pointer;
  border-radius: 3px;
}
.my-location{
  cursor: pointer;
  width: fit-content
}
.icon-maps{
  margin-right: 10px;
  margin-top: 10px;
  width: 22px;
  height: 22px;
}
.icon-maps > img {
  object-fit: contain;
  height: 100%;
  width: 100%;
}
.form-toggle{
  display: flex;
  flex-direction: column
}
.form-toggle > input {
  border: none;
  border-bottom: .4px solid;
  padding: 8px 20px;
}
.form-toggle > input:focus {
  outline: none;
}
.form-toggle > label{
  font-weight: 700;
  margin-top: 20px;
}
.img-profile-edit{
  width: 120px;
  height: 120px;
  border-radius: 15px;
}
.img-profile-edit > img {
  object-fit: contain;
  width: 100%;
  border-radius: 15px;
  height: 100%;
}
button.btn.btn-primary{
  padding: 8px 20px;
  border-radius: 8px;
  width: 30%;
}
.biodata{
  overflow: auto;
  height: 50px;
}
</style>
