import Store from "electron-store";
import { app } from "electron";
import { info, error } from "electron-log";
import fs from "fs";
import { vnStat } from "./vnStat";
export default class __AppConfigs__ {
	CheckIfSchemeWasUpdated = () => {
		/* 
		* If all keys does exist, that mean schema didn't update then will be return false,
		! And if some keys does not exist, that mean scheme was updated, then will be return true.
		*/
		try {
			return !CheckIfAllKeysExist(
				this.scheme,
				JSON.parse(
					fs.readFileSync(
						`${app.getPath("userData")}/config.json`,
						"utf-8"
					)
				)
			);
		} catch (err) {
			error(err);
			return false;
		}
	};
	constructor() {
		this.store;
		this.scheme;
		this.scheme = {
			netStatsRefreshTime: 1000,
			checkUpdatesOnStartup: true,
			interface: 1,
			appearance: {
				globalTheme: "green",
				lineChart: {
					hasArea: true,
					areaOpacity: 0.5,
					colors: "nivo",
					curve: "cardinal",
				},
				barChart: {
					colors: "nivo",
					isGrouped: true,
					layout: "horizontal",
				},
			},
		};

		this.store = new Store({});

		if (!fs.existsSync(`${app.getPath("userData")}/config.json`)) {
			info("Creating configuration file...");
			this.store.set(this.scheme);
			info(`Configuration file was created at ${this.store.path}`);
		} else if (this.CheckIfSchemeWasUpdated()) {
			info("Updating configuration schema...");
			this.store.set(this.scheme);
			info(`Configuration file was updated at ${this.store.path}`);
		}
	}

	get = key => {
		return key ? this.store.get(key) : this.store.store;
	};
	set = (key, value) => {
		this.store.set(key, value);
	};
}

function CheckIfAllKeysExist(a, b) {
	for (let key of Object.keys(a)) {
		if (Object.keys(b).indexOf(key) === -1) {
			return false;
		}
		if (typeof a[key] === "object") {
			if (!CheckIfAllKeysExist(a[key], b[key])) return false;
		}
	}
	return true;
}

export const Configs = new __AppConfigs__();
