import { GridState, NodeState } from "../Grid/Grid";

export interface AStarReturn {
	shortestPath: NodeState[];
	visitedNodes: NodeState[];
}

// A star is very similar to dijkstra
export function aStarAlgorithm(
	grid: GridState,
	startNode: NodeState,
	targetNode: NodeState
): AStarReturn {
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

		// if found the target node
		// returns the shortest path
		if (currentNode.status === "target") {
			while (currentNode !== null) {
				shortestPath.unshift(currentNode);
				currentNode = currentNode.parentNode;
			}
			break;
		}

		// find the adjacent nodes to the current node
		const adjacentNodes: NodeState[] = getAdjacentNodes(grid, currentNode);
		for (const adjacentNode of adjacentNodes) {
			if (
				!examine.includes(adjacentNode) &&
				!visitedNodes.includes(adjacentNode)
			) {
				// set the adjacent node parent to the current node
				adjacentNode.parentNode = currentNode;

				// get the distance between the adjacent node and the target node
				const adjacentNodeDistance = getNodesDistance(adjacentNode, targetNode);

				// insertion sort algorithm to insert the adjacent node in the correct place in the examine array
				// so that A* can visit the nodes that are closer to the target node first
				let index = 0;
				for (const examineNode of examine) {
					// get the distance between the examine node and the target node
					const examineNodeDistance = getNodesDistance(examineNode, targetNode);

					if (adjacentNodeDistance <= examineNodeDistance) break;
					index++;
				}

				// if the index is the same as the length of the examine array
				// then insert at the end
				// otherwise, insert at the corresponding index position
				if (index == examine.length) {
					examine.push(adjacentNode);
				} else {
					examine.splice(index, 0, adjacentNode);
				}
			}
		}
	}
	return { shortestPath, visitedNodes };
}

function getNodesDistance(
	currentNode: NodeState,
	targetNode: NodeState
): number {
	return Math.sqrt(
		Math.pow(targetNode.position.x - currentNode.position.x, 2) +
			Math.pow(targetNode.position.y - currentNode.position.y, 2)
	);
}

function getAdjacentNodes(grid: GridState, node: NodeState): NodeState[] {
	// debugger;
	const adjacentNodes: NodeState[] = [];
	const { x, y } = node.position;

	// check all adjacent nodes, up | down | left | right
	if (x > 0) adjacentNodes.push(grid[x - 1][y]);
	if (x < grid.length - 1) adjacentNodes.push(grid[x + 1][y]);
	if (y > 0) adjacentNodes.push(grid[x][y - 1]);
	if (y < grid[0].length - 1) adjacentNodes.push(grid[x][y + 1]);

	return adjacentNodes;
}
