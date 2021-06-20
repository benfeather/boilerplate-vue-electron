<template>
	<h1>Home Page</h1>
	<IPC />
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import IPC from '../components/IPC.vue'

	export default defineComponent({
		name: 'Home',
		components: {
			IPC,
		},
	})
</script>

<style scoped lang="scss"></style>
