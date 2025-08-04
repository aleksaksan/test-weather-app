export interface IDailyWeatherResponse {
  daily: IDaily
  daily_units: IUnits
}

interface IDaily {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  temperature_2m_mean: number[]
  time: string[]
}

interface IUnits {
  daily_units: string
}
