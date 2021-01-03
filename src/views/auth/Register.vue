<template>
  <div>
    <div class="title d-flex justify-content-between align-items-center">
      <img src="@/assets/img/back.png" alt="back-icon" style="cursor: pointer" @click="toLogin">
      <h3 style="color: #7E98DF;">Register</h3>
    </div>
    <p style="margin: 20px 0">Let’s create your account!</p>
    <form @submit.prevent="handleSignup">
      <div class="name">
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name" placeholder="Enter your Name" autocomplete="off">
        <p class="text-danger" v-if="name.length >= 1 && name.length <= 7">length name must be more than 7 char</p>
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" placeholder="Enter your Email" autocomplete="off">
          <p class="text-danger" v-if="email.length >=1 && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)">Format email invalid</p>
      </div>
      <div class="password">
        <label for="show">Password</label>
        <div class="form-input">
          <input type="password" v-model="password" id="show" placeholder="Enter your Password" autocomplete="off">
          <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye" @click="showPassword" style="cursor: pointer;">
        </div>
        <p class="text-danger" v-if="password.length >= 1 && password.length <= 5">length password must be more than 5 char</p>
      </div>
      <button class="btn">Register</button>
      <div class="register-with d-flex justify-content-between align-items-center">
        <div class="line"></div>
        <p style="color: #848484;">Register With</p>
        <div class="line"></div>
      </div>
      <button class="btn google d-flex justify-content-center align-items-center">
        <div class="icon-google">
          <img src="@/assets/img/bx_bxl-google.png" alt="icon-google">
        </div>
        Google
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import showPass from '../../mixins/showPassword'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  mixins: [showPass],
  methods: {
    ...mapActions(['signup']),
    handleSignup () {
      if (!this.name) {
        Swal.fire(
          'Fill name required!',
          '',
          'error'
        )
        return
      }
      if (this.name.length <= 7) {
        Swal.fire(
          'length name must be more than 7 char',
          '',
          'error'
        )
        return
      }
      if (!this.email) {
        Swal.fire(
          'Fill email required!',
          '',
          'error'
        )
        return
      }
      if (!this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        Swal.fire(
          'Format email invalid',
          '',
          'error'
        )
        return
      }
      if (!this.password) {
        Swal.fire(
          'Fill password required!',
          '',
          'error'
        )
        return
      }
      if (this.name.length <= 5) {
        Swal.fire(
          'length password must be more than 5 char',
          '',
          'error'
        )
      } else {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.signup(payload)
          .then((result) => {
            console.log(result)
          })
          .catch((err) => {
            Swal.fire(
              err.message,
              '',
              'error'
            )
            console.log(err)
          })
      }
    },
    toLogin () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.title{
  width: 65%;
}
form input{
  width: 100%;
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid black;
  color: black;
}
form label {
  color: #848484;
}
form input:focus{
  outline: none;
}
.email{
  margin: 20px 0;
}
.form-input{
  width: 100%;
  position: relative;
}
.form-input > img {
  position: absolute;
  right: 5px;
  bottom: 8px;
}
button {
  width: 100%;
  background: #7E98DF;
  border-radius: 70px;
  padding: 10px 0;
  margin: 20px 0;
  color: white;
}
button:hover{
  color: white
}
.line{
  width: 30%;
  height: 1px;
  background-color: #848484;
}
.btn.google{
  background: #FFFFFF;
  border: 1px solid #7E98DF;
  box-sizing: border-box;
  border-radius: 70px;
  width: 100%;
  padding: 10px 0;
  color: #7E98DF;
}
.icon-google{
  margin-right: 8px;
}
</style>
