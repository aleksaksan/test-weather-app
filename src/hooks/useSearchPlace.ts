import { URL_GET_CITY_LIST } from '@/shared/consts'
import { type ISearchPlace, type ISearchPlaceResponse } from '@/types/ISearchPlaceResponse'
import { ref } from 'vue'

export const useSearchPlace = () => {
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const cityList = ref<ISearchPlace[]>([])

  const getCityList = async (cityName: string) => {
    if (!cityName.trim()) {
      cityList.value = []
      return
    }

    loading.value = true
    error.value = null
    try {
      const params = {
        name: cityName,
      }
      const urlSearchParams = new URLSearchParams(params)

      const res = await fetch(`${URL_GET_CITY_LIST}?${urlSearchParams}`)

      const data: ISearchPlaceResponse = await res.json()
      cityList.value = data.results
      console.log(cityList.value)
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

  return {
    cityList,
    loading,
    error,
    getCityList,
  }
}
