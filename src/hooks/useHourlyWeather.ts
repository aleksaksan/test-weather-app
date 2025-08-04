import { type HourlyWeatherResponse } from '@/types/hourlyWeatherResponse'
import { ref, watch, type Ref } from 'vue'

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export function useHourlyWeather(lat: Ref<number | null>, lon: Ref<number | null>) {
  const error = ref<string | null>(null)
  const hourlyData = ref<HourlyWeatherResponse | null>(null)
  const loading = ref<boolean>(true)

  const getHourlyWeather = async () => {
    if (!lat.value || !lon.value) {
      error.value = "Can't get your coordinates!"
      loading.value = false
      return
    }

    try {
      const hourlyParams = ['temperature_2m', 'weather_code']
      const params = hourlyParams.join(',')
      const res = await fetch(
        `${WEATHER_URL}?latitude=${lat.value}&longitude=${lon.value}&timezone=auto&hourly=${params}&forecast_days=2`,
      )

      const resData = await res.json()
      console.log(resData)
      hourlyData.value = resData
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  watch(
    [lat, lon],
    ([newLat, newLon]) => {
      if (newLat && newLon) getHourlyWeather()
    },
    { immediate: true },
  )

  return {
    error,
    hourlyData,
    loading,
  }
}
