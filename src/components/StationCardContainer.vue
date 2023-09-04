<template>
	<div class="station_card_container">
		<slot />
	</div>
</template>

<style scoped>
.station_card_container{
	display: flex;
	flex-flow: row wrap;
}
</style>