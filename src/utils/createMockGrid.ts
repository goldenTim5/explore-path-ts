import { GridState } from "../components/Grid/Grid";

export function createMockGridEmpty(
	rows: number = 3,
	cols: number = 3
): GridState {
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

export function createMockGridWithStartTarget() {
	/**
	 * creates a 3x3 grid and set the start and target
	 * S = start, T = target, 0 = empty
	 * [S, 0, 0]
	 * [0, 0, 0]
	 * [0, 0, T]
	 *
	 * Expected path:
	 * [2, 2] [2, 1] [2, 0] [1, 0] [0, 0]
	 */
	const grid: GridState = createMockGridEmpty();
	// add start and target
	grid[0][0].status = "start";
	grid[2][2].status = "target";

	const startNode = grid[0][0];

	return { grid, startNode };
}

export function createMockGridWithWalls() {
	/**
	 * creates a 3x3 grid with walls
	 * S = start, T = target, W = walls, 0 = empty
	 * [S, W, 0]
	 * [0, W, 0]
	 * [0, 0, T]
	 *
	 * Expected path:
	 * [2, 2] [1, 2] [0, 2] [0, 1] [0, 0]
	 */
	const { grid, startNode } = createMockGridWithStartTarget();

	// add walls
	grid[1][0].status = "wall";
	grid[1][1].status = "wall";

	return { grid, startNode };
}
