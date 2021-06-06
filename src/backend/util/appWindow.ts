import { app, BrowserWindow } from 'electron'
import { AppReloader } from './appReloader'
import path = require('path')

export class AppWindow {
	win: BrowserWindow
	frontendSrc: string
	backendSrc: string
	isDev: boolean

	constructor() {
		this.win = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true,
			},
		})

		this.frontendSrc = path.join(app.getAppPath(), 'src', 'frontend')
		this.backendSrc = path.join(app.getAppPath(), 'src', 'backend')
		this.isDev = process.env.NODE_ENV === 'development'

		if (this.isDev) {
			this.win.loadURL('http://localhost:3000/')
			this.win.webContents.openDevTools()

			new AppReloader({ paths: this.backendSrc })
		} else {
			this.win.loadFile('dist/frontend/index.html')
		}
	}
}
