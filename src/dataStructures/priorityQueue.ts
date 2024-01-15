import { NodeState } from "../components/Node/Node";

class PriorityQueue {
	items: NodeState[];

	constructor(startingItem: NodeState | null = null) {
		this.items = [];
		if (startingItem !== null) {
			this.enqueue(startingItem);
		}
	}

	enqueue(node: NodeState): void {
		this.items.push(node);
		this.items.sort((a, b) => a.fCost - b.fCost);
	}

	dequeue(): NodeState | undefined {
		return this.items.shift();
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}
}

export default PriorityQueue;
