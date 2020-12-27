<template>
  <div>
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-8">
          <form @submit.prevent="handleLogin">
            <label for="">Room</label>
            <select class="custom-select" v-model="room">
              <option value="golang">Golang</option>
              <option value="javascript">Javirascript</option>
              <option value="php">PHP</option>
            </select>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Username</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" v-model="username" placeholder="Username">
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginDev',
  data () {
    return {
      username: '',
      room: ''
    }
  },
  methods: {
    handleLogin () {
      this.$router.push({ name: 'Room', query: { username: this.username, room: this.room } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
