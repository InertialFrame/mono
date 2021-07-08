import { Link } from 'react-router-dom';

export function RootPage() {
	return (
		<div>
			This is the generated root route. <Link to="/weather">Weather</Link>
		</div>
	);
}
