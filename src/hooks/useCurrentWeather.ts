import type { ICurrentWeatherResponse } from '@/types/ICurrentWeatherResponse'
import { ref, watch, type Ref } from 'vue'

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export function useCurrentWeather(lat: Ref<number | null>, lon: Ref<number | null>) {
  const error = ref<string | null>(null)
  const curData = ref<ICurrentWeatherResponse | null>(null)
  const loading = ref<boolean>(true)

  const getCurrentWeather = async () => {
    if (!lat.value || !lon.value) {
      error.value = "Can't get your coordinates!"
      loading.value = false
      return
    }

    try {
      const currentParams = ['temperature_2m', 'weather_code', 'apparent_temperature']
      const params = currentParams.join(',')
      const res = await fetch(
        `${WEATHER_URL}?latitude=${lat.value}&longitude=${lon.value}&timezone=auto&current=${params}`,
      )

      const data = await res.json()
      console.log(data)
      curData.value = data
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

  watch([lat, lon], getCurrentWeather)

  return {
    error,
    curData,
    loading,
  }
}
