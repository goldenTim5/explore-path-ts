import { NodeState } from "../components/Node/Node";

class Queue {
	items: NodeState[];

	constructor(startingItem: NodeState | null = null) {
		this.items = [];
		if (startingItem !== null) {
			this.enqueue(startingItem);
		}
	}

	enqueue(node: NodeState): void {
		this.items.push(node);
	}

	dequeue(): NodeState | undefined {
		return this.items.shift();
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	includes(node: NodeState): boolean {
		return this.items.includes(node);
	}
}

export default Queue;
