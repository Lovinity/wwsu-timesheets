"use strict";
window.addEventListener("DOMContentLoaded", () => {
	// Machine ID
	var machineID = window.ipc.getMachineId();
	$(".connecting-id").html(machineID);

	// Animation queue
	var animations = new WWSUanimations();

	// Connection
	io.sails.url = "https://server.wwsu1069.org";
	io.sails.query = `host=${machineID}`;
	io.sails.reconnectionAttempts = 3;
	var socket = io.sails.connect();
	$("#connecting").removeClass("d-none");
	$("#loading").addClass("d-none");

	// WWSU Plugins
	var wwsuutil = new WWSUutil();
	var navigation = new WWSUNavigation();

	// WWSU Requests and Endpoint managers
	var noReq = new WWSUreq(socket, null);
	var meta = new WWSUMeta(socket, noReq);
	var hostReq = new WWSUreq(
		socket,
		machineID,
		null,
		null,
		"host",
		"/auth/host",
		"Host"
	);
	var directors = new WWSUdirectors(socket, noReq);
	var directorReq = new WWSUreq(
		socket,
		machineID,
		directors,
		null,
		"name",
		"/auth/director",
		"Director"
	);
	var adminDirectorReq = new WWSUreq(
		socket,
		machineID,
		directors,
		{ admin: true },
		"name",
		"/auth/admin-director",
		"Administrator Director"
	);
	var logs = new WWSUlogs(socket, noReq, hostReq, directorReq, meta);
	var djs = new WWSUdjs(socket, noReq, directorReq, hostReq, logs, meta);
	var djReq = new WWSUreq(
		socket,
		machineID,
		djs,
		null,
		"name",
		"/auth/dj",
		"DJ"
	);
	var announcements = new WWSUannouncements(
		socket,
		noReq,
		["timesheet"],
		meta,
		directorReq
	);
	var timesheets = new WWSUtimesheet(socket, noReq, adminDirectorReq, meta);
	var calendar = new WWSUcalendar(socket, meta, noReq, directorReq, djReq);
	var discipline = new WWSUdiscipline(socket, noReq, directorReq, meta);
	var recipients = new WWSUrecipients(socket, meta, hostReq);
	var hosts = new WWSUhosts(
		socket,
		meta,
		recipients,
		machineID,
		window.ipc.getAppVersion(),
		hostReq,
		directorReq
	);
	var version = new WWSUversion(socket, `wwsu-timesheets`, hostReq);

	// Models
	var clockModal = new WWSUmodal(`Clock`, null, ``, true, {
		headerColor: "",
		overlayClose: false,
		zindex: 1100,
	});

	// navigation
	var navigation = new WWSUNavigation();
	navigation.addItem(
		"#nav-home",
		"#section-home",
		"Home - WWSU Timesheets",
		"/",
		true
	);
	navigation.addItem(
		"#nav-calendar",
		"#section-calendar",
		"Manage Calendar - WWSU Timesheets",
		"/calendar",
		false,
		() => {
			fullCalendar.updateSize();
		}
	);

	/*
        CALENDAR
    */

	// Initialize Calendar
	var calendarEl = document.getElementById("calendar");

	var fullCalendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ["interaction", "dayGrid", "timeGrid", "bootstrap"],
		header: {
			left: "prev,next today",
			center: "title",
			right: "dayGridMonth,timeGridWeek,timeGridDay",
		},
		defaultView: "timeGridWeek",
		navLinks: true, // can click day/week names to navigate views
		selectable: false,
		selectMirror: true,
		nowIndicator: true,
		editable: false,
		startEditable: false,
		durationEditable: false,
		resourceEditable: false,
		themeSystem: "bootstrap",
		eventLimit: true, // allow "more" link when too many events
		events: function (info, successCallback, failureCallback) {
			animations.add("calendar-refetch", () => {
				$("#calendar").block({
					message: "<h1>Loading...</h1>",
					css: { border: "3px solid #a00" },
					timeout: 30000,
					onBlock: () => {
						calendar.getEvents(
							(events) => {
								events = events.map((event) => {
									// Do not show anything but office hours
									if (event.type !== "office-hours") return false;

									var borderColor;
									if (event.scheduleType === "canceled-changed") return false;
									if (
										["canceled", "canceled-system"].indexOf(
											event.scheduleType
										) !== -1
									) {
										borderColor = "#ff0000";
									} else if (
										["updated", "updated-system"].indexOf(
											event.scheduleType
										) !== -1
									) {
										borderColor = "#ffff00";
									} else if (
										["unscheduled"].indexOf(event.scheduleType) !== -1
									) {
										borderColor = "#00ff00";
									} else {
										borderColor = "#0000ff";
									}
									return {
										id: event.unique,
										groupId: event.calendarID,
										start: moment.parseZone(event.start).toISOString(true),
										end: moment.parseZone(event.end).toISOString(true),
										title: `${event.type}: ${event.hosts} - ${event.name}`,
										backgroundColor:
											["canceled", "canceled-system"].indexOf(
												event.scheduleType
											) === -1
												? event.color
												: "#161616",
										textColor: "#e6e6e6",
										borderColor: borderColor,
										extendedProps: {
											event: event,
										},
									};
								});
								successCallback(events);
								fullCalendar.updateSize();
								$("#calendar").unblock();
							},
							moment(info.start).subtract(1, "days").toISOString(true),
							moment(info.end).toISOString(true)
						);
					},
				});
			});
		},

		eventRender: function eventRender(info) {
			if (info.event.extendedProps.event.scheduleType === "canceled-changed")
				return false;
			info.el.title = info.event.title;
			if (
				["canceled", "canceled-system"].indexOf(
					info.event.extendedProps.event.scheduleType
				) !== -1
			) {
				info.el.title += ` (CANCELED)`;
			}
			if (
				["updated", "updated-system"].indexOf(
					info.event.extendedProps.event.scheduleType
				) !== -1
			) {
				info.el.title += ` (edited on this occurrence)`;
			}
			return true;
		},

		eventClick: function (info) {
			calendar.showClickedEvent(info.event.extendedProps.event);
		},
	});
	fullCalendar.render();

	// execute updateCalendar function each time calendar has been changed, but add a 1-second buffer so we don't update a million times at once.
	let calTimer;
	calendar.on("calendarUpdated", "renderer", () => {
		clearTimeout(calTimer);
		calTimer = setTimeout(() => {
			fullCalendar.refetchEvents();
		}, 1000);
	});

	/*
        SOCKET EVENTS AND FUNCTIONS
    */

	// Connected to WWSU
	socket.on("connect", () => {
		$("#reconnecting").addClass("d-none");
		$("#connecting").addClass("d-none");
		$("#unauthorized").addClass("d-none");
		$("#content").removeClass("d-none");
		socket._raw.io._reconnectionAttempts = Infinity;

		discipline.checkDiscipline(() => {
			hosts.get((success) => {
				if (success === 1) {
					meta.init();
					directors.init();
					djs.init();
					calendar.init();
					announcements.init();
					version.init();
				} else if (success === -1) {
					$("#content").addClass("d-none");
					$("#already-connected").removeClass("d-none");
				} else if (success === 0) {
					$("#content").addClass("d-none");
					$("#unauthorized").removeClass("d-none");
				}
			});
		});
	});

	// Disconnected from WWSU
	socket.on("disconnect", () => {
		$("#reconnecting").removeClass("d-none");
		$("#connecting").addClass("d-none");
		$("#unauthorized").addClass("d-none");
		$("#content").addClass("d-none");
	});

	// Connection error
	socket.on("reconnect_failed", (error) => {
		$("#unauthorized").removeClass("d-none");
		$("#connecting").addClass("d-none");
		$("#reconnecting").addClass("d-none");
		$("#content").addClass("d-none");
	});

	socket.on("error", () => {
		if (!hosts.connectedBefore) {
			$("#unauthorized").removeClass("d-none");
			$("#connecting").addClass("d-none");
			$("#reconnecting").addClass("d-none");
			$("#content").addClass("d-none");
		}
	});

	/*
		VERSION FUNCTIONS
	*/

	let newestVersion = ``;
	version.on("change", "renderer", (db) => {
		let record = db.get().find((rec) => rec.app === `wwsu-timesheets`);
		if (!record) return;
		if (record.version !== newestVersion) {
			newestVersion = record.version;
			let isNewVersion = window.ipc.checkVersion(record.version);
			if (isNewVersion) {
				window.ipc.main.send("makeNotification", [
					{
						title: "New Version Available",
						bg: "success",
						header: "New version of WWSU Timesheets available!",
						flash: false,
						body: `<p>A new version of WWSU Timesheets is available for download. Features of this WWSU Timesheets may no longer work until you update.</p>
				  <ul>
				  <li>Your version: ${isNewVersion.current}</li>
				  <li>Latest version: ${record.version}</li>
				  </ul>
				  <p>To download the latest version, <a href="${record.downloadURL}" target="_blank">click this link</a>. And under "Assets", download and run the installer appropriate for your operating system (.pkg for macOS, .rpm or .deb for Linux, .exe for Windows). </p>
				  <p><strong>Warning! WWSU Timesheets is an unsigned application.</strong> Your operating system may warn you of this and require additional steps to install:</p>
				  <ul>
				  <li>Web browsers: Some web browsers such as Chrome may block the download of WWSU Timesheets. You will need to unblock / choose the "keep" option.</li>
				  <li>MacOS: You may need to run the .pkg file from Finder. Open Finder, browse to the downloaded .pkg, and hold down the control key while clicking on it. Click "open" in the menu item. The warning dialog should now have an open button, allowing you to run the installer.</li>
				  <li>Windows (10): Run the exe installer. If Windows displays a warning, click "more info" to expose the "Run Anyway" button.</li>
				  <li>Antivirus / Firewall: Some antiviruses or firewalls may block the installer or WWSU Timesheets application since it is unsigned. Add them as trusted applications.</li>
				  </ul>`,
					},
				]);
			}
		}
	});

	/*
        META
    */

	// Meta ticker
	meta.on("metaTick", "renderer", (fullMeta) => {
		// Update station time
		animations.add("meta-time", () => {
			$(".meta-time").html(moment.parseZone(fullMeta.time).format("llll"));
		});
	});

	/*
        DIRECTORS
    */

	directors.on("change", "renderer", (db) => {
		animations.add("update-directors", () => {
			// Remove all director sections
			$(`#sections-directors`).html("");

			// Erase menu html
			$("#nav-directors").html("");
			$("#nav-assistants").html("");

			// Add sections and menu items for each director
			db.get().map((director) => {
				$(`#nav-${director.assistant ? "assistants" : "directors"}`).append(`
                <li class="nav-item">
                    <a
                        href="#"
                        class="nav-link"
                        id="nav-director-${director.ID}"
                        title="Clock in/out ${director.name}"
                    >
                        <i class="nav-icon fas fa-user text-${
													director.present ? `success` : `danger`
												}"></i>
                        <p>
                            ${director.name}
                        </p>
                    </a>
                </li>`);

				$(`#sections-directors`).append(`
                <section id="section-director-${director.ID}">
                    <div class="content-wrapper">
                        <div class="content-header">
                            <div class="container-fluid">
                                <div class="row mb-2">
                                    <div class="col-12">
                                        <h1 class="m-0 text-dark">Director - ${
																					director.name
																				}</h1>
                                    </div>
                                    <!-- /.col -->
                                </div>
                                <!-- /.row -->
                            </div>
                            <!-- /.container-fluid -->
                        </div>

                        <div class="content">

                            <div class="card card-widget widget-user-2">
                                <div class="widget-user-header bg-${
																	director.present ? `success` : `danger`
																}">
                                <div class="row">
                                    <div class="col">
                                    <div class="widget-user-image">${
																			director.avatar && director.avatar !== ``
																				? director.avatar
																				: jdenticon.toSvg(
																						`Director ${director.name}`,
																						64
																				  )
																		}
                                    </div>
                                    </div>
                                    <div class="col">
                                    <!-- /.widget-user-image -->
                                    <h3 class="widget-user-username">${
																			director.present
																				? `Clocked In Since`
																				: `Last Seen`
																		}</h3>
                                    <h5 class="widget-user-desc">
                                        ${moment
																					.tz(
																						director.since,
																						meta.meta.timezone
																							? meta.meta.timezone
																							: moment.tz.guess()
																					)
																					.format("llll")}
                                    </h5>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div class="card card-primary elevation-2">
                                <div class="card-header">
                                    <h3 class="card-title">Actions</h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <button
                                        class="btn btn-app bg-${
																					director.present
																						? `danger`
																						: `success`
																				}"
                                        id="section-director-${
																					director.ID
																				}-clock"
                                        style="height: 6em; font-size: 1em;"
                                        title="Clock ${
																					director.present ? `Out` : `In`
																				}"
                                    >
                                        <i class="fas fa-clock"></i> Clock ${
																					director.present ? `Out` : `In`
																				}
                                    </button>
                                    <button
                                        class="btn btn-app bg-warning"
                                        id="section-director-${
																					director.ID
																				}-schedule"
                                        style="height: 6em; font-size: 1em;"
                                        title="Manage recurring office hours"
                                    >
                                        <i class="fas fa-calendar"></i> Edit Schedule
                                    </button>
                                </div>
                                <!-- /.card-body -->
                            </div>
                        </div>
                    </div>
                </section>
                `);

				navigation.addItem(
					`#nav-director-${director.ID}`,
					`#section-director-${director.ID}`,
					`Director ${director.name} - WWSU Timesheets`,
					`/director/${director.ID}`,
					false
				);

				window.requestAnimationFrame(() => {
					$(`#section-director-${director.ID}-clock`).unbind("click");
					$(`#section-director-${director.ID}-clock`).click(() => {
						((_director) => {
							clockModal.title = `${_director.name} - Clock ${
								_director.present ? `Out` : `In`
							}`;

							clockModal.iziModal("open");

							clockModal.body = ``;

							$(clockModal.body).alpaca({
								schema: {
									title: `Clock ${_director.present ? `Out` : `In`}`,
									type: "object",
									properties: {
										name: {
											type: "string",
											required: true,
										},
										password: {
											type: "string",
											required: true,
											format: "password",
											title: "Password",
										},
										timestamp: {
											title: `Clock-${_director.present ? `Out` : `In`} Time`,
											format: "datetime",
										},
									},
								},
								options: {
									fields: {
										name: {
											type: "hidden",
										},
										timestamp: {
											dateFormat: `YYYY-MM-DDTHH:mm:[00]${moment
												.parseZone(this.meta ? this.meta.meta.time : undefined)
												.format("Z")}`,
											picker: {
												inline: true,
												sideBySide: true,
											},
											helper: `Be aware if you specify a time 30+ minutes from now, this record will be marked unapproved and will need approved by an admin director.`,
										},
									},
									form: {
										buttons: {
											submit: {
												title: `Clock ${_director.present ? `Out` : `In`}`,
												click: (form, e) => {
													form.refreshValidationState(true);
													if (!form.isValid(true)) {
														form.focus();
														return;
													}
													var value = form.getValue();
													directorReq._authorize(
														value.name,
														value.password,
														(body) => {
															if (
																body === 0 ||
																typeof body.token === `undefined`
															) {
																$(document).Toasts("create", {
																	class: "bg-warning",
																	title: "Authorization Error",
																	body:
																		"There was an error authorizing you. Did you type your password in correctly? Please contact the engineer if this is a bug.",
																	delay: 15000,
																});
															} else {
																directorReq._tryRequest(
																	{
																		method: "POST",
																		url: "/timesheet/add",
																		data: {
																			timestamp: moment(
																				value.timestamp
																			).toISOString(true),
																		},
																	},
																	(body2) => {
																		if (body2 === "OK") {
																			$(document).Toasts("create", {
																				class: "bg-success",
																				title: `Clocked ${
																					_director.present ? `Out` : `In`
																				}`,
																				autohide: true,
																				delay: 10000,
																				body: `You successfully clocked ${
																					_director.present ? `Out` : `In`
																				}. ${
																					_director.present
																						? `Have a good day!`
																						: `Welcome!`
																				}`,
																			});
																			clockModal.iziModal("close");
																			navigation.processMenu(`#nav-home`);
																		} else {
																			$(document).Toasts("create", {
																				class: "bg-warning",
																				title: "Timesheet Error",
																				body:
																					"There was an error adding your record. Please contact the engineer.",
																				delay: 10000,
																			});
																		}
																	}
																);
															}
														}
													);
												},
											},
										},
									},
								},
								data: {
									name: _director.name,
									password: ``,
									timestamp: moment().toISOString(true),
								},
							});
						})(director);
					});

					$(`#section-director-${director.ID}-schedule`).unbind("click");
					$(`#section-director-${director.ID}-schedule`).click(() => {
						((_director) => {
							let record = calendar.calendar.find(
								{ director: _director.ID },
								true
							);
							if (record) {
								calendar.showSchedules(record.ID);
							}
						})(director);
					});
				});
			});
		});
	});
});
