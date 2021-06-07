import { app } from 'electron'

/**
 * Returns true if the app is running in development mode.
 */
export function isDev() {
	return !app.isPackaged
}

/**
 * Returns true if the app is running in production mode.
 */
export function isProd() {
	return app.isPackaged
}
