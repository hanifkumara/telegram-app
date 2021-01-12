<template>
    <button :class="background" class="google d-flex justify-content-center align-items-center">
      <div v-if="icon" class="icon-google">
        <img :src="require(`@/assets/img/${icon}`)" alt="icon-google">
      </div>
      {{title}}
    </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: String,
    background: String,
    icon: String
  }
}
</script>

<style scoped>
button{
  width: 100%;
  border-radius: 20px;
  padding: 10px 0;
  border: none;
}
button:hover{
  transform: scale(1.04)
}
button:focus{
  outline: none;
}
.primary{
  background: #7E98DF;
  color: white;
}
.white{
  background: #FFFFFF;
  color: black;
  border: 1px solid #7E98DF;
}
.icon-google{
  margin-right: 8px;
}
</style>
