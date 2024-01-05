import { GridState, NodeState } from "../Grid/Grid";

export interface DijkstraReturn {
	shortestPath: NodeState[];
	visited: NodeState[];
}

export function disjktraAlgorithm(
	grid: GridState,
	startNode: NodeState
): DijkstraReturn | never[] {
	// define examine and visited arrays
	const examine: NodeState[] = [startNode];
	const visited: NodeState[] = [];
	while (examine.length > 0) {
		// set current node that is being examined and add it to the visited array
		// use the "!" to tell typescript that current node can never be undefined
		// as per while loop condition
		let currentNode: NodeState | null = examine.pop()!;
		visited.push(currentNode);
		currentNode.status = "visited";

		if (currentNode.status === "wall") continue;

		// it found the target node
		// returns the shortest path
		if (currentNode.status === "target") {
			const shortestPath: NodeState[] = [];
			while (currentNode !== null) {
				shortestPath.push(currentNode);
				currentNode = currentNode.parentNode;
			}
			shortestPath.reverse();
			return { shortestPath, visited };
		}

		// continue
		const adjecentNodes: NodeState[] = getAdjecentNodes(grid, currentNode);
		for (const adjecentNode of adjecentNodes) {
			if (
				!examine.includes(adjecentNode) &&
				adjecentNode.status !== "visited"
			) {
				adjecentNode.parentNode = currentNode;
				examine.push(adjecentNode);
			}
		}
	}
	return [];
}

function getAdjecentNodes(grid: GridState, node: NodeState): NodeState[] {
	const adjecentNodes: NodeState[] = [];
	const [row, col] = node.position;

	// check all adjacent nodes, up | down | left | right
	if (row > 0) adjecentNodes.push(grid[row - 1][col]);
	if (row < grid.length - 1) adjecentNodes.push(grid[row + 1][col]);
	if (col > 0) adjecentNodes.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) adjecentNodes.push(grid[row][col + 1]);

	return adjecentNodes;
}
