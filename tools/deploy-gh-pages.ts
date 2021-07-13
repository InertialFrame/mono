import * as ghpages from 'gh-pages';
import * as fs from 'fs';

fs.writeFileSync('./dist/apps/gh-pages/CNAME', 'mono.inertialframe.ca');

fs.copyFileSync(
	'./apps/gh-pages/manifest.json',
	'./dist/apps/gh-pages/manifest.json'
);

fs.copyFileSync(
	'./apps/gh-pages/serviceWorker.js',
	'./dist/apps/gh-pages/serviceWorker.js'
);

fs.copyFileSync(
	'./apps/gh-pages/script.js',
	'./dist/apps/gh-pages/script.js'
);

ghpages.publish(
	'./dist/apps/gh-pages',
	// { push: false },
	(err) => err && console.error('Error publishing:', err)
);
