import { Route, HashRouter, Switch, useHistory } from 'react-router-dom';
import { WeatherPage } from './components/WeatherPage';
import { RootPage } from './components/RootPage';
import CommandDialog from './components/CommandDialog';

export function App() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/" exact component={RootPage} />
				<Route path="/weather" exact component={WeatherPage} />
			</Switch>
			<AppCommandDialog />
		</HashRouter>
	);
}

function AppCommandDialog() {
	const history = useHistory();
	return (
		<CommandDialog
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

export default App;
