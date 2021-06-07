import electron from 'electron'
import path from 'path'
import fs from 'fs'

/**
 * A utility used to create persistent data on the user's system.
 *
 * @param {string} storeName The name of the store (used for the filename).
 */
export class Store<StoreData extends object> {
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

	/**
	 * Get a value from the store data by key.
	 *
	 * @param {Key} key The key name.
	 */
	get<Key extends keyof StoreData>(key: Key): any {
		return this._storeData[key]
	}

	/**
	 * Set a value in the store data by key.
	 *
	 * @param {Key} key The key name.
	 * @param {any} val The value of the store property.
	 */
	set<Key extends keyof StoreData>(key: Key, val: any) {
		this._storeData[key] = val
		this._writeData()
	}

	/**
	 * Write the store data to disk.
	 */
	private _writeData() {
		fs.writeFileSync(this._path, JSON.stringify(this._storeData))
	}

	/**
	 * Read the store data from disk.
	 */
	private _readData(): StoreData {
		try {
			return JSON.parse(fs.readFileSync(this._path).toString())
		} catch (error) {
			return {} as StoreData
		}
	}
}
