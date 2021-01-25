const showPass = {
  methods: {
    showPassword () {
      const password = document.getElementById('show')
      if (password.type === 'password') {
        password.type = 'text'
      } else {
        password.type = 'password'
      }
    },
    showPassword2 () {
      const password = document.getElementById('show2')
      if (password.type === 'password') {
        password.type = 'text'
      } else {
        password.type = 'password'
      }
    }
  }
}

export default showPass
