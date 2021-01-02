<template>
  <div>
    <div class="top-menu">
      <div class="menu-left">
        <div class="photo-name d-flex">
          <div class="photo-chat">
            <img :src="detailGroup.photo" alt="photo-profile">
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
      </div>
    </div>
    <div class="content-chat">
      <div v-for="data in chatRoom" :key="data.id">
        <h6>{{data.message}}</h6>
      </div>
      <h1>{{chatRoom}}</h1>
    </div>
    <div class="bottom-chat">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ChatRoom',
  props: ['id-room', 'chat-room', 'detail-group', 'short-detail'],
  methods: {
    // ...mapActions(['getDetailGroup'])
  },
  computed: {
    ...mapGetters(['short-detail'])
  },
  mounted () {
    console.log('hai')
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
</style>
