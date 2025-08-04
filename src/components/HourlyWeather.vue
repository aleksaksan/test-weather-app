<script setup lang="ts">
import { useHourlyWeather } from '@/hooks/useHourlyWeather'
import { getWeatherIcon } from '@/shared/helpers/getWeatherIcon'
import { weatherCodeMap } from '@/shared/mockData/weatherCode'
import { toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { data, error } = useHourlyWeather(latitude, longitude)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <div>
      <div>{{ data?.hourly }}</div>
      <!-- <div>
        {{
          curData?.current.weather_code !== undefined
            ? weatherCodeMap[curData.current.weather_code]
            : 'unknown weather'
        }}
      </div> -->
      <!-- <component :is="getWeatherIcon(curData?.current.weather_code)" /> -->
    </div>
  </div>
</template>

<style></style>
