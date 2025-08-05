export interface ISearchPlaceResponse {
  results: ISearchPlace[]
}

export interface ISearchPlace {
  name: string
  country: string
  latitude: number
  longitude: number
  admin1: string
  admin2?: string
  admin3?: string
  admin4?: string
}
