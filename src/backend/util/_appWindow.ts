import { app, BrowserWindow } from 'electron'
import { AppReloader, Store, isProd } from '.'
import path from 'path'

export interface WindowData {
	x?: number
	y?: number
	width?: number
	height?: number
	isMaximized?: boolean
}

/**
 * A utility used to create and manage the main App window.
 */
export class AppWindow {
	window: BrowserWindow
	store: Store<WindowData>

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
		this.trackWindowState()
	}

	/**
	 * Load the window content.
	 * Enables devtools and HMR for development.
	 */
	loadApp() {
		if (isProd()) {
			const appPath = path.join(app.getAppPath(), 'dist', 'frontend', 'index.html')

			this.window.loadFile(appPath)
		} else {
			const appPath = path.join(app.getAppPath(), 'src', 'backend')

			this.window.loadURL('http://localhost:3000/')
			this.window.webContents.openDevTools()

			new AppReloader(appPath)
		}

		this.window.show()
	}

	/**
	 * Listen to various window events and save the window state on change.
	 */
	trackWindowState() {
		const events = ['maximize', 'unmaximize', 'resized', 'moved']

		events.forEach((e: any) => {
			this.window.on(e, () => this.saveWindowState(e))
		})
	}

	/**
	 * Save the current window state (size/position).
	 *
	 * @param {string} e The event name.
	 */
	saveWindowState(e: string) {
		const bounds = this.window.getBounds()
		const data: WindowData = {
			isMaximized: this.window.isMaximized(),
		}

		// Only update the bounds if the window is moved or resized.
		// This keeps the original bounds intact when the window is maximized/unmaximized.
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
