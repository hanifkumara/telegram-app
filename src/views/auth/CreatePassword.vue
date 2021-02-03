<template>
  <div>
    <h4>Forgot Password</h4>
    <label for="show">New Password</label>
    <div class="wrapper-new-password">
      <input type="password" class="form-control" v-model="newPassword" placeholder="input new password" id="show">
      <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye" @click="showPassword">
    </div>
    <p class="text-danger" v-if="newPassword.length > 1 & newPassword.length <= 7">Pasword must be more than 7 characters</p>
    <label for="show2">Confirm New Password</label>
    <div class="wrapper-confirm-password">
      <input type="password" class="form-control" v-model="confirmPassword" placeholder="repeat new password" id="show2">
      <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye" @click="showPassword2">
    </div>
    <p class="text-danger" v-if="confirmPassword.length > 1 & confirmPassword.length <= 7">Pasword must be more than 7 characters</p>
    <button class="btn btn-primary mt-2 d-flex" :disabled="loading" @click="handleConfirm">
      confirm
      <template v-if="loading" class="ml-3">. . . .
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(50 50)"><g><animateTransform attributeName="transform" type="rotate" values="0;45" keyTimes="0;1" dur="0.3759398496240602s" repeatCount="indefinite"></animateTransform><path d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" fill="#1d3f72"></path></g></g></svg>
      </template>
    </button>
  </div>
</template>

<script>
import showPass from '../../mixins/showPassword'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'CreatePassword',
  mixins: [showPass],
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      errorNotSame: false,
      loading: false
    }
  },
  methods: {
    async handleConfirm () {
      if (!this.newPassword || !this.confirmPassword) {
        Swal.fire('Fill required', 'please check again', 'error')
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        Swal.fire('Password not same', 'please check again', 'error')
        return
      }
      if (this.newPassword.length <= 7) {
        Swal.fire('Pasword must be more than 7 characters', 'please check again', 'error')
        return
      }
      if (this.confirmPassword.length <= 7) {
        Swal.fire('Pasword must be more than 7 characters', 'please check again', 'error')
      } else {
        this.loading = true
        try {
          const token = this.$route.params.token
          const apiUrl = `${process.env.VUE_APP_SERVICE_API}`
          const authAxios = axios.create({
            baseURL: apiUrl,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const result = await authAxios.patch('/auth/reset-password', { password: this.newPassword })
          console.log(result)
          this.loading = false
          Swal.fire('Success', 'Lets go login now', 'success')
          this.$router.push('/auth/login')
        } catch (error) {
          this.loading = false
          console.log(error.response)
        }
      }
      console.log('hello')
    }
  }
}
</script>

<style scoped>
.wrapper-new-password, .wrapper-confirm-password {
  width: 100%;
  position: relative
}
.wrapper-new-password > img, .wrapper-confirm-password > img {
  position: absolute;
  right: 5px;
  top: 8px;
}
</style>
