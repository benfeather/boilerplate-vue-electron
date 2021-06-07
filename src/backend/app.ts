import { app, BrowserWindow } from 'electron'
import { AppWindow } from './util'

// App components
// ----------------------------------------

import './ipc/demo'

// Init
// ----------------------------------------

app.on('ready', () => {
	new AppWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		new AppWindow()
	}
})
