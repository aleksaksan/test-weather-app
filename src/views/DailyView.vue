<script setup lang="ts">
import DailyWeather from '@/components/DailyWeather.vue'
import { inject, type Ref } from 'vue'

const latitude = inject<Ref<number | null> | null>('latitude', null)
const longitude = inject<Ref<number | null> | null>('longitude', null)
</script>

<template>
  <DailyWeather :latitude="latitude" :longitude="longitude" />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
