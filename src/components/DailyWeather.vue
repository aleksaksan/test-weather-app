<script setup lang="ts">
import { useDailyWeather } from '@/hooks/useDailyWeather'
import { getWeatherIcon } from '@/shared/helpers/getWeatherIcon'
import { computed, toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { dailyWeatherData, error } = useDailyWeather(latitude, longitude)

const dataToDisplay = computed(() => {
  if (!dailyWeatherData) {
    return
  }

  return dailyWeatherData.value?.daily.time.map((time, index) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(time)
    const day = date.getDate().toString().padStart(2, '0')
    const mounth = date.getDate().toString().padStart(2, '0')
    return {
      date: `${day}.${mounth}`,
      weekDay: weekDays[date.getDay()],
      weatherCode: dailyWeatherData.value?.daily.weather_code[index],
      temperature_2m_max: dailyWeatherData.value?.daily.temperature_2m_max[index],
      temperature_2m_min: dailyWeatherData.value?.daily.temperature_2m_min[index],
      temperature_2m_mean: dailyWeatherData.value?.daily.temperature_2m_mean[index],
    }
  })
})
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <ul v-else class="list">
    <li v-for="weather in dataToDisplay" :key="weather.date" class="list-item">
      <div>{{ weather.weekDay }}</div>
      <div>{{ weather.date }}</div>
      <component :is="getWeatherIcon(weather?.weatherCode)" />
      <div>{{ weather.temperature_2m_max }}°</div>
      <div>{{ weather.temperature_2m_min }}°</div>
      <div>{{ weather.temperature_2m_mean }}°</div>
    </li>
  </ul>
</template>

<style scoped>
.list {
  width: max-content;
}

.list-item {
  display: grid;
  grid-template-columns: 100px repeat(4, minmax(80px, 1fr)) 40px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0.25rem 0;
}

.list-item + .list-item {
  border-top: rgba(255, 255, 255, 0.2) solid 1px;
}
</style>
