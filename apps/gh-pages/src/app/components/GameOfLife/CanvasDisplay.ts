import { Display } from './runner';
import { forEach } from './util';

export class CanvasDisplay implements Display {
	displayCoordinates = false;

	constructor(
		private canvas: HTMLCanvasElement,
		private cellSize: number,
		private cellColor: string = 'blue',
		private backgroundColor: string = 'lightgray'
	) {}

	draw(cells: readonly boolean[][]) {
		const g = this.canvas.getContext('2d');
		if (!g) throw Error('Cannot draw cells; 2D Graphics context not defined');

		const { cellSize, cellColor, backgroundColor, displayCoordinates } = this;
		g.fillStyle = backgroundColor;
		g.fillRect(0, 0, cellSize * cells.length, cellSize * cells[0].length);
		forEach(
			cells,
			(x: number, y: number) => {
				const alive = cells[x][y];
				if (alive) {
					g.fillStyle = cellColor;
					g.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				} else if (displayCoordinates) {
					g.fillStyle = 'black';
					g.fillText(`(${x}, ${y})`, x * cellSize, (y + 0.5) * cellSize);
				}
			},
			false
		);

		return true;
	}
}
