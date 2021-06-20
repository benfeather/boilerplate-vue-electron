<template>
	<img class="logo" alt="Vue logo" src="/images/logo.png" />

	<nav class="nav">
		<router-link to="/" class="nav__link">Home</router-link>
		<router-link to="/about" class="nav__link">About</router-link>
	</nav>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'About',
	})
</script>

<style scoped lang="scss">
	.logo {
		display: block;
		margin: 0 auto 20px auto;
	}

	.nav {
		display: grid;
		grid-auto-columns: min-content;
		grid-auto-flow: column;
		justify-content: center;
		gap: 40px;

		&__link {
			display: block;
			padding: 5px 10px;
		}
	}
</style>
