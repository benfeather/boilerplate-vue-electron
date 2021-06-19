export {}

declare let window: Window

declare global {
	interface Window {
		process: any
		require: any
	}
}
