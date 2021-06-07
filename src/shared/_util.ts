/**
 * Returns true if the app is running in development mode.
 */
export function isDev() {
	return process.env.NODE_ENV !== 'production'
}

/**
 * Returns true if the app is running in production mode.
 */
export function isProd() {
	return process.env.NODE_ENV === 'production'
}
