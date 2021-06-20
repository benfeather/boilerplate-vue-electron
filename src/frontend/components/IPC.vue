<template>
	<button @click="sendMessage()">Send Message</button>
	<pre v-html="message"></pre>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue'

	const { ipcRenderer } = window.require('electron')

	export default defineComponent({
		name: 'IPC',
		setup: () => {
			const message = ref('')

			const sendMessage = () => {
				message.value += '\n Vue says: ping'
				ipcRenderer.send('message', 'ping')
			}

			ipcRenderer.on('reply', (event: any, arg: string) => {
				message.value += `\n Electron says: ${arg} \n`
			})

			return {
				message,
				sendMessage,
			}
		},
	})
</script>

<style scoped lang="scss"></style>
