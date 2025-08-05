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
  <div v-if="loading">Gettings your location...</div>
  <div v-else class="geolocation-wrapper">
    <div v-if="error" class="status error">
      {{ error }}
    </div>

    <div v-else-if="latitude && longitude" class="result">
      <h3>Ваши координаты:</h3>
      <p>Широта: {{ latitude }}</p>
      <p>Долгота: {{ longitude }}</p>
    </div>

    <div>
      <h3>Ваш город: {{ city }}</h3>
    </div>
  </div>
</template>

<style scoped></style>
