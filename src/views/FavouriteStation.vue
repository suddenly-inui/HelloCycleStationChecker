<template>
	<h1 class="page_name">FAVOURITES</h1>
	<StationInfo v-for="fav in fav_station" :key="fav" :station_name="fav"></StationInfo>
</template>

<script setup lang="ts">
import StationInfo from '@/components/StationInfo.vue';
import { fav_station } from '@/services/LocalStorage';
</script>

<style scoped>
.page_name{
	text-align: center;
	font-size: 3em;
	margin: 20px 0;
	user-select: none;
}
</style>
