import { NodeState } from "../components/Node/Node";

export function getEuclideanDistance(
	currentNode: NodeState,
	targetNode: NodeState
): number {
	return Math.sqrt(
		Math.pow(targetNode.position.x - currentNode.position.x, 2) +
			Math.pow(targetNode.position.y - currentNode.position.y, 2)
	);
}

export function getManhattanDistance(
	currentNode: NodeState,
	targetNode: NodeState
): number {
	return (
		Math.abs(targetNode.position.x - currentNode.position.x) +
		Math.abs(targetNode.position.y - currentNode.position.y)
	);
}
