<script setup lang="ts">
import { useHourlyWeather } from '@/hooks/useHourlyWeather'
import { getWeatherIcon } from '@/shared/helpers/getWeatherIcon'
import { computed, toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { hourlyData, error } = useHourlyWeather(latitude, longitude)

const formatTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const filteredHourlyData = computed(() => {
  if (!hourlyData) return []
  const currentTime = new Date()
  currentTime.setHours(currentTime.getHours() - 1)
  const endTime = new Date(currentTime)
  endTime.setHours(currentTime.getHours() + 24)

  const filtredData = hourlyData.value?.hourly.time
    .map((time, index) => ({
      time,
      formattedTime: formatTime(time),
      weatherCode: hourlyData.value?.hourly.weather_code[index],
      temp: hourlyData?.value?.hourly.temperature_2m[index],
    }))
    .filter(({ time }) => {
      const hourTime = new Date(time)
      return hourTime >= currentTime && hourTime <= endTime
    })
  return filtredData
})
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <ul v-else>
    <li v-for="weather in filteredHourlyData" :key="weather.time">
      <div>{{ weather.formattedTime }}</div>
      <component :is="getWeatherIcon(weather?.weatherCode)" />
      <div>{{ weather.temp }}°C</div>
    </li>
  </ul>
</template>

<style></style>
