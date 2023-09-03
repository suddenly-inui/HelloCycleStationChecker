<template>
  <h1>ステーション名を検索</h1>
  <input type="text" v-model="station_name" />
  <StationInfo :station_name="station_name"></StationInfo>
</template>

<script setup lang="ts">
import StationsApiService from '@/services/StationsApiService'
import StationInfo from '@/components/StationInfo.vue'
import { ref, watch } from 'vue'
import type { StationResponse, Station } from '../types/response'


let stations = ref<StationResponse>()
let station_name = ref('')

StationsApiService.getAll().then((data) => {
  stations.value = data
})


let station = ref<Station|null>(null)
watch(station_name, async (val) => {
  if (val) {
    const response = await StationsApiService.get(val)
    station.value = response.data.station[0] as Station | null
  }
})
</script>

<style></style>
