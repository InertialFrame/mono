import { Link } from 'react-router-dom';
import { setupNotifications } from '../notifications';
import { Button } from '@material-ui/core';

export function RootPage() {
	return (
		<div>
			This is the generated root route. <Link to="/weather">Weather</Link>
			<Button onClick={() => setupNotifications()}>Notify</Button>
		</div>
	);
}
