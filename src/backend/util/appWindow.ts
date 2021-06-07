import { app, BrowserWindow } from 'electron'
import { AppReloader } from './appReloader'
import { Store, isDev } from '../../shared'
import path from 'path'

interface WindowData {
	[key: string]: number | string | boolean
}

export class AppWindow {
	window: BrowserWindow
	store: Store

	constructor() {
		this.store = new Store('window-data')

		this.window = new BrowserWindow({
			show: false,
			x: this.store.data.x || undefined,
			y: this.store.data.y || undefined,
			width: this.store.data.width || 1280,
			height: this.store.data.height || 720,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true,
			},
		})

		if (this.store.data.isMaximized) {
			this.window.maximize()
		}

		this.loadApp()
		this.trackWindow()
	}

	loadApp() {
		const appPath = path.join(app.getAppPath(), 'src', 'backend')

		if (isDev()) {
			this.window.loadURL('http://localhost:3000/')
			this.window.webContents.openDevTools()

			new AppReloader({ paths: appPath })
		} else {
			this.window.loadFile('dist/frontend/index.html')
		}

		this.window.show()
	}

	trackWindow() {
		const events = ['maximize', 'unmaximize', 'resized', 'moved']

		events.forEach((e: any) => {
			this.window.on(e, () => this.saveState(e))
		})
	}

	saveState(e: string) {
		const bounds = this.window.getBounds()
		const data: WindowData = {
			isMaximized: this.window.isMaximized(),
		}

		// Only update the bounds if the window is moved or resized
		// This keeps the original bounds intact when the window is maximized/unmaximized
		if (e === 'resized' || e === 'moved') {
			data.x = bounds.x
			data.y = bounds.y
			data.width = bounds.width
			data.height = bounds.height
		}

		// Combine the existing data with the new data
		this.store.data = Object.assign(this.store.data, data)
	}
}
