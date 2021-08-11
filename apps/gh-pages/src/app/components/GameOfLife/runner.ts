import { Grid } from './logic';

export interface Game {
	tick(cells: Grid): Grid;
}

export interface Display {
	draw(cells: Grid): void;
}

export class GOLRunner<D extends Display, G extends Game> {
	timeout = 16;

	constructor(public state: Grid, private display: D, private game: G) {
		display.draw(state);
	}

	run = () => {
		const handle = window.setInterval(() => {
			const newState = this.game.tick(this.state);
			this.display.draw(newState);
			if (!newState) return window.clearInterval(handle);
			this.state = newState;
		}, this.timeout);
	};

	tick = () => {
		const { display, game } = this;
		this.state = game.tick(this.state);
		display.draw(this.state);
		return this.state;
	};
}
