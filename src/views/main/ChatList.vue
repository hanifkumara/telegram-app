<template>
  <div>
    <div class="top-menu d-flex justify-content-between align-items-center" v-if="dataProfile.photo">
      <div class="menu-left">
        <div class="photo-name d-flex">
          <div class="photo-chat">
            <img :src="dataProfile.photo" alt="photo-profile">
          </div>
          <div class="status">
            <h5>{{dataProfile.name}}</h5>
            <h6>{{dataProfile.socketId}}</h6>
          </div>
        </div>
      </div>
      <div class="menu-right">
        <div class="icon-profile" v-b-modal.modal-1>
          <img src="@/assets/img/Profile menu.png" alt="icon-profile">
        </div>
          <b-modal id="modal-1" title="Profile Friend" ok-only>
            <div class="my-2 content-modal">
              <div class="profile-modal">
                <h4 style="color: #7E98DF;">{{dataProfile.username}}</h4>
                <h4 style="color: #848484; font-size: 14px;" v-if="!dataProfile.username">This user not yet set username</h4>
                <div class="photo-chat-modal my-2">
                  <img :src="dataProfile.photo" alt="photo-profile">
                </div>
              </div>
              <h4>{{dataProfile.name}}</h4>
              <label for="">Name</label>
              <hr>
              <h4>{{dataProfile.phoneNumber}}</h4>
              <label for="">Phone Number</label>
              <hr>
              <h4 style="font-weight: 600; font-size: 20px;">{{dataProfile.biodata}}</h4>
              <label for="">Bio</label>
              <h4>location</h4>
              <GmapMap
                  :center="{lat:dataProfile.locationLat, lng:dataProfile.locationLng}"
                  :zoom="7"
                  map-type-id="terrain"
                  style="width: 100%; height: 300px"
                >
                  <GmapMarker
                    :position="{lat:dataProfile.locationLat, lng:dataProfile.locationLng}"
                    :clickable="true"
                    :draggable="true"
                  />
                </GmapMap>
            </div>
          </b-modal>
      </div>
    </div>
    <div class="content-chat" ref="messageBody" v-if="dataProfile.photo">
      <div class="looping" v-for="(data, index) in chatHistory" :key="index">
        <div class="chat-time-img d-flex align-items-end" v-if="data.status === 'sender' || data.idReceiver === idLogin ">
          <div class="icon-profile-left">
            <img :src="dataProfile.photo" alt="receiver-photo">
          </div>
          <div class="card-message-left mt-2">
            <h5>{{data.message}}</h5>
          </div>
        </div>
        <div class="container-message-right d-flex justify-content-end" v-else>
          <div class="card-message-right mt-2">
            <h5>{{data.message}}</h5>
          </div>
          <div class="icon-profile-right">
            <img :src="myProfile.photo" alt="my-photo">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-chat" v-if="dataProfile.photo">
      <div class="input-chat">
        <input type="text" placeholder="Input your message . . ."  v-model="inputMessage" @keypress.enter="handleEmit">
        <div class="icon-chat d-flex justify-content-between">
          <div class="set-size">
            <img src="@/assets/img/Plus.png" alt="chat-plus">
          </div>
          <div class="set-size">
            <img src="@/assets/img/Vector2.png" alt="chat-emot">
          </div>
          <div class="set-size">
            <img src="@/assets/img/Group 181.png" alt="chat-record">
          </div>
        </div>
      </div>
    </div>
    <div class="chat-empty" v-else>Please select a chat to start messaging</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ChatList',
  props: ['data-profile', 'socket', 'my-profile', 'id-friend'],
  data () {
    return {
      inputMessage: '',
      idLogin: localStorage.getItem('id'),
      status: '',
      location: {
        lat: this.dataProfile.locationLat,
        lng: this.dataProfile.locationLng
      }
    }
  },
  methods: {
    ...mapActions(['historyChatPrivate']),
    // const result = res.data.result
    handleHistory () {
      const payload = {
        idReceiver: this.dataProfile.id
      }
      this.historyChatPrivate(payload)
        .then(res => {
          const result = res.data.result
          console.log('ini result', result)
          this.chatHistory.push(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEmit () {
      const receiver = this.dataProfile.id
      const sender = localStorage.getItem('id')
      this.socket.emit('messagePrivate', { idSender: sender, idReceiver: receiver, message: this.inputMessage, name: this.myProfile.name })
      this.inputMessage = ''
    }
  },
  mounted () {
    this.socket.on('status', data => {
      this.status = data
    })
    this.socket.on('sendBack', data => {
      if (data.notif) {
        this.$toasted.show(`Anda menerima pesan dari ${data.name}`, {
          type: 'info',
          duration: 3000,
          keepOnHover: true
        })
      }
      this.handleHistory()
    })
  },
  watch: {
    chatHistory: function () {
      setTimeout(() => {
        const container = this.$refs.messageBody
        container.scroll({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  },
  computed: {
    ...mapGetters(['chatHistory'])
  }
}
</script>

<style scoped>
.top-menu {
  padding: 20px 40px;
}
.photo-chat{
  width: 50px;
  height: 50px;
  background-color: rgb(211, 209, 209);
  border-radius: 10px;
  margin-right: 10px;
}
.status > h5, h6{
  margin: 0;
}
.photo-chat > img {
  object-fit: contain;
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.content-chat {
  height: 480px;
  background: #f7f5f5;
  overflow: scroll;
  padding: 8px 10px;
}
.bottom-chat{
  padding: 20px 40px;
}
.input-chat{
  width: 100%;
  position: relative;
}
.input-chat>input{
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 8px 30px;
  padding-right: 15%;
  background: #f7f5f5;
}
.input-chat>input:focus{
  outline: none;
}
.icon-chat{
  position: absolute;
  right: 30px;
  bottom: 17px;
  width: 90px;
}
.set-size{
  width: 18px;
  height: 18px;
}
.set-size > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.photo-chat-modal{
  width: 80px;
  height: 80px;
  border-radius: 25px;
  background-color: rgb(211, 209, 209);
}
.photo-chat-modal > img{
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 25px;
}
.profile-modal{
  display: flex;
  flex-direction: column;
  align-items: center
}
.icon-profile:focus{
  outline: none;
}
.card-message-left{
  width: fit-content;
  background-color: rgb(166, 166, 245);
  color: white;
  padding: 8px 30px;
  margin-left: 10px;
  border-radius: 30px 30px 30px 0;
}
.card-message-right{
  padding: 8px 30px;
  border-radius: 30px 30px 0 30px;
  background-color: white;
  color: black;
  width: fit-content;
  margin-right: 10px;
}
.icon-profile-right{
  width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 10px;
}
.icon-profile-right > img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 2px;
}
.chat-empty{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FAFAFA;
  height: 100vh;
  color: #848484;
  font-weight: 700;
  font-size: 27px;
}
.icon-profile-left{
  width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 10px;
}
.icon-profile-left > img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 786px) {
  .content-chat {
    height: 480px;
    font-size: 18px;
  }
}
@media screen and (max-width: 480px) {
  .content-chat {
    font-size: 14px;
  }
}
</style>
