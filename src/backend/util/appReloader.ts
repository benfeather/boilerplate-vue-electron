import chokidar from 'chokidar'
import { app } from 'electron'

interface IReloaderOptions {
	paths: string | string[]
	ignored?: RegExp | RegExp[]
}

export class AppReloader {
	paths: string | string[]
	ignoredPaths: RegExp[]
	watcher: chokidar.FSWatcher

	constructor(options: IReloaderOptions) {
		this.paths = Array.isArray(options.paths) ? [...options.paths] : options.paths
		this.ignoredPaths = [/(node_modules)/]

		if (options.ignored) {
			this.ignoredPaths.concat(options.ignored)
		}

		this.watcher = chokidar.watch(this.paths, {
			ignored: this.ignoredPaths,
		})

		this.watcher.on('error', (error: Error) => {
			throw error
		})

		this.watcher.on('change', (path: string) => {
			app.relaunch()
			app.exit()
		})
	}
}
