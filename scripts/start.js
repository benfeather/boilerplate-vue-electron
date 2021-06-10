// bootstrap.js
const concurrently = require('concurrently')

const cmd = [
	{ command: 'npm:start-vue', name: 'app' },
	{ command: 'npm:start-electron', name: 'main' },
]

const options = {
	prefix: 'name',
	killOthers: ['failure', 'success'],
	restartTries: 0,
}

concurrently(cmd, options)

// .then(
// 	function onSuccess(exitInfo) {
// 		// This code is necessary to make sure the parent terminates
// 		// when the application is closed successfully.
// 		process.exit()
// 	},
// 	function onFailure(exitInfo) {
// 		// This code is necessary to make sure the parent terminates
// 		// when the application is closed because of a failure.
// 		process.exit()
// 	}
// )
