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
    <div class="btn btn-primary mt-2" @click="handleConfirm">confirm</div>
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
      errorNotSame: false
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
          Swal.fire('Success', 'Lets go login now', 'success')
          this.$router.push('/auth/login')
        } catch (error) {
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
