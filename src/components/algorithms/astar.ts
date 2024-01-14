import PriorityQueue from "../../dataStructures/priorityQueue";
import { getAdjecentNodes } from "../../utils/getAdjacentNodes";
import {
	getEuclideanDistance,
	getManhattanDistance,
} from "../../utils/getDistance";
import { GridState } from "../Grid/Grid";
import { NodeState } from "../Node/Node";

export interface AStarReturn {
	shortestPath: NodeState[];
	visitedNodes: NodeState[];
}

// A star is very similar to dijkstra
export function aStarAlgorithm(
	grid: GridState,
	startNode: NodeState,
	targetNode: NodeState,
	distance: string
): AStarReturn {
	// determine the distance used
	const getDistance =
		distance === "euclidean" ? getEuclideanDistance : getManhattanDistance;

	startNode.gCost = 0;
	startNode.fCost = getDistance(startNode, targetNode);

	// define examine and visited arrays
	const examine = new PriorityQueue(startNode);
	const visitedNodes = new Set<NodeState>();
	const shortestPath: NodeState[] = [];
	// debugger;
	while (!examine.isEmpty()) {
		// set current node that is being examined and add it to the visited array
		// use the "!" to tell typescript that current node can never be undefined
		// as per while loop condition
		let currentNode: NodeState | null = examine.dequeue()!;
		if (currentNode.status === "wall") continue;
		visitedNodes.add(currentNode);

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
		const adjacentNodes: NodeState[] = getAdjecentNodes(grid, currentNode);
		for (const adjacentNode of adjacentNodes) {
			const adjacentGCost = currentNode.gCost + 1;
			if (adjacentGCost < adjacentNode.gCost) {
				// set the adjacent node parent to the current node
				adjacentNode.parentNode = currentNode;
				adjacentNode.gCost = adjacentGCost;

				// get the fCost, distance between the adjacent node and the target node
				adjacentNode.fCost =
					adjacentGCost + getDistance(adjacentNode, targetNode);

				if (!visitedNodes.has(adjacentNode)) {
					examine.enqueue(adjacentNode);
				}
			}
		}
	}
	return { shortestPath, visitedNodes: [...visitedNodes] };
}
