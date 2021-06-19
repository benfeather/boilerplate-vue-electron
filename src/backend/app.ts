import path from 'path'
import { app, BrowserWindow } from 'electron'
import { AppWindow, isProd, WindowConfig } from './util'

// App components
// ----------------------------------------

import './ipc/demo'

// Init
// ----------------------------------------

const config: WindowConfig = {
	id: 'main',
	width: 1280,
	height: 720,
	saveState: true,
}

if (isProd()) {
	config.file = path.join(app.getAppPath(), 'dist', 'frontend', 'index.html')
	config.devtools = false
} else {
	config.url = 'http://localhost:3000/'
	config.devtools = true
}

app.on('ready', () => {
	new AppWindow(config)
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		new AppWindow(config)
	}
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
