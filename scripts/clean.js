const fs = require('fs')
const dir = 'dist'

fs.rmdir(dir, { recursive: true }, (err) => {
	if (err) {
		throw err
	}

	console.log(`${dir} is clean!`)
})
