import electron from 'electron'
import path from 'path'
import fs from 'fs'

interface StoreData {
	[key: string]: any
}

export class Store {
	private _path: string
	private _storeData: StoreData

	constructor(storeName: string) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData')

		this._path = path.join(userDataPath, `${storeName}.json`)
		this._storeData = this._readData()
	}

	get data() {
		return this._storeData
	}

	set data(newStoreData) {
		this._storeData = newStoreData
		this._writeData()
	}

	get(key: string) {
		return this._storeData[key]
	}

	set(key: string, val: any) {
		this._storeData[key] = val
		this._writeData()
	}

	private _writeData() {
		fs.writeFileSync(this._path, JSON.stringify(this._storeData))
	}

	private _readData(): StoreData {
		try {
			return JSON.parse(fs.readFileSync(this._path).toString())
		} catch (error) {
			return {}
		}
	}
}
