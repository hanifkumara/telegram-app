<template>
  <div>
    <h3 class="title">Login</h3>
    <p style="font-size: 15px; margin: 20px 0; font-weight: 700;">Hi, Welcome back!</p>
    <form @submit.prevent="handleLogin">
      <div class="email">
        <label for="email">Email</label>
        <input type="text" placeholder="Enter your Email" id="email" v-model="email" autocomplete="off">
        <p class="text-danger" v-if="email.length >=1 && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)">Format email invalid</p>
      </div>
      <div class="password">
        <label for="show">Password</label>
        <div class="form-input-password">
          <input type="password" placeholder="Input your password" v-model="password" autocomplete="off" id="show">
          <div class="icon-eye" @click="showPassword">
            <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye">
          </div>
        </div>
        <p class="text-danger" v-if="password.length >= 1 && password.length <= 5">length password must be more than 5 char</p>
      </div>
    <h5 class="forgot-password">Forgot password?</h5>
    <button class="btn login">Login</button>
    </form>
    <div class="login-with d-flex justify-content-between align-items-center">
      <div class="line"></div>
      <p style="color: #848484;">Login With</p>
      <div class="line"></div>
    </div>
    <button class="btn google d-flex justify-content-center align-items-center">
      <div class="icon-google">
        <img src="@/assets/img/bx_bxl-google.png" alt="icon-google">
      </div>
      Google
    </button>
    <h6 class="signup">Don’t have an account? <span style="color: #7E98DF; margin-left: 5px; cursor: pointer;" @click="toSignup">Sign Up</span></h6>
  </div>
</template>

<script>
import showPass from '../../mixins/showPassword'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  mixins: [showPass],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLogin () {
      if (!this.email) {
        Swal.fire(
          'Fill email required',
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
          'Fill password required',
          '',
          'error'
        )
        return
      }
      if (this.password.length <= 5) {
        Swal.fire(
          'length password must be more than 5 char',
          '',
          'error'
        )
      } else {
        const payload = {
          email: this.email,
          password: this.password
        }
        this.login(payload)
          .then((res) => {
            Swal.fire(
              'Login Success!!',
              '',
              'success'
            )
            this.$router.push({ name: 'ChatList' })
          })
          .catch((err) => {
            let message = ''
            if (err === 'Email Unlisted!!') {
              message = err
            } else {
              message = err
            }
            console.log(err)
            Swal.fire(
              `${message}`,
              '',
              'error'
            )
          })
      }
    },
    toSignup () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style scoped>
.title{
  color: #7E98DF;
  text-align: center;
}
.login{
  background: #7E98DF;
  border-radius: 20px;
  padding: 10px 0;
  width: 100%;
  color: white;
}
.login:hover{
  color: white;
}
.email, .pasword{
  display: flex;
  flex-direction: column;
}
form input{
  width: 100%;
  padding: 10px 0;
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
.password{
  margin-top: 20px;
}
.icon-eye{
  position: absolute;
  right: 5px;
  bottom: 8px;
  cursor: pointer;
}
.icon-eye:hover{
  transform: scale(1.04)
}
.forgot-password{
  display: flex;
  justify-content: flex-end;
  color: #7E98DF;
  margin: 20px 0;
  font-size: 15px;
}
.login-with{
  margin: 20px 0;
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
}
.icon-google{
  margin-right: 8px;
}
.btn:hover{
  transform: scale(1.03)
}
.signup{
  margin: 20px 0;
  font-size: 15px;
  display: flex;
  justify-content: center;
}
.form-input-password{
  position: relative
}
</style>
