import gsap from "gsap";
import { useEffect, useRef } from "react";
import "./node.css";

export interface NodePosition {
	x: number;
	y: number;
}

export interface NodeState {
	position: NodePosition;
	status: string;
	parentNode: NodeState | null;
	gCost: number;
	fCost: number;
}

interface NodeProps {
	status: string;
	row: number;
	col: number;
	onMouseDown: (row: number, col: number) => void;
	onMouseEnter: (row: number, col: number) => void;
	onMouseUp: () => void;
}

function Node({
	status,
	row,
	col,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
}: NodeProps) {
	const nodeRef = useRef(null);
	const nodeId = `node-${row}-${col}`;

	useEffect(() => {
		// apply gsap styles if the node become a wall
		if (status === "wall") {
			gsap.to(nodeRef.current, {
				scale: 1.2,
				duration: 0.1,
				ease: "ease-out",
				backgroundColor: "var(--clr-wall-node)",
				onComplete: () => {
					gsap.to(nodeRef.current, {
						scale: 1,
						duration: 0.1,
						backgroundColor: "var(--clr-wall-node)",
					});
				},
			});
		} else if (status === "unvisited") {
			// reset styles
			gsap.to(nodeRef.current, {
				scale: 1,
				duration: 0.1,
				backgroundColor: "",
				clearProps: "all",
			});
		}
	}, [status]);

	return (
		<div
			id={nodeId}
			ref={nodeRef}
			className={`node ${status}`}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={onMouseUp}
		></div>
	);
}

export default Node;
