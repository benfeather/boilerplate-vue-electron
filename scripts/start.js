const concurrently = require('concurrently')

const cmd = [
	{
		command: 'vite',
		name: 'frontend',
	},
	{
		command: 'nodemon --ext ts --watch src/backend/* --exec "electron src"',
		name: 'backend',
	},
]

const options = {
	prefix: 'name',
	restartTries: 0,
}

concurrently(cmd, options)
