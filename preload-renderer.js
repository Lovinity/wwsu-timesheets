"use strict";
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener("DOMContentLoaded", () => {
	const { ipcRenderer, contextBridge } = require("electron");

	contextBridge.exposeInMainWorld("ipc", {
		// Get Data
		getMachineId: () => ipcRenderer.sendSync("get-machine-id"),
		getAppVersion: () => ipcRenderer.sendSync("get-app-version"),

		// Check for update
		checkVersion: (latestVersion) =>
			ipcRenderer.sendSync("check-version", latestVersion),

		// Listen for messages
		on: (event, fn) => ipcRenderer.on(event, fn),

		// Main process
		main: {
			send: (task, args) => ipcRenderer.send("main", [task, args]),
		},
	});

	// Getting settings
	contextBridge.exposeInMainWorld("settings", {});

	// Saving settings
	contextBridge.exposeInMainWorld("saveSettings", {});
});
