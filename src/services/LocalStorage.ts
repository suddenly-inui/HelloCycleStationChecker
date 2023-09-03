import { useStorage } from '@vueuse/core'

export const fav_station = useStorage<string[]>("fav_station", [])