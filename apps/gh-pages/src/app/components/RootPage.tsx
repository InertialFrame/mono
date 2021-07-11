import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function RootPage() {
	useEffect(() => {
		fetch('http://localhost:3333/api', { method: 'get' })
			.then((result) => {
				console.log('Result:', result);
				return result;
			})
			.then((r) => r.json())
			.then(console.log)
			.catch(console.error);
	});
	return (
		<div>
			This is the generated root route. <Link to="/weather">Weather</Link>
		</div>
	);
}
