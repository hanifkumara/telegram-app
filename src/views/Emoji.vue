<template>
  <div class="mt-5">
    {{message}}
    <input type="text" class="form-control mt-5" v-model="message">
    <button class="btn btn-primary" @click="insertMessage">Send Message</button>
    <button class="btn btn-info" @click="showEmoji = !showEmoji">
      Button Emoji
    </button>
    <img src="@/assets/img/pp.jpg" alt="">
    <h2 v-for="(data, index) in emojinya" :key="index">{{data.data}}</h2>
    <div class="emoji" v-show="showEmoji">
      <VEmojiPicker emojiSize=30 limitFrequently=8 @select="selectEmoji" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Emoji',
  data () {
    return {
      showEmoji: false,
      emojinya: [],
      tokenKu: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YjVjNTA4Zi1iMTAyLTRkZjYtODIwMi1iNTg1NGQxZWZkYzMiLCJlbWFpbCI6Imhhbmlma3VtYXJhQGdtYWlsLmNvbSIsImlhdCI6MTYxMjQzNDEzMSwiZXhwIjoxNjEyNDUyMTMxfQ.csB8TxthaVXNq4viI_rg3K_Y570A-0M8nP6-1dCyYtY',
      idReceiver: 'cd9c1dce-9955-4568-9f41-73e05eebddac',
      message: ''
    }
  },
  methods: {
    selectEmoji (emoji) {
      this.message += emoji.data
    },
    async insertMessage () {
      try {
        const token = this.tokenKu
        const apiUrl = `${process.env.VUE_APP_SERVICE_API}`
        const authAxios = axios.create({
          baseURL: apiUrl,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const result = await authAxios.post('/message/', {
          idReceiver: this.idReceiver,
          message: this.message
        })
        console.log(result)
        this.loading = false
        Swal.fire('Success', 'Lets go login now', 'success')
        // this.$router.push('/auth/login')
      } catch (error) {
        this.loading = false
        console.log(error.response)
      }
    },
    async handleGuide () {
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        width: 800,
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          html: `<img src="https://i.ibb.co/WGY21kW/mergesetting.jpg" alt="mergesetting" border="0" style="width: 100%;">
          <p style="margin-top: 10px; font-size: 13px"><span style="font-weight: 600;">note: </span>please click -> edit -> enter for save changes</p>
          `
        },
        {
          html: '<img src="https://i.ibb.co/XXGZfkj/mergeaddfriend.jpg" alt="mergeaddfriend" border="0" style="width: 100%;">'
        },
        {
          html: '<img src="https://i.ibb.co/xX3s6rH/mergechat.jpg" alt="mergechat" border="0" style="width: 100%">'
        }
      ]).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'All done!',
            text: 'Enjoy the application :)',
            confirmButtonText: 'Lovely!'
          })
        }
      })
    }
  },
  mounted () {
    this.handleGuide()
  }
}
</script>

<style scoped>
img{
  width: 60px;
  height: 60px;
}
</style>
