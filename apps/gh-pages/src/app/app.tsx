import { Route, HashRouter, Switch } from 'react-router-dom';
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
			<CommandDialog />
		</HashRouter>
	);
}

export default App;
