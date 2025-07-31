import { ref, onMounted } from 'vue'

export const useGeolocation = () => {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  const error = ref<string | null>(null)

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

  onMounted(() => {
    getLocation()
  })
  return {
    latitude,
    longitude,
    error,
  }
}
