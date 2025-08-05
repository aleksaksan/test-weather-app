export interface IHourlyWeatherResponse {
  hourly: IHourly
  hourly_units: IHourlyUnits
}

interface IHourly {
  temperature_2m: number[]
  time: string[]
  weather_code: number[]
}

interface IHourlyUnits {
  temperature_2m: string
}
