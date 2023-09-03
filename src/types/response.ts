export interface StationResponse {
  station: Station[]
}

export interface Station {
  lat: number
  lon: number
  name: string
  address: string
  station_id: string
  parking_hoop: boolean
  parking_type: string
  contact_phone: string
  is_charging_station: boolean
  'rental_uris.ios': string
  'rental_uris.web': string
  'rental_uris.android': string
  'vehicle_type_capacity.num_bikes_now': number
  'vehicle_type_capacity.num_bikes_limit': number
  'vehicle_type_capacity.num_bikes_parkable': number
  'vehicle_type_capacity.num_bikes_rentalable': number
}

export interface Stations {
  stations: { [key: string]: string }
}
