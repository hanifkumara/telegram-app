<template>
  <div class="content">
    <h4>Map use Leaflet</h4>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
    <l-marker :lat-lng="markerLatLng" ></l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'Map2',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 13,
      center: latLng(0, 0),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerLatLng: [0, 0]
    }
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        // this.location.lat = coordinates.lat
        // this.location.lng = coordinates.lng
        this.center = latLng(coordinates.lat, coordinates.lng)
        this.markerLatLng = [coordinates.lat, coordinates.lng]
        console.log(coordinates)
      })
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
