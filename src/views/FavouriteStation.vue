<template>
	<h1>おきにいり</h1>
	<StationInfo v-for="fav in fav_station" :key="fav" :station_name="fav"></StationInfo>
</template>

<script setup lang="ts">
import StationInfo from '@/components/StationInfo.vue';
import { fav_station } from '@/services/LocalStorage';
</script>
