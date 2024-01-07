import { GridState } from "../components/Grid/Grid";

export function createMockGrid(rows: number, cols: number): GridState {
	const grid: GridState = [];
	for (let x = 0; x < rows; x++) {
		grid[x] = [];
		for (let y = 0; y < cols; y++) {
			grid[x][y] = {
				position: { x, y },
				status: "unvisited",
				parentNode: null,
			};
		}
	}
	return grid;
}
