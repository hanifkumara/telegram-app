<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <div class="content-left">
          <div class="title-left d-flex justify-content-between align-items-center">
            <h2 style="color: #7E98DF;" @click="toHome">Telegram</h2>
            <div @click="handleToggle" class="icon-menu">
              <img src="@/assets/img/Menu.png" alt="menu-icon">
            </div>
          </div>
          <div class="container-popup" ref="popup">
            <div class="popup setting" @click="handleSetting">
              <div class="icon-popup">
                <img src="@/assets/img/Settings.png" alt="icon-setting">
              </div>
              <h6>Settings</h6>
            </div>
            <div class="popup contacts">
              <div class="icon-popup">
                <img src="@/assets/img/Contacts.png" alt="icon-contact">
              </div>
              <h6>Contacts</h6>
            </div>
            <div class="popup calls">
              <div class="icon-popup">
                <img src="@/assets/img/Vector.png" alt="icon-calls">
              </div>
              <h6>Calls</h6>
            </div>
            <div class="popup save-messages">
              <div class="icon-popup">
                <img src="@/assets/img/Rectangle 37.png" alt="icon-save-message">
              </div>
              <h6>Save Messages</h6>
            </div>
            <div class="popup invite-friend" @click="handleAddContact">
              <div class="icon-popup">
                <img src="@/assets/img/Invite friends.png" alt="icon-invite-friend">
              </div>
              <h6>Invite Friend</h6>
            </div>
            <div class="popup telegram-faq">
              <div class="icon-popup">
                <img src="@/assets/img/FAQ.png" alt="icon telegram-faq">
              </div>
              <h6>Telegram FAQ</h6>
            </div>
          </div>
          <div class="my-profile" ref="myProfile">
            <div class="middle-menu-toggle">
              <h4 style="color: #7E98DF; margin-bottom: 20px;">{{myProfile.username}}</h4>
              <label class="img-profile-toggle">
                <img :src="myProfile.photo" alt="profile-user">
                <input type="file" @change="hanldeUpload"/>
              </label>
              <h4>{{myProfile.name}}</h4>
              <h6 style="color: #848484;">{{myProfile.username}}</h6>
            </div>
            <h4 style="margin-bottom: 12px;">Account</h4>
            <input
              class="form-control"
              v-if="editPhone"
              v-model="myProfile.phoneNumber"
              @blur="editPhone = false; $emit('update')"
              @keyup.enter="handlePhone"
              v-focus
            >
            <div v-else>
              <h6 @click="editPhone = true;">{{myProfile.phoneNumber}}</h6>
            </div>
            <h6 style="color: #7E98DF; cursor: pointer;" @click="editPhone = true;">Tap to change phone number</h6>
            <hr style="margin: 12px 0;">
            <input
              class="form-control"
              v-if="editUsername"
              v-model="myProfile.username"
              @blur="editUsername = false; $emit('update')"
              @keyup.enter="handleUsername"
              v-focus
            >
            <div v-else>
              <h6 @click="editUsername = true;">{{myProfile.username}}</h6>
            </div>
            <h6 v-if="!myProfile.username" @click="editUsername = true;">Please add your username</h6>
            <h6 style="color: #848484;">Username</h6>
            <hr style="margin: 12px 0;">
            <textarea
              class="form-control"
              v-if="editBiodata"
              v-model="myProfile.biodata"
              @blur="editBiodata = false; $emit('update')"
              @keyup.enter="handleBiodata"
              v-focus
            ></textarea>
            <div v-else>
              <h6 class="biodata" @click="editBiodata = true;">{{myProfile.biodata}}</h6>
            </div>
            <h6 v-if="!myProfile.biodata" @click="editBiodata = true;">Please add your Biodata</h6>
            <h6 style="color: #848484;">Bio</h6>
            <hr style="margin: 12px 0;">
            <h6>Settings</h6>
            <div class="my-location d-flex align-items-center" @click="modalShow2 = !modalShow2">
              <div class="icon-maps">
                <img src="@/assets/img/icons8-map-marker-100.png" alt="icon-maps">
              </div>
              <h6 class="mt-2">My Location</h6>
              <b-modal size="xl" title="My Location" hide-footer v-model="modalShow2">
                <div>
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
                </div>
              </b-modal>
            </div>
            <h6 class="mt-2" style="cursor: pointer;" @click.prevent="handleLogout">Logout</h6>
          </div>
          <div class="container-add-contact" ref="addContact">
            <h4>Ini semua username</h4>
            <div class="d-flex justify-content-between mt-3" v-for="data in allContact" :key="data.id">
              <div class="card-left d-flex">
                <div class="photo">
                  <img :src="data.photo" alt="">
                </div>
                <div class="name-chat mx-2">
                  <h5>{{data.name}}</h5>
                  <p v-if="!data.biodata">Hey there! I am using TelegramApp</p>
                  <p>{{data.biodata}}</p>
                </div>
              </div>
              <div class="time-chat">
                <div @click="handleInvite(data.id)">
                  <div class="unfriend" v-if="handleIconUnfriend === data.id">
                    <img src="@/assets/img/icons8-unfriend-50.png" alt="unfriend">
                  </div>
                  <div class="add-friend" v-else >
                    <img src="@/assets/img/icons8-add-user-group-man-man-50.png" alt="add-friend">
                  </div>
                </div>
              </div>
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
            <div class="btn all btn-primary">
              <p>All</p>
            </div>
            <div class="btn important">
              <p>Important</p>
            </div>
            <div class="btn unread">
              <p>Unread</p>
            </div>
          </div>
          <div class="container-contact">
            <div v-if="allFriend.length < 1">
              <h2>Bsimillah</h2>
            </div>
            <div class="d-flex justify-content-between mt-3" v-else v-for="data in allFriend" :key="data.id">
              <div class="card-left d-flex" @click="handleProfileUser(data.friendId)">
                <div class="photo">
                  <img :src="data.friendPhoto" alt="photo-friend">
                </div>
                <div class="name-chat mx-2">
                  <h5>{{data.friendName}}</h5>
                  <p>Pesan singkat</p>
                </div>
              </div>
              <div class="time-chat">
                <h6>5.30</h6>
                <div class="count-new-chat">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="content-right">
          <router-view :socket="socket" :data-profile="profileUser" :my-profile="myProfile" :id-friend="idFriend"/>
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
      myId: localStorage.getItem('id'),
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
      biodata: '',
      editUsername: false,
      editPhone: false,
      editBiodata: false,
      idFriend: ''
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  methods: {
    ...mapActions(['getAllContact', 'getProfileUser', 'getMyProfile', 'updateMyProfile', 'historyChatPrivate', 'getAllFriend', 'logout', 'addFriend']),
    toHome () {
      const myProfile = this.$refs.myProfile
      const addContact = this.$refs.addContact
      myProfile.style.display = 'none'
      addContact.style.display = 'none'
      this.getAllFriend()
    },
    handleLogout () {
      const data = {
        socketId: 'Offline'
      }
      this.logout(data)
        .then(res => {
          console.log('coba bro')
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleToggle () {
      const handle = this.$refs.popup
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleSetting () {
      const handle = this.$refs.myProfile
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleAddContact () {
      const handle = this.$refs.addContact
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleInvite (id) {
      this.addFriend({ friendId: id })
        .then((result) => {
          Swal.fire(
            result.message,
            `${result.message === 'Unfriend success' ? 'Now you cant send message to this friend' : ''}`,
            'success'
          )
          console.log('ini result add friend', result)
        }).catch((err) => {
          console.log(err)
        })
    },
    handleProfileUser (id) {
      this.idFriend = id
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
      const result = e.target.files[0]
      const data = new FormData()
      data.append('photo', result)
      this.updateMyProfile(data)
        .then(res => {
          Swal.fire(
            'Edit Photo success',
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
    },
    handleUsername () {
      const payload = {
        username: this.myProfile.username
      }
      this.updateMyProfile(payload)
        .then(res => {
          Swal.fire(
            'Edit username success',
            `Your username has changed to @${payload.username}`,
            'success'
          )
          this.getMyProfile()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handlePhone () {
      const payload = {
        phoneNumber: this.myProfile.phoneNumber
      }
      this.updateMyProfile(payload)
        .then(res => {
          Swal.fire(
            'Edit Phone Number success',
            `Your number has changed to ${payload.phoneNumber}`,
            'success'
          )
          this.getMyProfile()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleBiodata () {
      const payload = {
        biodata: this.myProfile.biodata
      }
      this.updateMyProfile(payload)
        .then(res => {
          Swal.fire(
            'Edit biodata success',
            '',
            'success'
          )
          this.getMyProfile()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    const sender = localStorage.getItem('id')
    const receiver = this.idFriend
    this.socket.emit('initialUser', { idSender: sender, idReceiver: receiver, idLogin: sender })
    this.getAllContact()
    this.getMyProfile()
    console.log(this.myProfile)
    this.$getLocation()
      .then(coordinates => {
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markerLatLng = [coordinates.lat, coordinates.lng]
        console.log(coordinates)
      })
    this.socket.emit('handleStatus', this.myId)
    this.getAllFriend()
  },
  computed: {
    ...mapGetters(['allContact', 'profileUser', 'myProfile', 'allFriend']),
    handleIconUnfriend () {
      const data = this.allFriend
      const result = data.filter((value, index) => {
        return data[index].friendId
      })
      return result
    }
  },
  watch: {
    value: function () {
      this.myProfile.phoneNumber = this.value
      this.myProfile.username = this.value
      this.myProfile.biodata = this.value
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.content-left{
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 20px 0;
}
.content-right{
  width: 100%;
  height: 100vh;
  border-left: 1px solid #E5E5E5;
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
.input-search > input:focus{
  outline: none;
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
  padding: 0 22px;
  padding-top: 20px;
  position: absolute;
  left: 0;
  width: 100%;
  height: 570px;
  overflow: auto;
  background-color: #fff;
}
.my-profile h4, h5, h6 {
  margin: 0;
}
.my-profile > h6 {
  margin-bottom: 5px;
}
.img-profile-toggle{
  cursor: pointer;
  width: 90px;
  height: 90px;
  border-radius: 15px;
  margin-top: 20px;
  background-color: rgb(209, 196, 196);
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
  height: fit-content;
}
.icon-menu{
  cursor: pointer;
}
.icon-menu:hover{
  transform: scale(1.04)
}
.long-name{
  text-align: center;
  font-size: 20px;
}
.contact-long-name{
  font-size: 18px;
}
.count-new-chat{
  color: white;
  background: #7E98DF;
  font-size: 12px;
  padding: 5px 0;
  border-radius: 50%;
  text-align: center;
}
input#username{
  margin-top: -30px;
}
.container-popup>.popup{
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.container-popup>.popup:hover{
  background: #afbfeb;
}
.container-popup{
  display: none;
  right: 0;
  top: 70px;
  z-index: 99;
  width: 70%;
  padding: 20px 0;
  color: white;
  background: #7E98DF;
  position: absolute;
  border-radius: 35px 10px 35px 35px;
}
.icon-popup{
  width: 45px;
  margin-right: 10px;
  text-align: center;
}
.container-add-contact{
  background-color: white;
  width: 100%;
  height: 570px;
  overflow: auto;
  display: none;
  position: absolute;
  z-index: 2;
}
.add-friend, .unfriend{
  width: 20px;
  height: 20px;
  cursor: pointer
}
.add-friend, .unfriend:hover{
  transform: scale(1.08);
}
.add-friend > img, .unfriend > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
