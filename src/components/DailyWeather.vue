<script setup lang="ts">
import { useDailyWeather } from '@/hooks/useDailyWeather'
import { toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { dailyWeatherData, error } = useDailyWeather(latitude, longitude)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div>{{ dailyWeatherData }}</div>
  <!-- <ul v-else>
    <li v-for="weather in filteredHourlyData" :key="weather.time">
      <div>{{ weather.formattedTime }}</div>
      <component :is="getWeatherIcon(weather?.weatherCode)" />
      <div>{{ weather.temp }}°C</div>
    </li>
  </ul> -->
</template>

<style></style>
