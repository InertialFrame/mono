import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GOLRunner } from './runner';
import { CanvasDisplay } from './CanvasDisplay';
import { GOL, Vanilla } from './logic';
import { forEach, safeGet } from './util';

const CELL_SIZE = 15;

const cells = [
	[true, false],
	[false, true],
];

const random = true;
const timesToDouble = 5;

function newGOLRunner(canvas: HTMLCanvasElement) {
	let cells2 = cells;
	for (let i = 0; i < timesToDouble; i++) {
		cells2 = cells2.map((row) => [...row, ...row]);
		cells2 = [...cells2, ...cells2];
	}
	if (random) {
		cells2 = cells2.map((row) => row.map(() => Math.random() < 0.5));
	}

	const display = new CanvasDisplay(canvas, CELL_SIZE);
	const game = new GOL();
	const runner = new GOLRunner(cells2, display, game);
	display.draw(runner.state);
	return runner;
}

export function GameOfLife() {
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [runner, setRunner] = useState<GOLRunner<CanvasDisplay, GOL> | null>(null);

	useEffect(() => {
		if (canvas === null || runner !== null) return;
		setRunner(newGOLRunner(canvas));
	}, [runner, canvas]);

	return (
		<Box
			style={{
				backgroundColor: '#f0dbff',
				display: 'grid',
				flex: 1,
				justifyContent: 'center',
				justifyItems: 'center',
			}}
		>
			<Typography>Game Of Life</Typography>
			<Button onClick={runner?.tick}>Tick</Button>
			<Button onClick={() => runner?.run()}>Run</Button>
			<Button onClick={() => canvas && setRunner(newGOLRunner(canvas))}>Reset</Button>
			<Button
				onClick={() => {
					if (!runner) return;
					forEach(
						runner.state,
						(x, y) => {
							if (safeGet(runner.state, x, y)) {
								const livingNbrs = Vanilla.countLivingNbrs(runner.state)(x, y);
								console.log(`(${x},${y}) has ${livingNbrs} living neighbors`);
							}
						},
						true
					);
				}}
			>
				Nbrs
			</Button>
			<canvas
				ref={setCanvas}
				style={{ flex: 1, backgroundColor: 'lightgray' }}
				width={CELL_SIZE * (runner ? runner.state[0].length : 1)}
				height={CELL_SIZE * (runner ? runner.state.length : 1)}
			/>
		</Box>
	);
}
