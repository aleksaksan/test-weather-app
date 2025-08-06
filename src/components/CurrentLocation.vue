<script setup lang="ts">
import { useGeolocation } from '@/hooks/useGeolocation'
import { watch, defineEmits } from 'vue'

const { latitude, longitude, error, city, loading } = useGeolocation()
const emit = defineEmits(['location-changed'])
watch([latitude, longitude], ([lat, lon]) => {
  if (lat && lon) {
    emit('location-changed', lat, lon)
  }
})
</script>

<template>
  <div v-if="loading" class="small-text">Gettings your location...</div>
  <div v-else class="small-text">
    <div v-if="error" class="small-text">
      {{ error }}
    </div>

    <div v-else-if="latitude && longitude">
      <div>Your place: {{ city }}</div>
      <p>latitude: {{ latitude }}</p>
      <p>longitude: {{ longitude }}</p>
    </div>
  </div>
</template>

<style scoped>
.small-text {
  font-size: xx-small;
}
</style>
