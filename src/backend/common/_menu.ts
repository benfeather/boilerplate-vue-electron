import { app, Menu, BrowserWindow } from 'electron'
import { isDev } from './_util'

const menuTemplate: any[] = []

const menuDebug = {
	label: 'Debug',
	submenu: [
		{
			label: 'Open Developer Tools',
			accelerator: 'f12',
			click() {
				const window = BrowserWindow.getFocusedWindow()
				window?.webContents.openDevTools()
			},
		},
		{
			label: 'Refresh',
			accelerator: 'f5',
			click() {
				const window = BrowserWindow.getFocusedWindow()
				window?.webContents.reload()
			},
		},
		{
			label: 'Relaunch',
			accelerator: 'CommandOrControl+R',
			click() {
				app.relaunch()
				app.quit()
			},
		},
		{
			label: 'Exit',
			accelerator: 'Esc',
			click() {
				app.quit()
			},
		},
	],
}

if (isDev()) {
	menuTemplate.push(menuDebug)
}

export const menu = Menu.buildFromTemplate(menuTemplate)
