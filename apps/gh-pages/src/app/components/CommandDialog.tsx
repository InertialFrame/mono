import { CommandDialog as IFCommandDialog } from '@inertial-frame/command-dialog';
import { useHistory } from 'react-router-dom';

export default function CommandDialog() {
	const history = useHistory();
	return (
		<IFCommandDialog
			commands={{
				ping: () => console.log('pong'),
				goto: {
					weather: () => history.push('/weather'),
					root: () => history.push('/'),
				},
			}}
		/>
	);
}
