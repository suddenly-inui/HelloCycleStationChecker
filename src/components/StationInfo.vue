<template>
  <div class="station-card" v-if="station">
    <h1>{{ station?.name }}</h1>
    <p>address: {{ station?.address }}</p>

    <p>num parkable: {{ station ?station['vehicle_type_capacity.num_bikes_parkable'] :undefined }}</p>
    <p>num rentalable: {{ station ?station['vehicle_type_capacity.num_bikes_rentalable'] :undefined }}</p>
    <button @click="fav">お気に入り</button>
  </div>
</template>

<script setup lang="ts">
import type { Station } from '../types/response'
import { ref, watch, toRef, onMounted } from 'vue'
import { fav_station } from '@/services/LocalStorage'

import StationsApiService from '@/services/StationsApiService'

const props = defineProps({
  station_name: {
    type: String,
    required: true
  }
})

let station = ref<Station | null>(null)

onMounted(async () => {  
  if (props.station_name) {
    const response = await StationsApiService.get(props.station_name)
    station.value = response.data.station[0] as Station | null
  }
})

const fav = () => {
  if (!fav_station.value.includes(props.station_name)) {
    fav_station.value.push(props.station_name)
  }
}
</script>

<style scoped>
.station-card{
  flex-basis: 30%;
  padding: 10px;
  margin: calc(10%/6);
  border: 1px solid black;
}
</style>