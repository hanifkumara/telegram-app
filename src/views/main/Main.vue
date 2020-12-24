<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <div class="content-left">
          <h4>Ini content di kiri</h4>
          <div class="d-flex justify-content-between" v-for="data in allContact" :key="data.id">
            <div class="card-left d-flex">
              <div class="photo">
                <img :src="data.photo" alt="">
              </div>
              <div class="name-chat">
                <h5 >{{data.name}}</h5>
                <p>Pesan singkat</p>
              </div>
            </div>
            <div class="time">
              {{data.createdAt}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="content-right">
          <router-view :socket="socket"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('http://localhost:5000')
    }
  },
  methods: {
    ...mapActions(['getAllContact'])
  },
  mounted () {
    console.log(localStorage.getItem('id'))
    this.getAllContact()
  },
  computed: {
    ...mapGetters(['allContact'])
  }
}
</script>

<style scoped>
.content-left{
  width: 100%;
  height: 100vh;
  border: 1px solid
}
.content-right{
  width: 100%;
  height: 100vh;
  border: 1px solid;
}
.photo{
  width: 50px;
  height: 50px;
}
.photo > img {
  object-fit: contain;
  height: 100%;
  border-radius: 10px;
  width: 100%;
}
</style>
