require('ts-node').register({
	project: './tsconfig.electron.json',
})
require('./backend/app.ts')
