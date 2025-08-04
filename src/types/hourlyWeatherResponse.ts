export interface HourlyWeatherResponse {
  hourly: Hourly
  hourly_units: HourlyUnits
}

interface Hourly {
  temperature_2m: number[]
  time: string[]
  weather_code: number[]
}

interface HourlyUnits {
  temperature_2m: string
}
