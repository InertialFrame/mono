export function* gridElements<T>(grid: readonly T[][]) {
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			yield { grid, cell: grid[x][y], x, y };
		}
	}
}

export function forEach<T>(
	grid: readonly T[][],
	fn: (x: number, y: number) => void,
	flip = true
): void {
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			flip ? fn(y, x) : fn(x, y);
		}
	}
}

export const safeGet = <T>(arr: T[][], x: number, y: number): T | null => {
	if (arr.length === 0) return null;
	if (y < 0 || y >= arr.length || x < 0 || x >= arr[0].length) return null;
	return arr[y][x];
};
