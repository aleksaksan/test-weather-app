import { ref } from 'vue'

const URL = 'https://nominatim.openstreetmap.org/reverse'

export const useGeolocation = () => {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const city = ref<string | null>(null)
  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = 'Browser is not supports geolocation API'
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
      },
      (e) => {
        error.value = `Can't get geolocation!: ${e.message}`
      },
    )
  }

  const getCity = async (URL: string, latitude: number, longitude: number) => {
    try {
      getLocation()
      const res = await fetch(`${URL}?lat=${latitude}&lon=${longitude}&format=json`, {
        headers: {
          'User-Agent': 'MyVueApp/1.0',
        },
      })

      const data = await res.json()
      city.value = data.address.city || data.address.town || data.address.village || 'Неизвестно'
    } catch (err) {
      error.value = err.message | 'Something wents wrong'
    } finally {
      loading.value = false
    }
  }

  return {}
}
