import { Box } from '@material-ui/core';
import Editor from './Editor/Editor';

export function ExperimentalPage() {
	return (
		<Box style={{ height: '100%', display: 'grid' }}>
			{/*<GameOfLife />*/}
			<Editor />
		</Box>
	);
}
