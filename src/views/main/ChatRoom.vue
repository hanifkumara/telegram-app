<template>
  <div>
    <div v-if="shortDetail.photoRoom" class="container-chat-room">
      <div class="top-menu">
        <div class="menu-left">
          <div class="photo-name d-flex align-items-center">
            <div class="photo-chat">
              <img :src="shortDetail.photoRoom" alt="photo-profile" @error="handlePlaceholderImg">
            </div>
            <div class="status">
              <h5>{{shortDetail.titleGroup}}</h5>
              <h6>{{shortDetail.count}} users already join group</h6>
            </div>
          </div>
        </div>
        <div class="menu-right">
          <div class="icon-profile" v-b-modal.modal-1>
            <img src="@/assets/img/Profile menu.png" alt="icon-profile">
          </div>
          <b-modal id="modal-1" :title="shortDetail.titleGroup" ok-only>
              <div class="my-2 content-modal">
                <div class="photo-chat mb-3">
                  <img :src="shortDetail.photoRoom" alt="photo-profile" @error="handlePlaceholderImg">
                </div>
                <hr>
                <h4>{{shortDetail.count}} member</h4>
                <div class="detail-user-join d-flex justify-content-between" v-for="data in detailGroup" :key="data.id">
                  <div class="left-detail d-flex">
                    <div class="detail-photo">
                      <img :src="data.photoMember" alt="Photo Member" @error="handlePlaceholderImg">
                    </div>
                    <div class="name-phone ml-2">
                      <h5 v-if="data.idUser === idLogin">You</h5>
                      <h5 v-else>{{data.nameMember}}</h5>
                      <h6 v-if="data.phoneMember">{{data.phoneMember}}</h6>
                      <h6 v-else style="font-size: 14px; color: grey;">this user have not fill phone number</h6>
                    </div>
                  </div>
                  <div v-if="data.idUser === idLogin"></div>
                  <div v-else class="badge badge-danger" style="height: fit-content;" @click="handleDeleteMember(idRoom, data.idUser)">
                    delete
                  </div>
                </div>
              </div>
            </b-modal>
        </div>
      </div>
      <div class="content-chat" ref="messageBody">
        <div v-for="data in chatRoom" :key="data.id">
          <div class="chat-right" v-if="data.idUser === idLogin">
            <div class="time-chat mr-2">
              {{data.createdAt | moment('calendar')}}
            </div>
            <div class="message-right">
              <h6>{{data.message}}</h6>
            </div>
          </div>
          <div class="d-flex align-items-center" v-else>
            <div class="chat-left">
              <p>{{data.nameMember}}</p>
              <h6>{{data.message}}</h6>
            </div>
            <div class="time-chat ml-2">
              {{data.createdAt | moment('calendar')}}
            </div>
          </div>
        </div>
      </div>
      <div class="emoji" v-show="showEmoji">
        <VEmojiPicker emojiSize=30 limitFrequently=8 @select="selectEmoji" />
      </div>
      <div class="bottom-chat">
        <div class="input-message">
          <input type="text" class="form-control" v-model="inputMessage" placeholder="Type your message . . ." @keypress.enter="handleEmit">
          <div class="icon-input">
            <img src="@/assets/img/Plus.png" alt="icon plus">
            <img src="@/assets/img/Vector2.png" alt="icon stiker" @click="showEmoji = !showEmoji">
            <img src="@/assets/img/Group 181.png" alt="icon record">
            <div class="set-size-send" @click="handleEmit">
              <img src="@/assets/img/74-749231_png-file-svg-send-message-icon-png-transparent-removebg.png" alt="Send Icon">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="chat-room-null"><h4>Please select a chat to start messaging</h4></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ChatRoom',
  data () {
    return {
      idLogin: localStorage.getItem('id'),
      inputMessage: '',
      showEmoji: false
    }
  },
  props: ['socket', 'id-room', 'chat-room', 'detail-group', 'short-detail'],
  methods: {
    ...mapActions(['historyChatRoom', 'deleteMember', 'getDetailGroup']),
    handlePlaceholderImg (e) {
      e.target.src = 'https://dummyimage.com/600x600/c4bac4/525252.jpg&text=Chat+Group'
    },
    handleEmit () {
      const idRoom = this.idRoom
      const idUser = this.idLogin
      this.socket.emit('messageRoom', { idUser, idRoom, message: this.inputMessage, nameRoom: this.shortDetail.titleGroup })
      this.inputMessage = ''
    },
    selectEmoji (emoji) {
      this.inputMessage += emoji.data
    },
    handleHistoryRoom () {
      this.historyChatRoom({ idRoom: this.idRoom })
        .then(res => {
          const result = res.data.result
          console.log('ini result', res.data)
          this.chatRoom.push(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleDeleteMember (idRoom, idUser) {
      console.log(idRoom)
      console.log(idUser)
      this.deleteMember({ idRoom, idUser })
        .then((result) => {
          this.getDetailGroup({ idRoom })
          Swal.fire(
            result.message,
            '',
            'success'
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['chatRoomHistory'])
  },
  mounted () {
    this.socket.on('sendBackRoom', data => {
      console.log(data.notif)
      this.handleHistoryRoom()
    })
  },
  watch: {
    chatRoom: function () {
      setTimeout(() => {
        const container = this.$refs.messageBody
        container.scroll({
          top: container.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  }
}
</script>

<style scoped>
.top-menu {
  padding: 20px 40px;
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
.photo-chat{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 15px;
}
.photo-chat > img {
  object-fit: contain;
  width: 100%;
  border-radius: 10px;
  height: 100%;
}
.top-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input-message{
  position: relative
}
.input-message > .form-control{
  padding: 10px 10px;
  padding-right: 18%;
  background: #f7f5f5;
  border: none
}
.icon-input{
  width:100px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 20px;
  bottom: 7px;
}
.chat-right{
  display: flex;
  justify-content: flex-end;
  align-items:center;
}
.message-right{
  width: fit-content;
  background-color: #fff;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 25px 0 25px 25px;
}
.message-right > p{
  margin: 0;
}
.chat-left{
  width: fit-content;
  padding: 10px 20px;
  border-radius: 25px 25px 25px 0;
  margin-top: 10px;
  background-color: rgb(166, 166, 245);
  color: white;
}
.chat-left > p{
  margin: 0;
  color: blue;
}
::-webkit-scrollbar {
  width: 2px;
}
.icon-profile:focus{
  outline: none;
}
.detail-photo{
  width: 50px;
  height: 50px;
  border-radius: 15px;
}
.detail-photo > img {
  border-radius: 15px;
  width: 100%;
  height: 100%;
}
.content-modal > .photo-chat {
  display: flex;
  margin: auto;
  width: 400px;
  height: 400px;
}
.badge-danger{
  cursor: pointer
}
.chat-room-null{
  height: 100vh;
  width: 100%;
  color: rgb(179, 171, 171);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
}
.container-chat-room{
  position: relative;
}
.emoji{
  position: absolute;
  right: 45px;
  bottom: 75px;
}
.set-size-send{
  display: none;
  width: 22px;
  height: 22px
}
.set-size-send > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.time-chat{
  font-weight: 700;
  font-size: 11px;
}
@media screen and (max-width: 768px) {
  .set-size-send {
    display: block;
  }
  [alt="icon record"]{
    display: none;
  }
}
</style>
