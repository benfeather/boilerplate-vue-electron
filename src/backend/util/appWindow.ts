import { app, BrowserWindow } from 'electron'
import { AppReloader } from './appReloader'
import { Store } from '../../shared/store'
import path from 'path'
export class AppWindow {
	window: BrowserWindow
	store: Store

	constructor() {
		this.store = new Store('window-data')

		this.window = new BrowserWindow({
			x: this.store.data.x || undefined,
			y: this.store.data.y || undefined,
			width: this.store.data.width || 1280,
			height: this.store.data.height || 720,
			center: this.store.data.center || true,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true,
			},
		})

		this.loadApp()
		this.trackWindow()
	}

	loadApp() {
		const isDev = process.env.NODE_ENV !== 'production'
		const appPath = path.join(app.getAppPath(), 'src', 'backend')

		if (isDev) {
			this.window.loadURL('http://localhost:3000/')
			this.window.webContents.openDevTools()

			new AppReloader({ paths: appPath })
		} else {
			this.window.loadFile('dist/frontend/index.html')
		}
	}

	trackWindow() {
		this.window.on('resize', () => this.saveState())
		this.window.on('close', () => this.saveState())
		this.window.on('move', () => this.saveState())
	}

	saveState() {
		const bounds = this.window.getBounds()

		this.store.data = {
			x: bounds.x,
			y: bounds.y,
			width: bounds.width,
			height: bounds.height,
			center: false,
		}
	}
}
