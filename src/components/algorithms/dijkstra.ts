import { GridState, NodeState } from "../Grid/Grid";

export interface DijkstraReturn {
	shortestPath: NodeState[];
	visitedNodes: NodeState[];
}

export function disjktraAlgorithm(
	grid: GridState,
	startNode: NodeState
): DijkstraReturn {
	// define examine and visited arrays
	const examine: NodeState[] = [startNode];
	const visitedNodes: NodeState[] = [];
	const shortestPath: NodeState[] = [];
	while (examine.length > 0) {
		// set current node that is being examined and add it to the visited array
		// use the "!" to tell typescript that current node can never be undefined
		// as per while loop condition
		let currentNode: NodeState | null = examine.shift()!;
		if (currentNode.status === "wall") continue;
		visitedNodes.push(currentNode);

		// it found the target node
		// returns the shortest path
		if (currentNode.status === "target") {
			while (currentNode !== null) {
				shortestPath.push(currentNode);
				currentNode = currentNode.parentNode;
			}
			break;
		}

		// find the adjacent nodes to the current node
		const adjecentNodes: NodeState[] = getAdjecentNodes(grid, currentNode);
		for (const adjecentNode of adjecentNodes) {
			if (
				!examine.includes(adjecentNode) &&
				!visitedNodes.includes(adjecentNode)
			) {
				adjecentNode.parentNode = currentNode;
				examine.push(adjecentNode);
			}
		}
	}
	return { shortestPath, visitedNodes };
}

function getAdjecentNodes(grid: GridState, node: NodeState): NodeState[] {
	// debugger;
	const adjecentNodes: NodeState[] = [];
	const { x, y } = node.position;

	// check all adjacent nodes, up | down | left | right
	if (x > 0) adjecentNodes.push(grid[x - 1][y]);
	if (x < grid.length - 1) adjecentNodes.push(grid[x + 1][y]);
	if (y > 0) adjecentNodes.push(grid[x][y - 1]);
	if (y < grid[0].length - 1) adjecentNodes.push(grid[x][y + 1]);

	return adjecentNodes;
}
