<template>
	<h1 class="page_name">FAVOURITES</h1>
	<StationCardContainer>
		<StationInfo v-for="fav in fav_station" :key="fav" :station_name="fav"></StationInfo>
	</StationCardContainer>
</template>

<script setup lang="ts">
import StationCardContainer from '@/components/StationCardContainer.vue';
import StationInfo from '@/components/StationInfo.vue';
import { fav_station } from '@/services/LocalStorage';
import StationsApiService from '@/services/StationsApiService';
import { onMounted } from 'vue';

onMounted(() => {
	StationsApiService.getAll().then(() => {})
})

</script>

<style scoped>
.page_name{
	text-align: center;
	font-size: 3em;
	margin: 20px 0;
	user-select: none;
}
</style>
