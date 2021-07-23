export const setupNotifications = () =>
	Notification.requestPermission().then((result) => {
		if (result === 'granted') {
			randomNotification();
		}
	});

function randomNotification() {
	const nTitle = `Test notification title`;
	const nBody = `Test notification body`;
	const nImg = `assets/weather-128.png`;
	const options = {
		body: nBody,
		icon: nImg,
	};
	setTimeout(() => new Notification(nTitle, options), 4000);
}
