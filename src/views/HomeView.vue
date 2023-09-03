<template>
  <h1>ステーション名を検索</h1>
  <input type="text" v-model="station_name" />
  <button @click="search">検索</button>
  <StationInfo :station_name="name" v-for="name in station_name_list" :key="name">{{ name }}</StationInfo>
</template>

<script setup lang="ts">
import StationsApiService from '@/services/StationsApiService'
import StationInfo from '@/components/StationInfo.vue'
import { onMounted, ref } from 'vue'
import type { Stations } from '../types/response'

let stations = ref()
let station_name = ref('')
let station_name_list = ref<string[]>([])

onMounted(() => {  
  StationsApiService.getAll().then((data) => {
    stations.value = data.data!.stations
  })
})

const search = async () => {  
  if (station_name.value.trim() === "") {
    return
  }
  station_name_list.value = []
  for (let key in stations.value) {    
    if (key.includes(station_name.value.trim())) {
      station_name_list.value.push(key)
    }
  }
}
</script>

<style></style>
