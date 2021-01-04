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
            <div class="popup contacts" @click="handleMyContact">
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
            <div class="popup" @click="handleGroup">
              <div class="icon-popup">
              </div>
              <h6>Group</h6>
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
            <h6>My Location</h6>
                <GmapMap
                  :center="{lat:location.lat, lng:location.lng}"
                  :zoom="7"
                  map-type-id="terrain"
                  style="width: 100%; height: 300px"
                >
                  <GmapMarker
                    :position="{lat:location.lat, lng:location.lng}"
                    :clickable="true"
                    :draggable="true"
                  />
                </GmapMap>
            <h6 class="mt-2" style="cursor: pointer;" @click.prevent="handleLogout">Logout</h6>
          </div>
          <div class="my-contact" ref="myContact">
            <div class="d-flex justify-content-between mt-3" v-for="data in allFriend" :key="data.id">
              <div class="card-left d-flex">
                <div class="photo">
                  <img :src="data.friendPhoto" alt="photo-friend">
                </div>
                <div class="name-chat mx-2">
                  <h5>{{data.friendName}}</h5>
                </div>
              </div>
              <div class="time-chat d-flex">
                <div class="mr-4">
                  <b-dropdown class="invite-group m-md-2" id="dropdown-1" >
                    <b-dropdown-item v-for="dataGroup in allGroupChat" :key="dataGroup.id" @click="handleInviteGroup(dataGroup.idRoom, data.friendId)">{{dataGroup.nameRoom}}</b-dropdown-item>
                  </b-dropdown>
                </div>
                <!-- <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                  <b-dropdown-item>First Action</b-dropdown-item>
                  <b-dropdown-item>Second Action</b-dropdown-item>
                  <b-dropdown-item>Third Action</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item active>Active action</b-dropdown-item>
                  <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown> -->
                <div class="unfriend" @click="handleInvite(data.friendId)">
                  <img src="@/assets/img/icons8-unfriend-50.png" alt="unfriend">
                </div>
            </div>
            </div>
          </div>
          <div class="container-group" ref="group">
            <h5>Hello nif</h5>
          </div>
          <div class="container-add-contact" ref="addContact">
            <div class="title-add-contact">
              <h4 style="padding-top: 20px;">All users TelegramApp</h4>
              <input type="text" placeholder="Search users name . . ." v-model="searchUser" class="form-control">
            </div>
            <hr>
            <div class="d-flex justify-content-between mt-3" v-for="data in allContact" :key="data.id">
              <div class="card-left d-flex">
                <div class="photo">
                  <img :src="data.photo" alt="">
                </div>
                <div class="name-chat mx-2">
                  <h5>{{data.name}}</h5>
                  <p v-if="!data.username">{{data.email}}</p>
                  <p>{{data.username}}</p>
                </div>
              </div>
              <div class="time-chat">
                <div @click="handleInvite(data.id)">
                  <div class="add-friend">
                    <img src="@/assets/img/icons8-add-user-group-man-man-50.png" alt="add-friend">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="input-search my-3 d-flex justify-content-between align-items-center">
            <input type="text" placeholder="Search user" v-model="searchFriendChat">
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
            <div  class="display-default" v-if="allFriend.length < 1 && allGroupChat.length < 1">
              <h2>You don't have chat friend yet. Please add friends in the invite friend menu</h2>
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
            <div class="list-room" v-for="data in allGroupChat" :key="data.id" @click="handleDataGroup(data.idRoom)">
              <div class="room-left d-flex">
                <div class="icon-room">
                  <img v-if="data.nameRoom === 'Web 5'" src="@/assets/img/pp.jpg" alt="Web 5">
                  <img v-if="data.nameRoom === 'Picnic Schedule'" src="@/assets/img/ppG.jpg" alt="Picnic Schedule">
                  <img v-else :src="data.photoRoom" alt="Image Room">
                </div>
                <div class="room-name ml-2">
                  <h5>{{data.nameRoom}}</h5>
                  <p>chat group</p>
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
          <router-view :socket="socket" :data-profile="profileUser" :my-profile="myProfile" :id-friend="idFriend" :id-room="idRoom" :chat-room="chatRoomHistory" :detail-group="detailGroup" :short-detail="shortDetail"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
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
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      image: null,
      phoneNumber: '',
      username: '',
      biodata: '',
      editUsername: false,
      editPhone: false,
      editBiodata: false,
      idFriend: '',
      searchUser: '',
      searchFriendChat: '',
      location: {
        lat: 0,
        lng: 0
      },
      idRoom: ''
    }
  },
  methods: {
    ...mapActions(['getAllContact', 'getProfileUser', 'getMyProfile', 'updateMyProfile', 'historyChatPrivate', 'getAllFriend', 'logout', 'addFriend', 'getGroupChat', 'historyChatRoom', 'getDetailGroup', 'addMemberGroup']),
    toHome () {
      const myProfile = this.$refs.myProfile
      const addContact = this.$refs.addContact
      const myContact = this.$refs.myContact
      myProfile.style.display = 'none'
      addContact.style.display = 'none'
      myContact.style.display = 'none'
      this.getAllFriend({ name: '' })
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
    handleSearchUser () {
      this.getAllContact({ name: this.searchUser })
    },
    handleSearchFriendChat () {
      this.getAllFriend({ name: this.searchFriendChat })
    },
    handleMyContact () {
      const handle = this.$refs.myContact
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleAddContact () {
      this.getAllContact({ name: '' })
      const handle = this.$refs.addContact
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleGroup () {
      const handle = this.$refs.group
      if (handle.style.display === 'none') {
        handle.style.display = 'block'
      } else {
        handle.style.display = 'none'
      }
    },
    handleInviteGroup (idRoom, idUser) {
      console.log('ini id roomnya', idRoom)
      console.log('ini id user', idUser)
      const payload = {
        idRoom,
        idUser
      }
      this.addMemberGroup(payload)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleInvite (id) {
      console.log('ini id nya', id)
      this.addFriend({ friendId: id })
        .then((result) => {
          console.log(result)
          Swal.fire(
            result.message,
            `${result.message === 'Unfriend success' ? 'Now you cant send message to this friend' : ''}`,
            'success'
          )
          if (result.message === 'Unfriend success') {
            this.getAllFriend({ name: '' })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    handleProfileUser (id) {
      this.idFriend = id
      const payload = {
        idReceiver: id
      }
      this.$router.push({ name: 'ChatList' }).catch(() => {})
      this.historyChatPrivate(payload)
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
    },
    handleDataGroup (idRoom) {
      console.log('ini idroom', idRoom)
      this.idRoom = idRoom
      this.socket.emit('initialRoom', idRoom)
      this.getDetailGroup({ idRoom })
      this.historyChatRoom({ idRoom })
      this.$router.push({ name: 'ChatRoom' }).catch(() => {})
    }
  },
  mounted () {
    const sender = localStorage.getItem('id')
    const receiver = this.idFriend
    this.socket.emit('initialUser', { idSender: sender, idReceiver: receiver, idLogin: sender })
    this.getMyProfile()
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
        const data = {
          locationLat: coordinates.lat,
          locationLng: coordinates.lng
        }
        this.updateMyProfile(data)
          .then((result) => {
            console.log(result)
          })
          .catch((err) => {
            console.log(err)
          })
        console.log(typeof data.locationLat)
      })
    this.socket.emit('handleStatus', this.myId)
    this.getAllFriend({ name: '' })
    this.getGroupChat()
  },
  computed: {
    ...mapGetters(['allContact', 'profileUser', 'myProfile', 'allFriend', 'allGroupChat', 'chatRoomHistory', 'detailGroup', 'shortDetail']),
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
    },
    searchUser: function () {
      this.handleSearchUser()
    },
    searchFriendChat: function () {
      this.handleSearchFriendChat()
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
  overflow: auto;
  background-color: white;
  width: 100%;
  height: 570px;
  overflow: auto;
  display: none;
  position: absolute;
  z-index: 2;
}
.add-friend, .unfriend, .invite-group{
  width: 20px;
  height: 20px;
  cursor: pointer
}
.add-friend, .invite-group, .unfriend:hover{
  transform: scale(1.08);
}
.add-friend > img, .unfriend > img, .invite-group > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.display-default{
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 35px;
  color: rgb(180, 173, 173);
}
.icon-room{
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.icon-room > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 10px;

}
.list-room{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.my-contact{
  display: none;
  position: absolute;
  left: -1px;
  top: 80px;
  width: 100%;
  z-index: 2;
  overflow: auto;
  height: 550px;
  background-color: #fff;
}
.container-group{
  display: none;
  position: absolute;
  left: 0;
  top: 80px;
  width: 100%;
  z-index: 2;
  overflow: auto;
  height: 550px;
  background-color: #fff;
}
</style>
