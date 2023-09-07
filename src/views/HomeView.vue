<template>
  <div class="search">
    <div class="search_title">
      <img class="search_image" src="../assets/cookie.png" alt="">
      <div class="search_title_name_container" @click="search">
        <h1 class="search_title_name">ステーション検索</h1>
      </div>
      <img class="search_image" src="../assets/cigar.png" alt="">
    </div>
    <div class="search_bar">
      <input class="search_input" type="text" v-model="station_name" placeholder="ステーション名で検索" v-on:keydown.enter="search"/>
      <div class="search_button_wrapper" @click="search">
        <img class="search_button" src="../assets/search.png" alt="">
      </div>
    </div>
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
  width: 50%;
  margin-bottom: 50px;
  /* margin-top: calc(50vh - 300px); */
  margin-top: 150px;
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
  border: 3px solid #e1e1e1;
  border-radius: 30px;
  box-shadow: 0 1px 6px 0 #20212447;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.search_input{
  border: none;
  display: block;
  height: 100%;
  width: 90%;
  background-color: rgba(0,0,0,0);
  font-size: 1.7em;
}

.search_button_wrapper{
  height: 60%;
}

.search_button{
  height: 100%;
  user-select: none;
}

.search_button_wrapper:hover{
  cursor: pointer;
}

@media (max-width: 1400px) {
  .search{
    width: 80%;
    /* margin-top: calc(50vh - 300px); */
    margin-top: 100px;
  }
  .search_title_name{
    font-size: 1.7em;
  }

  .search_bar{
    height: 50px;
    font-size: 1.2em;
  }

  .search_button_wrapper{
    margin-right: 10px;
  }
}

@media (max-width: 1000px) {
  .search_title_name{
    font-size: 1.4em;
  }
  
  .search_input{
    font-size: 1.3em;
  }
}
</style>
