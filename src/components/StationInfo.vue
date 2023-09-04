<template>
  <div class="station-card" v-if="station">
    <div class="station_desc">
      <a class="station_name" target="_blank" :href="station_url">{{
        station?.name
      }}</a>
      <span :class="{ hide_icon: isFav }" class="fav_icon" @click="fav">☆</span>
      <span :class="{ hide_icon: !isFav }" class="fav_icon" @click="delete_fav">⭐️</span>
      <p>{{ station?.address }}</p>
    </div>
    <div class="station_info">
      <div class="station_state_item" :class="{ empty: rental_isEmpty }">
        <p class="station_info_title">レンタル可能</p>
        <p class="num">
          {{ station ? station['vehicle_type_capacity.num_bikes_rentalable'] : undefined }}
        </p>
      </div>
      <div class="station_state_item" :class="{ empty: park_isEmpty }">
        <p class="station_info_title">駐車可能</p>
        <p class="num">
          {{ station ? station['vehicle_type_capacity.num_bikes_parkable'] : undefined }}
        </p>
      </div>
    </div>
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
let rental_isEmpty = ref<boolean>(false)
let park_isEmpty = ref<boolean>(false)
let os = ref("")

const card_isFav = () => {
  isFav.value = false
  fav_station.value.forEach((elem) => {
    if (elem === props.station_name) {
      isFav.value = true
      return
    }
  })
}

const station_url = () => {
  if (os.value === "iOS") {
    return station.value?.['rental_uris.ios']
  } else if (os.value === "Android") {
    return station.value?.['rental_uris.android']
  } else {
    return station.value?.['rental_uris.web']
  }
}

onMounted(async () => {
  //ステーション名が空でないなら、apiを叩く
  if (props.station_name) {
    const response = await StationsApiService.get(props.station_name)
    station.value = response.data.station[0] as Station | null
  }

  //ステーションがお気に入りかどうかを取得
  card_isFav()

  //ステーションの駐車状況を反映
  if (!station.value?.['vehicle_type_capacity.num_bikes_rentalable']) {
    rental_isEmpty.value = true
  }
  if (!station.value?.['vehicle_type_capacity.num_bikes_parkable']) {
    park_isEmpty.value = true
  }

  const userAgent = navigator.userAgent
  if (userAgent.match(/iPhone|iPad|iPod/)) {
    os.value = 'iOS'
  } else if (userAgent.match(/Android/)) {
    os.value = 'Android'
  } else {
    os.value = 'web'
  }
})

const fav = () => {
  if (!fav_station.value.includes(props.station_name)) {
    fav_station.value.push(props.station_name)
    console.log(props.station_name)
  }
  card_isFav()
}

const delete_fav = () => {
  fav_station.value.forEach((elem, idx) => {
    if (elem === props.station_name) {
      fav_station.value.splice(idx, 1)
      return
    }
  })
  card_isFav()
}
</script>

<style scoped>
.hide_icon {
  display: none;
}

.empty {
  background-color: rgba(255, 0, 0, 0.5);
}

.fav_icon {
  user-select: none;
  font-size: 30px;
}

.fav_icon:hover {
  cursor: pointer;
}
.station-card {
  flex-basis: 30%;
  padding: 10px;
  margin: calc(10% / 6);
  border: 1.5px solid #000;
  border-radius: 15px;
  aspect-ratio: 12/6;

  display: flex;
  flex-direction: column;
}

.station_desc {
  flex-basis: 50%;
}

.station_name {
  font-size: 30px;
}

.station_name:hover {
  color: rgba(0, 0, 0, 0.5);
}

.station_info {
  margin-top: 10px;
  flex-basis: 50%;
  display: flex;
  gap: 15px;
}

.station_state_item {
  width: 50%;
  margin: auto;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
}

.station_info_title {
  font-weight: bold;
}

.num {
  font-weight: bold;
  font-size: 3em;
}

.fav_buttons_item {
  width: 50%;
  aspect-ratio: 1/1;
  margin: auto;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
}

@media (max-width: 1400px) {
  .station-card {
    flex-basis: 45%;
  }
}

@media (max-width: 1000px) {
  .station-card {
    flex-basis: 100%;
    aspect-ratio: 12/3;
  }
}
</style>
