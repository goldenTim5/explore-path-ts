import Queue from "../../dataStructures/queue";
import { getAdjecentNodes } from "../../utils/getAdjacentNodes";
import { GridState } from "../Grid/Grid";
import { NodeState } from "../Node/Node";

export interface DijkstraReturn {
	shortestPath: NodeState[];
	visitedNodes: NodeState[];
}

export function disjktraAlgorithm(
	grid: GridState,
	startNode: NodeState
): DijkstraReturn {
	const examine = new Queue(startNode);
	const visitedNodes = new Set<NodeState>();
	const shortestPath: NodeState[] = [];

	while (!examine.isEmpty()) {
		// set current node that is being examined and add it to the visited array
		// use the "!" to tell typescript that current node can never be undefined
		// as per while loop condition
		let currentNode: NodeState | null = examine.dequeue()!;
		if (currentNode.status === "wall") continue;
		visitedNodes.add(currentNode);

		// it found the target node
		// returns the shortest path
		if (currentNode.status === "target") {
			while (currentNode !== null) {
				shortestPath.unshift(currentNode);
				currentNode = currentNode.parentNode;
			}
			break;
		}

		// find the adjacent nodes to the current node
		const adjecentNodes: NodeState[] = getAdjecentNodes(grid, currentNode);
		for (const adjecentNode of adjecentNodes) {
			if (!examine.includes(adjecentNode) && !visitedNodes.has(adjecentNode)) {
				adjecentNode.parentNode = currentNode;
				examine.enqueue(adjecentNode);
			}
		}
	}
	return { shortestPath, visitedNodes: [...visitedNodes] };
}
