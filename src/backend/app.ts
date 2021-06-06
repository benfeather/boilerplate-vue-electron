import { app, BrowserWindow } from 'electron'
import './ipc'

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	})

	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:3000/')
		win.webContents.openDevTools()
	} else {
		win.loadFile('dist/frontend/index.html')
	}
}

app.on('ready', () => {
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
