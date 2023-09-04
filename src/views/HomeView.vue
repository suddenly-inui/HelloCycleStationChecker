<template>
  <div class="search">
    <div class="search_title">
      <img class="search_image" src="../assets/cookie.png" alt="">
      <div class="search_title_name_container">
        <h1 class="search_title_name">ステーション検索</h1>
      </div>
      <img class="search_image" src="../assets/cigar.png" alt="">
    </div>
    <input class="search_bar" type="text" v-model="station_name" placeholder="ステーション名で検索" v-on:keydown.enter="search" />
  </div>
  <StationCardContainer>
    <StationInfo :station_name="name" v-for="name in station_name_list" :key="name">{{ name }}</StationInfo>
  </StationCardContainer>
</template>

<script setup lang="ts">
import StationsApiService from '@/services/StationsApiService'
import StationInfo from '@/components/StationInfo.vue'
import { onMounted, ref } from 'vue'
import StationCardContainer from '@/components/StationCardContainer.vue'

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
    station_name_list.value = []
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

<style scoped>
.search{
  margin: 0 auto;
  margin-top: calc(50vh - 250px);
  width: 50%;
  margin-bottom: 50px;
}

.search_title{
  display: flex;
}

.search_image{
  width: 20%;
  height: 20%;
  user-select: none;
}

.search_title_name_container{
  flex-grow: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search_title_name{
  font-size: 3em;
  user-select: none;
}

.search_bar{
  display: block;
  border: 3px solid #e1e1e1;
  border-radius: 30px;
  box-shadow: 0 1px 6px 0 #20212447;
  background-color: #F1F1F1;
  height: 70px;
  font-size: 1.7em;
  width: 100%;
  color: #111;
  padding-left: 15px;
}

@media (max-width: 1400px) {
  .search{
    margin-top: calc(50vh - 300px);
  }
  .search_title_name{
    font-size: 2em;
  }

  .search_bar{
    height: 50px;
    font-size: 1em;
  }
}

@media (max-width: 1000px) {
  .search{
    width: 80%;
    margin-top: calc(50vh - 150px);
  }
  .search_title_name{
    font-size: 2em;
  }

  .search_bar{
    height: 35px;
    font-size: 0.7em;
  }
}

@media (max-width: 700px) {
  .search{
    width: 80%;
    margin-top: calc(50vh - 150px);
  }
}

</style>
