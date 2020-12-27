<template>
  <div>
    <div class="top-menu d-flex justify-content-between align-items-center">
      <div class="menu-left">
        <div class="photo-name d-flex">
          <div class="photo-chat">
            <img :src="dataProfile.photo" alt="photo-profile">
          </div>
          <div class="status">
            <h5>{{dataProfile.name}}</h5>
            <h6>Online</h6>
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
              <h4 style="font-weight: 400; font-size: 18px;">{{dataProfile.biodata}}</h4>
              <label for="">Biodata</label>
            </div>
          </b-modal>
      </div>
    </div>
    <div class="content-chat">
      <div class="looping" v-for="(data, index) in chatHistory" :key="index">
        <div class="card-message mt-2" v-if="data.status === 'sender' || data.idReceiver === idLogin ">
          <h5>{{data.message}}</h5>
        </div>
        <div class="container-message-right" v-else>
          <div class="card-message-right">
            <h5>{{data.message}}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-chat">
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
  </div>
</template>

<script>

export default {
  name: 'ChatList',
  props: ['data-profile', 'socket', 'chat-history'],
  data () {
    return {
      inputMessage: '',
      idLogin: localStorage.getItem('id')
    }
  },
  methods: {
    handleEmit () {
      const receiver = this.dataProfile.id
      const sender = localStorage.getItem('id')
      this.socket.emit('messagePrivate', { idSender: sender, idReceiver: receiver, message: this.inputMessage })
      this.inputMessage = ''
    }
  },
  mounted () {
    this.socket.on('sendBack', data => {
      console.log('cek', data)
      console.log('astagfirullah')
      this.chatHistory.push(data)
    })
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
  background-color: grey;
  border-radius: 10px;
  margin-right: 10px;
}
.status > h5, h6{
  margin: 0;
}
.photo-chat > img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}
.content-chat {
  height: 480px;
  background-color: #FAFAFA;
  overflow: auto;
  padding: 0 10px;
  padding-bottom: 5px;
}
.bottom-chat{
  border: 1px solid;
  padding: 20px 40px;
}
.input-chat{
  width: 100%;
  position: relative;
}
.input-chat>input{
  width: 100%;
  border: .4px solid;
  border-radius: 10px;
  padding: 8px 30px;
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
  border-radius: 25px;
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.profile-modal{
  display: flex;
  flex-direction: column;
  align-items: center
}
.icon-profile:focus{
  outline: none;
}
.card-message{
  padding: 8px 30px;
  border-radius: 30px 30px 30px 0;
  background-color: rgb(182, 182, 248);
  color: white;
  width: fit-content
}
.container-message-right{
  display: flex;
  justify-content: flex-end
}
.card-message-right{
  padding: 8px 30px;
  border-radius: 30px 30px 0 30px;
  background-color: white;
  color: black;
  width: fit-content
}

@media screen and (max-width: 786px) {
  .content-chat {
    height: 480px;
    font-size: 18px;
  }
}
</style>
