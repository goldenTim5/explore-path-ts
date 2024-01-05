import gsap from "gsap";
import { useEffect, useRef } from "react";
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
	const nodeRef = useRef(null);

	useEffect(() => {
		// apply gsap styles if the node become a wall
		if (status === "wall") {
			gsap.to(nodeRef.current, {
				scale: 1.2,
				duration: 0.1,
				ease: "ease-out",
				backgroundColor: "rgb(12, 53, 71)",
				onComplete: () => {
					gsap.to(nodeRef.current, {
						scale: 1,
						duration: 0.1,
						backgroundColor: "hsl(198, 71%, 16%)",
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
			ref={nodeRef}
			className={`node ${status}`}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={onMouseUp}
		></div>
	);
}

export default Node;
