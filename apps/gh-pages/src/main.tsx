import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);

// const fileName = 'serviceWorker.js';
// import(`/${fileName}`)
// 	.then(() => {
// 		console.log(`successfully loaded file: ${fileName}`);
// 		if ('serviceWorker' in navigator) {
// 			navigator.serviceWorker
// 				.register('/serviceWorker.js', { scope: '/' })
// 				.then(function () {
// 					console.log('Service Worker Registered');
// 				});
// 		}
// 	})
// 	.catch((error: unknown) => {
// 		console.log(`successfully loaded file: ${fileName}`);
// 		console.error(error);
// 	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
// import('../../nest-api/serviceWorkerRegistration').then((swr) => swr.register());
