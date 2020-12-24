<template>
  <div>
    <h3 class="title">Login</h3>
    <p style="font-size: 15px; margin: 20px 0; font-weight: 700;">Hi, Welcome back!</p>
    <form @submit.prevent="handleLogin">
      <div class="email">
        <label for="email">Email</label>
        <input type="text" placeholder="Enter your Email" id="email" v-model="email" autocomplete="off">
      </div>
      <div class="password">
        <label for="show">Password</label>
        <input type="password" placeholder="Input your password" v-model="password" autocomplete="off" id="show">
        <div class="icon-eye" @click="showPassword">
          <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye">
        </div>
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
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then((res) => {
          console.log(res)
          this.$router.push({ name: 'ChatList' })
        })
        .catch((err) => {
          console.log(err)
        })
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
  position: relative;
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
</style>
