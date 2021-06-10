const cp = require('child_process')
const path = require('path')
const proc = require('process')

;(function start() {
	const electron = path.resolve('node_modules/.bin/electron')
	const electronProc = cp.exec(`${electron} index.js`)

	// Pipe stdout/stderr to the main process
	electronProc.stdout.pipe(proc.stdout)
	electronProc.stderr.pipe(proc.stderr)

	electronProc.on('exit', (code) => {
		// Restart the app if it exits with code 200
		// (a custom exit code from appReload.ts)
		if (code === 200) {
			proc.stdout.write(`Electron exited with code ${code}, restarting...`)
			start()
			return
		}

		electronProc.exit()
		process.exit()
	})
})()
