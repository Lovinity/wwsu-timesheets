"use strict";

// Initialize unhandled exceptions handler first
const { is, openNewGitHubIssue, debugInfo } = require("electron-util");
const unhandled = require("electron-unhandled");
unhandled({
	reportButton: (error) => {
		openNewGitHubIssue({
			user: "Lovinity",
			repo: "wwsu-timesheets",
			body: `
			<!-- Below, please describe what you were doing leading up to the issue (steps to reproduce) -->
			
			<!-- Below, please explain what you expected to happen -->
			
			<!-- Below, please explain what actually happened, including relevant error messages -->

			---
			The following is auto-generated information about the error you received.
			${error.message}
			${error.stack}
			
			---
			The following is auto-generated information about the app version you are using and the OS you are running.
			${debugInfo()}`,
		});
	},
});

const path = require("path");
const {
	app,
	BrowserWindow,
	Menu,
	ipcMain,
	session,
	shell,
} = require("electron");
const debug = require("electron-debug");
const contextMenu = require("electron-context-menu");
const config = require("./config");
const menu = require("./menu");
const packageJson = require("./package.json");
const { machineIdSync } = require("./assets/wwsu-host-id-timesheets");
const semver = require("semver");

debug();
contextMenu();

app.setAppUserModelId(packageJson.appId);

// Prevent window from being garbage collected
let mainWindow;

const enforceCORS = () => {
	// Enforce CORS and Origin
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				"Content-Security-Policy": !is.development
					? [`script-src 'self' https://server.wwsu1069.org`]
					: [],
				Origin: "file://",
			},
		});
	});
};

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		show: false,
		width: 600,
		height: 400,
		fullscreen: true,
		autoHideMenuBar: true, // Do not show manu bar unless alt is pressed
		webPreferences: {
			contextIsolation: true,
			enableRemoteModule: false, // electron's remote module is insecure
			preload: path.join(__dirname, "preload-renderer.js"),
			zoomFactor: 1.25,
		},
	});

	win.on("ready-to-show", () => {
		win.show();
	});

	win.on("closed", () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, "renderer.html"));

	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on("second-instance", () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	enforceCORS();
	mainWindow = await createMainWindow();
})();

/*
	IPC COMMUNICATIONS
*/

// Sync get the machine ID string for this installation
ipcMain.on("get-machine-id", (event) => {
	event.returnValue = machineIdSync();
});

// Sync Get the app and version info
ipcMain.on("get-app-version", (event) => {
	event.returnValue = `${packageJson.name} v${packageJson.version}`;
});

// Sync check if a version is newer than our version
ipcMain.on("check-version", (event, arg) => {
	if (semver.gt(arg, packageJson.version)) {
		event.returnValue = { current: packageJson.version };
	}
	event.returnValue = false;
});

// Sync return settings store
ipcMain.on("settings", (event, arg) => {
	event.returnValue = config.get(arg);
});

// Save new settings
ipcMain.on("saveSettings", (event, arg) => {
	config.set(arg[0], arg[1]);
});

// Tasks to be completed by the main process
ipcMain.on("main", (event, arg) => {
	var args = arg[1];
	switch (arg[0]) {
		// Generate a notification window
		case "makeNotification":
			((data) => {
				let notificationWindow = new BrowserWindow({
					width: 640,
					height: 480,
					show: false,
					center: true,
					alwaysOnTop: true,
					minimizable: false,
					maximizable: false,
					autoHideMenuBar: true, // Do not show manu bar unless alt is pressed
					title: `WWSU Timesheets - ${data.title}`,
					webPreferences: {
						contextIsolation: true,
						enableRemoteModule: false, // electron's remote module is insecure
						preload: path.join(__dirname, "preload-notification.js"),
						backgroundThrottling: false, // Do not throttle this process.
						zoomFactor: 1.25,
					},
				});
				notificationWindow.once("ready-to-show", () => {
					notificationWindow.show();
					notificationWindow.webContents.send("notificationData", data);
				});
				notificationWindow.loadFile("notification.html");
			})(arg[1][0]);
			break;
	}
});
