<template>
	<nav>
		<img class="logo" src="../assets/logo.png" alt="">
		<div class="right">
			<div class="item_wrapper">
				<RouterLink class="item home" to="/">HOME</RouterLink>
			</div>
			<div class="item_wrapper">
				<RouterLink class="item fav" to="/favourite">FAVOURITE</RouterLink>
			</div>
		</div>
		
	</nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<style scoped>
nav{
	height: 100px;
	background-color: #FBBE00;
	display: flex;
	justify-content: space-between;
}

.logo{
	margin: 0 10px;
	user-select: none;
}

.right{
	display: flex;
}

.item_wrapper{
	width: 200px;
	height: 100%;
	display: flex;
	align-items: center;
	transition: background-color 0.5s;
}

.item{
	display: block;
	margin: auto 0;
	padding: 10px;
	height: 60%;
	width: 200px;
	text-align: center;
	border-left: 1px solid #000;
	line-height: 40px;
	user-select: none;
}

.item_wrapper:hover{
	background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 800px) {
	nav{
		height: 70px;
	}

	.item_wrapper{
		width: 150px;
	}

	.item{
		line-height: 25px;
	}
}

@media (max-width: 500px) {
	nav{
		height: 50px;
	}

	.item_wrapper{
		width: 100px;
	}

	.item{
		font-size: 12px;
		line-height: 10px;
	}
}
</style>