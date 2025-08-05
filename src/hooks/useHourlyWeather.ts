import { URL_WEATHER } from '@/shared/consts'
import { type IHourlyWeatherResponse } from '@/types/IHourlyWeatherResponse'
import { ref, watch, type Ref } from 'vue'

export function useHourlyWeather(lat: Ref<number | null>, lon: Ref<number | null>) {
  const error = ref<string | null>(null)
  const hourlyData = ref<IHourlyWeatherResponse | null>(null)
  const loading = ref<boolean>(true)

  const getHourlyWeather = async () => {
    if (!lat.value || !lon.value) {
      error.value = "Can't get your coordinates!"
      loading.value = false
      return
    }

    try {
      const hourlyParams = ['temperature_2m', 'weather_code']
      const params = {
        latitude: lat.value.toString(),
        longitude: lon.value.toString(),
        timezone: 'auto',
        hourly: hourlyParams.join(','),
        forecast_days: '2',
      }
      const urlSearchParams = new URLSearchParams(params)

      const res = await fetch(`${URL_WEATHER}?${urlSearchParams}`)

      const resData = await res.json()
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
  }
}
