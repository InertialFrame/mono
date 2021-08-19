import { Link } from 'react-router-dom';
import { GoogleAuthComponent } from './GoogleOAuth/GoogleAuth';

export function RootPage() {
	return (
		<div>
			This is the generated root route. <Link to="/weather">Weather</Link>
			<GoogleAuthComponent />
		</div>
	);
}
