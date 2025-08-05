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
  <div v-else class="container">
    <ul class="list">
      <li v-for="weather in filteredHourlyData" :key="weather.time" class="item">
        <div>{{ weather.formattedTime }}</div>
        <component :is="getWeatherIcon(weather?.weatherCode)" />
        <div>{{ weather.temp }}°C</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: max-content;
  margin: 0 auto;
}

.list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
  padding: 1rem;
}

.item {
  flex: 0 0 auto;
  text-align: center;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
  width: 300px;
}

@media (max-width: 800px) {
  .container {
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
  .list {
    width: max-content;
  }
  .item {
    scroll-snap-align: start;
  }
}
</style>
