import * as ghpages from 'gh-pages';
import * as fs from 'fs';

fs.writeFile(
	'./dist/apps/gh-pages/CNAME',
	'mono.inertialframe.ca',
	function (err) {
		if (err) return console.error('Error writing CNAME:', err);
		ghpages.publish(
			'./dist/apps/gh-pages',
			(err) => err && console.error('Error publishing:', err)
		);
	}
);
