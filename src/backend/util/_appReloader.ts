import chokidar from 'chokidar'
import { app } from 'electron'

/**
 * A utility used to close the electron app when changes are made to the source files.
 * Closing the app will trigger the entry script to relaunch the app.
 *
 * @param {string | string[]} paths The file path(s) to watch.
 * @param {RegExp[]} ignored An array of Regex patterns that should be ignored.
 */
export class AppReloader {
	paths: string | string[]
	ignoredPaths: RegExp[]
	watcher: chokidar.FSWatcher

	constructor(paths: string | string[], ignored?: RegExp[]) {
		this.paths = Array.isArray(paths) ? [...paths] : paths
		this.ignoredPaths = [/(node_modules)/]

		if (ignored) {
			this.ignoredPaths.concat(ignored)
		}

		this.watcher = chokidar.watch(this.paths, {
			ignored: this.ignoredPaths,
		})

		this.watcher.on('error', (error: Error) => {
			throw error
		})

		this.watcher.on('change', (path: string) => {
			app.exit(200) // Exit with a custom exit code (to trigger restart)
		})
	}
}
