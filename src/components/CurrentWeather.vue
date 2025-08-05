<script setup lang="ts">
import { useCurrentWeather } from '@/hooks/useCurrentWeather'
import { getWeatherIcon } from '@/shared/helpers/getWeatherIcon'
import { weatherCodeMap } from '@/shared/mockData/weatherCode'
import { toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { curData, error } = useCurrentWeather(latitude, longitude)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <div>
      <div class="big-text">
        {{ curData?.current.temperature_2m }} {{ curData?.current_units.temperature_2m }}
      </div>
      <div>
        {{
          curData?.current.weather_code !== undefined
            ? weatherCodeMap[curData.current.weather_code]
            : 'unknown weather'
        }}
      </div>
      <component :is="getWeatherIcon(curData?.current.weather_code)" class="svg" />
    </div>
    <div>
      Feels like {{ curData?.current.apparent_temperature }}
      {{ curData?.current_units.apparent_temperature }}
    </div>
  </div>
</template>

<style scoped>
.big-text {
  font-size: 3em;
}
.svg {
  width: 4em;
  height: 4em;
}
</style>
