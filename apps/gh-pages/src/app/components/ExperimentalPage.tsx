import { Box } from '@material-ui/core';
import { GameOfLife } from './GameOfLife/GameOfLife';

export function ExperimentalPage() {
	return (
		<Box style={{ height: '100%', display: 'grid' }}>
			<GameOfLife />
		</Box>
	);
}
