<template>
  <div>
    <div class="top-menu">
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
      </div>
    </div>
    <div class="content-chat">
    </div>
    <div class="bottom-chat">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoom',
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
