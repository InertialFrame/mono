(window.webpackJsonp = window.webpackJsonp || []).push([
	[3],
	{
		'2Na+': function (e, n, o) {
			'use strict';
			o.r(n),
				o.d(n, 'register', function () {
					return t;
				}),
				o.d(n, 'unregister', function () {
					return i;
				});
			const r = Boolean(
				'localhost' === window.location.hostname ||
					'[::1]' === window.location.hostname ||
					window.location.hostname.match(
						/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
					)
			);
			function t(e) {
				if ('serviceWorker' in navigator) {
					const n =
							Object({
								NODE_ENV: 'production',
								NX_CLI_SET: 'true',
								NX_FORWARD_OUTPUT: 'true',
								NX_INVOKED_BY_RUNNER: 'true',
								NX_TASK_HASH:
									'809b7a467d229a46a1bbfca5de0c2e37c2dd57534c9a78e3a93d0693b186fe64',
								NX_TERMINAL_OUTPUT_PATH:
									'C:\\Users\\max\\Projects\\inertial-frame\\node_modules\\.cache\\nx\\terminalOutputs\\809b7a467d229a46a1bbfca5de0c2e37c2dd57534c9a78e3a93d0693b186fe64',
								NX_WORKSPACE_ROOT: 'C:\\Users\\max\\Projects\\inertial-frame',
							}).PUBLIC_URL || 'https://mono.inertialframe.ca',
						o = new URL(n, window.location.href);
					if (
						(console.log({ url: n, href: window.location.href, publicUrl: o }),
						o.origin !== window.location.origin)
					)
						return;
					window.addEventListener('load', () => {
						const n =
							Object({
								NODE_ENV: 'production',
								NX_CLI_SET: 'true',
								NX_FORWARD_OUTPUT: 'true',
								NX_INVOKED_BY_RUNNER: 'true',
								NX_TASK_HASH:
									'809b7a467d229a46a1bbfca5de0c2e37c2dd57534c9a78e3a93d0693b186fe64',
								NX_TERMINAL_OUTPUT_PATH:
									'C:\\Users\\max\\Projects\\inertial-frame\\node_modules\\.cache\\nx\\terminalOutputs\\809b7a467d229a46a1bbfca5de0c2e37c2dd57534c9a78e3a93d0693b186fe64',
								NX_WORKSPACE_ROOT: 'C:\\Users\\max\\Projects\\inertial-frame',
							}).PUBLIC_URL + '/service-worker.ts';
						r
							? ((function (e, n) {
									fetch(e, { headers: { 'Service-Worker': 'script' } })
										.then((o) => {
											const r = o.headers.get('content-type');
											404 === o.status ||
											(null != r && -1 === r.indexOf('javascript'))
												? navigator.serviceWorker.ready.then((e) => {
														e.unregister().then(() => {
															window.location.reload();
														});
												  })
												: a(e, n);
										})
										.catch(() => {
											console.log(
												'No internet connection found. App is running in offline mode.'
											);
										});
							  })(n, e),
							  navigator.serviceWorker.ready.then(() => {
									console.log(
										'This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA'
									);
							  }))
							: a(n, e);
					});
				}
			}
			function a(e, n) {
				navigator.serviceWorker
					.register(e)
					.then((e) => {
						e.onupdatefound = () => {
							const o = e.installing;
							null != o &&
								(o.onstatechange = () => {
									'installed' === o.state &&
										(navigator.serviceWorker.controller
											? (console.log(
													'New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.'
											  ),
											  n && n.onUpdate && n.onUpdate(e))
											: (console.log('Content is cached for offline use.'),
											  n && n.onSuccess && n.onSuccess(e)));
								});
						};
					})
					.catch((e) => {
						console.error('Error during service worker registration:', e);
					});
			}
			function i() {
				'serviceWorker' in navigator &&
					navigator.serviceWorker.ready
						.then((e) => {
							e.unregister();
						})
						.catch((e) => {
							console.error(e.message);
						});
			}
		},
	},
]);
