import "./node.css";

interface NodeProps {
	nodeId: string;
	status: string;
	row: number;
	col: number;
	onNodeClick: (row: number, col: number) => void;
}

function Node({ nodeId, status, row, col, onNodeClick }: NodeProps) {
	return (
		<div
			className={`node ${status}`}
			onClick={() => onNodeClick(row, col)}
		></div>
	);
}

export default Node;
