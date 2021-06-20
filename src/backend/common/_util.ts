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

/**
 * Returns true if the app is running on MacOS.
 */
export function isMac() {
	return process.platform === 'darwin'
}

/**
 * Returns true if the app is running on Linux.
 */
export function isLinux() {
	return process.platform === 'linux'
}

/**
 * Returns true if the app is running on Windows.
 */
export function isWindows() {
	return process.platform === 'win32'
}
