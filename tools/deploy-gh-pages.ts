import * as ghpages from 'gh-pages';
import * as fs from 'fs';

fs.writeFileSync('./dist/apps/gh-pages/CNAME', 'mono.inertialframe.ca');

fs.copyFileSync(
	'./apps/gh-pages/manifest.json',
	'./dist/apps/gh-pages/manifest.json'
);

ghpages.publish(
	'./dist/apps/gh-pages',
	(err) => err && console.error('Error publishing:', err)
);
