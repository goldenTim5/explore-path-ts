import { disjktraAlgorithm } from "../components/algorithms/dijkstra";
import { createMockGrid } from "../utils/createMockGrid";

describe("disjktraAlgorithm", () => {
	it("should find the shortest path in a simple grid", () => {
		const grid = createMockGrid(3, 3);
		grid[0][0].status = "start";
		grid[2][2].status = "target";

		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.shortestPath.length).toBeGreaterThan(0);
		expect(result.visitedNodes).toContain(startNode);
		expect(result.shortestPath[result.shortestPath.length - 1].status).toBe(
			"start"
		);
	});

	it("should return an empty path if there is no target", () => {
		const grid = createMockGrid(3, 3);
		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.visitedNodes).toContain(startNode);
		expect(result.shortestPath.length).toBe(0);
	});
});

describe("disjktraAlgorithm with walls", () => {
	it("should avoid walls and find a path", () => {
		const grid = createMockGrid(3, 3);
		grid[0][0].status = "start";
		grid[2][2].status = "target";

		// adding walls
		grid[1][0].status = "wall";
		grid[1][1].status = "wall";

		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.shortestPath.length).toBeGreaterThan(0);
		expect(result.shortestPath[result.shortestPath.length - 1].status).toBe(
			"start"
		);
		// ensure the path does not contain the wall nodes
		expect(result.shortestPath.some((node) => node.status === "wall")).toBe(
			false
		);
	});

	it.skip("should return the correct shortest path", () => {
		const grid = createMockGrid(3, 3);
		grid[0][0].status = "start";
		grid[2][2].status = "target";

		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);

		const expectedPath = [
			grid[0][0],
			grid[0][1],
			grid[0][2],
			grid[1][2],
			grid[2][2],
		];
		expect(result.shortestPath).toEqual(expectedPath);
	});

	it("should return an empty path if surrounded by walls", () => {
		const grid = createMockGrid(3, 3);
		grid[0][0].status = "start";
		grid[2][2].status = "target";

		// surrounding the start node with walls
		grid[0][1].status = "wall";
		grid[1][0].status = "wall";
		grid[1][1].status = "wall";

		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.shortestPath.length).toBe(0);
	});
});
