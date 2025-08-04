import { URL_WEATHER } from '@/shared/consts'
import type { ICurrentWeatherResponse } from '@/types/ICurrentWeatherResponse'
import { ref, watch, type Ref } from 'vue'

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
      const params = {
        latitude: lat.value.toString(),
        longitude: lon.value.toString(),
        timezone: 'auto',
        current: currentParams.join(','),
      }
      const urlSearchParams = new URLSearchParams(params)

      const res = await fetch(`${URL_WEATHER}?${urlSearchParams}`)

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
