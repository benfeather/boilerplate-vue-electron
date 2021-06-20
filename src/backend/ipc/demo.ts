import { ipcMain } from 'electron'

ipcMain.on('message', (event, arg) => {
	console.log(arg) // prints "ping"
	event.reply('reply', 'pong')
})
