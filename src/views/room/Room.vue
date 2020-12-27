<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h4>Assalamualaikum</h4>
          <ul class="list-group">
            <li class="list-group-item active" >Nama ROOM : {{$route.query.room}} </li>
            <li class="list-group-item" v-for="(message, index ) in messages" :key="index">{{message}}</li>
          </ul>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="inputMessage" @keypress.enter="handleClick" placeholder="input message">
            <div class="input-group-append">
              <button @click="handleClick" class="btn btn-outline-secondary" type="button" id="button-addon2">Kirim</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Room',
  data () {
    return {
      socket: io('http://localhost:5000'),
      inputMessage: '',
      messages: [],
      room: ''
    }
  },
  methods: {
    handleClick () {
      this.socket.emit('message', { message: this.inputMessage, room: this.room })
      this.inputMessage = ''
    }
  },
  mounted () {
    const username = this.$route.query.username
    const room = this.$route.query.room
    this.room = room
    this.socket.emit('afterLogin', { username, room })
    this.socket.on('sendBack', data => {
      console.log('sendBack', data)
      this.messages.push(data)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
