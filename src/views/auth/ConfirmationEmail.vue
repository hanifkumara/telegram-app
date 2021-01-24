<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ConfirmationEmail',
  mounted () {
    axios.get(`${process.env.VUE_APP_SERVICE_API}/auth/confirmation/${this.$route.params.token}`)
      .then((res) => {
        console.log(res)
        Swal.fire(res.data.result.message, 'Wait a moment to go to login', 'success')
        setTimeout(() => {
          this.$router.push({ name: 'Login' })
        }, 3000)
      })
      .catch(err => {
        console.log(err.response)
        Swal.fire(err.response.data.result.message, '', 'error')
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
