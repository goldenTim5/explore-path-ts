import gsap from "gsap";
import { NodeState } from "../components/Node/Node";

const visitedAnimationTime = 10;
const shortPathAnimationTime = 50; // this number has to be bigger than the above
const keepVisitedAnimation = true;

function animateNode(nodeId: string, className: string): void {
	// add animation class to each node
	const nodeRef = document.getElementById(nodeId);
	if (nodeRef) {
		gsap.to(nodeRef, {
			onComplete: () => {
				nodeRef.className = className;
			},
		});
	}
}

export function animatePathfiding(
	shortestPath: NodeState[],
	visitedNodes: NodeState[]
): void {
	visitedNodes.forEach((node, index) => {
		if (node.status === "target") {
			setTimeout(() => {
				shortestPathAnimation(shortestPath);
			}, visitedAnimationTime * index);
			return;
		}
		if (node.status === "unvisited") {
			setTimeout(() => {
				const nodeId = `node-${node.position.x}-${node.position.y}`;
				animateNode(
					nodeId,
					`node ${keepVisitedAnimation ? "keep-visited" : "visited"}`
				);
			}, visitedAnimationTime * index);
		}
	});
}

function shortestPathAnimation(shortestPath: NodeState[]): void {
	// animation for the shortest path
	shortestPath.forEach((node, index) => {
		if (node.status === "unvisited") {
			setTimeout(() => {
				const nodeId = `node-${node.position.x}-${node.position.y}`;
				animateNode(nodeId, "node short-path");
			}, shortPathAnimationTime * index);
		}
	});
}
