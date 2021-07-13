export default class Main {
	constructor() {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/serviceWorker2.js', { scope: '/' })
				.then(function () {
					console.log('Service Worker Registered');
				});
		}
	}
}

new Main();
