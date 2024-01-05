import { useEffect, useState } from "react";
import "./node.css";

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
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (status === "wall") {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 300);
			return () => clearTimeout(timer);
		}
	}, [status]);

	const nodeClasses = `node ${status} ${animate ? "animate-wall" : ""}`;

	return (
		<div
			className={nodeClasses}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={onMouseUp}
		></div>
	);
}

export default Node;
