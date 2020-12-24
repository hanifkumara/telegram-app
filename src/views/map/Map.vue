<template>
  <div>
    <h4 style="text-align: center;">Maps</h4>
    <GmapMap
      :center="{lat:location.lat, lng:location.lng}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        :position="{lat:location.lat, lng:location.lng}"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      }
    }
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
        console.log(coordinates)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
