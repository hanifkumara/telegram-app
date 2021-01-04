<template>
  <div>
    <div class="top-menu">
      <div class="menu-left">
        <div class="photo-name d-flex align-items-center">
          <div class="photo-chat">
            <img v-if="shortDetail.titleGroup === 'Web 5'" src="@/assets/img/pp.jpg" alt="photo-profile">
            <img v-if="shortDetail.titleGroup === 'Picnic Schedule'" src="@/assets/img/ppG.jpg" alt="photo-profile">
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
                <img v-if="shortDetail.titleGroup === 'Web 5'" src="@/assets/img/pp.jpg" alt="photo-profile">
                <img v-if="shortDetail.titleGroup === 'Picnic Schedule'" src="@/assets/img/ppG.jpg" alt="photo-profile">
              </div>
              <hr>
              <h4>{{shortDetail.count}} member</h4>
              <div class="detail-user-join d-flex justify-content-between" v-for="data in detailGroup" :key="data.id">
                <div class="left-detail d-flex">
                  <div class="detail-photo">
                    <img :src="data.photoMember" alt="Photo Member">
                  </div>
                  <div class="name-phone ml-2">
                    <h5 v-if="data.idUser === idLogin">You</h5>
                    <h5 v-else>{{data.nameMember}}</h5>
                    <h6 v-if="data.phoneMember">{{data.phoneMember}}</h6>
                    <h6 v-else style="font-size: 14px; color: grey;">this user have not fill phone number</h6>
                  </div>
                </div>
                <div class="delete-member" @click="handleDeleteMember(idRoom, data.idUser)">
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
          <div class="message-right">
            <h6>{{data.message}}</h6>
          </div>
        </div>
        <div class="chat-left" v-else>
          <p>{{data.nameMember}}</p>
          <h6>{{data.message}}</h6>
        </div>
      </div>
    </div>
    <div class="bottom-chat">
      <div class="input-message">
        <input type="text" class="form-control" v-model="inputMessage" placeholder="Type your message . . ." @keypress.enter="handleEmit">
        <div class="icon-input">
          <img src="@/assets/img/Plus.png" alt="icon plus">
          <img src="@/assets/img/Vector2.png" alt="icon stiker">
          <img src="@/assets/img/Group 181.png" alt="icon record">
        </div>
      </div>
    </div>
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
      inputMessage: ''
    }
  },
  props: ['socket', 'id-room', 'chat-room', 'detail-group', 'short-detail'],
  methods: {
    ...mapActions(['historyChatRoom', 'deleteMember', 'getDetailGroup']),
    handleEmit () {
      const idRoom = this.idRoom
      const idUser = this.idLogin
      this.socket.emit('messageRoom', { idUser, idRoom, message: this.inputMessage, nameRoom: this.shortDetail.titleGroup })
      this.inputMessage = ''
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
    console.log('hai')
    this.socket.on('sendBackRoom', data => {
      if (data.notif) {
        this.$toasted.show(`Anda menerima pesan dari Grup ${data.nameRoom}`, {
          type: 'info',
          duration: 3000,
          keepOnHover: true
        })
      }
      console.log('ini data sendbackroom', data)
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
</style>
