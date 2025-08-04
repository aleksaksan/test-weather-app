export interface ICurrentWeatherResponse {
  current: ICurrentData
  current_units: ICurrentUnits
}

interface ICurrentData {
  temperature_2m: number
  apparent_temperature: number
  weather_code: number
}

interface ICurrentUnits {
  apparent_temperature: string
  temperature_2m: string
}
