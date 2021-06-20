<template>
	<Nav />
	<router-view></router-view>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import Nav from './components/Nav.vue'

	export default defineComponent({
		name: 'App',
		components: {
			Nav,
		},
	})
</script>

<style lang="scss">
	@import 'assets/scss/index';

	#app {
		padding: 60px 20px;
		text-align: center;
	}
</style>
