<template>
  <div class="station-card" v-if="station">
    <h1>{{ station?.name }}<span :class="{'hide_icon': !isFav}" >⭐️</span></h1>
    <p>address: {{ station?.address }}</p>

    <p>num parkable: {{ station ?station['vehicle_type_capacity.num_bikes_parkable'] :undefined }}</p>
    <p>num rentalable: {{ station ?station['vehicle_type_capacity.num_bikes_rentalable'] :undefined }}</p>
    <button @click="fav">お気に入り</button>
    <button @click="delete_fav" :class="{'hide_icon': !isFav}">お気に入り削除</button>
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
let isFav = ref<boolean>(false)

onMounted(async () => {    
  //ステーション名が空でないなら、apiを叩く
  if (props.station_name) {
    const response = await StationsApiService.get(props.station_name)
    station.value = response.data.station[0] as Station | null
  }

  //ステーションがお気に入りかどうかを取得
  fav_station.value.forEach((elem) => {
    if (elem === props.station_name) {
      isFav.value = true
    }
  })
})

const fav = () => {
  if (!fav_station.value.includes(props.station_name)) {
    fav_station.value.push(props.station_name)
    console.log(props.station_name);
    
  }
}

const delete_fav = () => {
  fav_station.value.forEach( (elem, idx) => {
    if (elem === props.station_name) {
      fav_station.value.splice(idx, 1)
      return
    }
  })
}
</script>

<style scoped>
.hide_icon{
  display: none;
}
.station-card{
  flex-basis: 30%;
  padding: 10px;
  margin: calc(10%/6);
  border: 2px solid #000;
  border-radius: 15px;
}
</style>