import { BrowserWindow } from 'electron'
import { Store, isDev } from '.'

export interface WindowConfig {
	id: string
	width: number
	height: number
	file?: string
	url?: string
	saveState?: boolean
	devtools?: boolean
}

export interface WindowData {
	x?: number
	y?: number
	width?: number
	height?: number
	isMaximized?: boolean
}

/**
 * A utility for creating and managing the App windows.
 */
export class AppWindow {
	window: BrowserWindow
	store: Store<WindowData>

	constructor(config: WindowConfig) {
		this.store = new Store(`win-data_${config.id}`)

		this.window = new BrowserWindow({
			show: false,
			x: this.store.data.x || undefined,
			y: this.store.data.y || undefined,
			width: this.store.data.width || config.width,
			height: this.store.data.height || config.height,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true,
			},
		})

		if (this.store.data.isMaximized) {
			this.window.maximize()
		}

		if (config.saveState) {
			this.trackWindowState()
		}

		if (config.devtools && isDev()) {
			this.window.webContents.openDevTools()
		}

		if (config.file) {
			this.window.loadFile(config.file)
		}

		if (config.url) {
			this.window.loadURL(config.url)
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
