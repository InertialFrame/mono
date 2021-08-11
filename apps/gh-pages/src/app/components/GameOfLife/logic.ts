import lodash from 'lodash';
import { forEach, safeGet } from './util';
import { Game } from './runner';

export type Grid = boolean[][];

export type CountLivingNeighbors = (grid: Grid) => (x: number, y: number) => number;

export class Vanilla {
	static countLivingNbrs =
		(cells: Grid) =>
		(x: number, y: number): number =>
			[
				safeGet(cells, y - 1, x),
				safeGet(cells, y + 1, x),
				safeGet(cells, y, x - 1),
				safeGet(cells, y, x + 1),
			]
				.map(Boolean)
				.reduce<number>((acc: number, alive: boolean): number => acc + (alive ? 1 : 0), 0);
}

export class GOL implements Game {
	verbose = false;
	constructor(private countLivingNbrs: CountLivingNeighbors = Vanilla.countLivingNbrs) {}

	// 1. Any live cell with two or three live neighbours survives.
	// 2. Any dead cell with three live neighbours becomes a live cell.
	// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
	tick = (previousCells: Grid) => {
		const cells = lodash.cloneDeep(previousCells);
		forEach(previousCells, (x, y) => {
			const cellAlive = safeGet(previousCells, x, y);
			const livingNbrCount = this.countLivingNbrs(previousCells)(x, y);

			const staysAlive = cellAlive && (livingNbrCount === 3 || livingNbrCount === 2);
			const broughtToLife = !cellAlive && livingNbrCount === 3;

			if (this.verbose) {
				if (cellAlive && !staysAlive) console.log(`${x} ${y} died!`);
				if (!cellAlive && broughtToLife) console.log(`${x} ${y} born!`);
			}

			cells[x][y] = staysAlive || broughtToLife;
		});
		return cells;
	};
}
