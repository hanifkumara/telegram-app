<template>
  <div>
    <h4>Assalamualaikum</h4>
    <input type="text" v-model="salam" @keypress.enter="handleEmit">
    <div class="all-salam" v-for="(data, index) in allSalam" :key="index">
      <h4>{{data}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: ['socket'],
  data () {
    return {
      salam: '',
      allSalam: []
    }
  },
  methods: {
    handleEmit () {
      this.socket.emit('salam', this.salam)
      this.salam = ''
    }
  },
  mounted () {
    this.socket.on('kirimKembali', data => {
      console.log('kirim kembali', data)
      this.allSalam.push(data)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
