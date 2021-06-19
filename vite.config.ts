import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const publicDir = join(__dirname, 'src/public')
const appDir = join(__dirname, 'src/frontend')
const outDir = join(__dirname, 'dist/frontend')

// https://vitejs.dev/config/
export default defineConfig({
	publicDir,
	base: './',
	root: './src',
	plugins: [vue()],
	build: {
		outDir,
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': appDir,
		},
	},
})
