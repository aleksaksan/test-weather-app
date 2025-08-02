import { ref, onMounted, watch } from 'vue'

const URL = 'https://nominatim.openstreetmap.org/reverse'

export const useGeolocation = () => {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const city = ref<string | null>(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = 'Browser does not support Geolocation API'
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
      },
      (e) => {
        error.value = `Can't get geolocation: ${e.message}`
        loading.value = false
      },
    )
  }

  const getCity = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`${URL}?lat=${lat}&lon=${lon}&format=json`, {
        headers: {
          'User-Agent': 'MyVueApp/1.0',
        },
      })

      const data = await res.json()
      city.value = data.address.city || 'unknown'
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

  watch([latitude, longitude], ([lat, lon]) => {
    if (lat !== null && lon !== null) {
      getCity(lat, lon)
    }
  })

  onMounted(() => {
    getLocation()
  })

  return {
    latitude,
    longitude,
    city,
    loading,
    error,
  }
}
