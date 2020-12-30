<template>
  <div class="bg-grey">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center content">
        <div class="col-md-5">
            <div class="card-auth">
              <router-view />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Auth'
}
</script>

<style scoped>
.bg-grey{
  background: #E5E5E5;
}
.content{
  height: 100vh;
}
.card-auth{
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}
</style>
