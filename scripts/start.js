const cp = require('child_process')
const path = require('path')
const proc = require('process')

;(function start() {
	const electron = path.resolve('node_modules/.bin/electron')
	const electronProc = cp.exec(`${electron} index.js`)

	electronProc.stdout.on('data', function (data) {
		proc.stdout.write(data.toString())
	})

	electronProc.stderr.on('data', function (data) {
		proc.stdout.write(data.toString())
	})

	electronProc.on('exit', function (code) {
		if (code !== 0) return

		proc.stdout.write(`child process exited with code ${code}, restarting...`)

		start()
	})
})()
