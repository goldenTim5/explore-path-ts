import { disjktraAlgorithm } from "../components/algorithms/dijkstra";
import { NodeState } from "../components/Grid/Grid";
import {
	createMockGridEmpty,
	createMockGridWithStartTarget,
	createMockGridWithWalls,
} from "../utils/createMockGrid";

describe("Disjktra Algorithm Tests", () => {
	it("should return an empty path if there is no target", () => {
		const grid = createMockGridEmpty();
		grid[0][0].status = "start";
		const startNode = grid[0][0];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.visitedNodes).toContain(startNode);
		expect(result.shortestPath.length).toBe(0);
	});

	it("should avoid walls and find return the shortest path", () => {
		const { grid, startNode } = createMockGridWithWalls();

		const result = disjktraAlgorithm(grid, startNode);

		const expectedPath = [
			grid[2][2],
			grid[1][2],
			grid[0][2],
			grid[0][1],
			grid[0][0],
		];

		expect(result.shortestPath.length).toBeGreaterThan(0);
		expect(result.shortestPath[result.shortestPath.length - 1].status).toBe(
			"start"
		);
		// ensure the path does not contain the wall nodes
		expect(result.shortestPath.some((node) => node.status === "wall")).toBe(
			false
		);
		expect(result.shortestPath).toEqual(expectedPath);
	});

	it("should return the correct shortest path on a grid with no walls", () => {
		const { grid, startNode } = createMockGridWithStartTarget();

		const result = disjktraAlgorithm(grid, startNode);

		const expectedPath = [
			grid[2][2],
			grid[2][1],
			grid[2][0],
			grid[1][0],
			grid[0][0],
		];

		expect(result.shortestPath.length).toBeGreaterThan(0);
		expect(result.visitedNodes).toContain(startNode);
		expect(result.shortestPath).toEqual(expectedPath);
		expect(result.shortestPath[result.shortestPath.length - 1].status).toBe(
			"start"
		);
	});

	it("should return an empty path if starting node is surrounded by walls", () => {
		const { grid, startNode } = createMockGridWithStartTarget();

		// surrounding the start node with walls
		grid[0][1].status = "wall";
		grid[1][0].status = "wall";
		grid[1][1].status = "wall";

		const expectedPath: NodeState[] = [];

		const result = disjktraAlgorithm(grid, startNode);
		expect(result.shortestPath.length).toBe(0);
		expect(result.shortestPath).toEqual(expectedPath);
	});
});
