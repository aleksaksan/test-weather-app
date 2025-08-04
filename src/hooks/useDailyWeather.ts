import type { IDailyWeatherResponse } from '@/types/IDailyWeatherResponse'
import { ref, watch, type Ref } from 'vue'

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export function useDailyWeather(lat: Ref<number | null>, lon: Ref<number | null>) {
  const error = ref<string | null>(null)
  const dailyWeatherData = ref<IDailyWeatherResponse | null>(null)
  const loading = ref<boolean>(true)

  const getDailyWeather = async () => {
    if (!lat.value || !lon.value) {
      error.value = "Can't get your coordinates!"
      loading.value = false
      return
    }

    try {
      const dailyParams = [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'temperature_2m_mean',
      ]
      const params = dailyParams.join(',')
      const res = await fetch(
        `${WEATHER_URL}?latitude=${lat.value}&longitude=${lon.value}&timezone=auto&daily=${params}`,
      )

      const resData = await res.json()
      console.log(resData)
      dailyWeatherData.value = resData
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
      if (newLat && newLon) getDailyWeather()
    },
    { immediate: true },
  )

  return {
    error,
    dailyWeatherData,
    loading,
  }
}
