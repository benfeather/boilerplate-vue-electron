import path from 'path'
import { app, BrowserWindow, Menu } from 'electron'
import { AppWindow, isProd, isMac, menu, WindowConfig } from './common'

// App components
// ----------------------------------------

import './ipc/demo'

// Config
// ----------------------------------------

const windowConfig: WindowConfig = {
	id: 'main',
	width: 1280,
	height: 720,
	saveState: true,
}

if (isProd()) {
	windowConfig.file = path.join(app.getAppPath(), 'dist', 'frontend', 'index.html')
	windowConfig.devtools = false
} else {
	windowConfig.url = 'http://localhost:3000/'
	windowConfig.devtools = true
}

// Init
// ----------------------------------------

Menu.setApplicationMenu(menu)

app.on('ready', () => {
	new AppWindow(windowConfig)
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length > 0) return

	new AppWindow(windowConfig)
})

app.on('window-all-closed', () => {
	if (isMac()) return

	app.quit()
})
