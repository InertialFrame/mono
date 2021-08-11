import { Route, HashRouter, Switch } from 'react-router-dom';
import { WeatherPage } from './components/WeatherPage';
import { RootPage } from './components/RootPage';
import CommandDialog from './components/CommandDialog';
import { ExperimentalPage } from './components/ExperimentalPage';
import { Routes } from './routes';

export function App() {
	return (
		<HashRouter>
			<Switch>
				<Route path={Routes.Root} exact component={RootPage} />
				<Route path={Routes.Weather} exact component={WeatherPage} />
				<Route path={Routes.GameOfLife} exact component={ExperimentalPage} />
			</Switch>
			<CommandDialog />
		</HashRouter>
	);
}

export default App;
