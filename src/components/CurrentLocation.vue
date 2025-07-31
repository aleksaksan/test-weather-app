<script setup lang="ts">
import { useGeolocation } from '@/composables/useGeolocation'

const { latitude, longitude, error } = useGeolocation()
</script>

<template>
  <div class="geolocation-wrapper">
    <div v-if="error" class="status error">
      {{ error }}
    </div>

    <div v-else-if="latitude && longitude" class="result">
      <h3>Ваши координаты:</h3>
      <p>Широта: {{ latitude.toFixed(6) }}</p>
      <p>Долгота: {{ longitude.toFixed(6) }}</p>
    </div>
  </div>
</template>

<style scoped>
.geolocation-wrapper {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
}
.loading {
  color: #666;
}
.error {
  color: #d32f2f;
}
.result {
  color: #2e7d32;
}
</style>
