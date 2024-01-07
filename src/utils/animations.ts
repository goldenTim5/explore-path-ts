import gsap from "gsap";

const visitedAnimationTime = 5;
const shortPathAnimationTime = 20; // this number has to be bigger than the above

interface NodePosition {
	x: number;
	y: number;
}

export interface NodeState {
	position: NodePosition;
	status: string;
	parentNode: NodeState | null;
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
				animateNode(nodeId, "node visited");
			}, visitedAnimationTime * index);
		}
	});
}

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
