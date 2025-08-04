export interface CurrentWeatherResponse {
  current: CurrentData
  current_units: CurrentUnits
}

interface CurrentData {
  temperature_2m: number
  apparent_temperature: number
  weather_code: number
}

interface CurrentUnits {
  apparent_temperature: string
  temperature_2m: string
}
