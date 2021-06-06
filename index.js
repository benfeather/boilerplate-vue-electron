require('ts-node').register({
	project: './tsconfig.electron.json',
})
require('./src/backend/app.ts')
