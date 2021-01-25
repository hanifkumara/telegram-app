<template>
  <div>
    <h4>Forgot Password</h4>
    <label for="email">Email</label>
    <input type="text" class="form-control" v-model="email" placeholder="Please enter your email" id="email">
    <p class="text-danger" v-if="email.length >=1 && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)">Format email invalid</p>
    <div class="btn btn-primary mt-2" @click="handleConfirm">confirm</div>
  </div>
</template>

<script>
import showPass from '../../mixins/showPassword'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'ForgotPassword',
  mixins: [showPass],
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['forgotPassword']),
    handleConfirm () {
      if (!this.email) {
        Swal.fire('Fill required', 'please check again', 'error')
        return
      }
      if (!this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        Swal.fire('Email Invalid', 'please check again', 'error')
      } else {
        this.forgotPassword({ email: this.email })
      }
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
