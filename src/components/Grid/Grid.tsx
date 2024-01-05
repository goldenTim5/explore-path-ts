import { useEffect, useState } from "react";
import Node from "../Node/Node";
import "./grid.css";

interface NodeState {
	id: string;
	position: number[];
	status: string;
}

interface GridProps {
	numRows: number;
	numCols: number;
}

type GridState = NodeState[][];

function Grid({ numRows, numCols }: GridProps) {
	const [grid, setGrid] = useState<GridState>([]);

	// Calculate the start and target node positions outside of the initializeGrid function
	const startNodePosition = [Math.floor(numRows / 2), Math.floor(numCols / 4)];
	const targetNodePosition = [
		Math.floor(numRows / 2),
		Math.floor((3 * numCols) / 4),
	];

	useEffect(() => {
		setGrid(initializeGrid()); // Initialize the grid in useEffect
	}, [numRows, numCols]); // Dependency array to avoid unnecessary re-renders

	function initializeGrid(): GridState {
		const initialGrid: GridState = [];

		for (let row = 0; row < numRows; row++) {
			// create the current empty row array
			const currentRow: NodeState[] = [];

			for (let col = 0; col < numCols; col++) {
				const nodeId: string = `${row}-${col}`;
				const nodePos: number[] = [row, col];
				let nodeStatus: string;

				if (row === startNodePosition[0] && col === startNodePosition[1]) {
					nodeStatus = "start";
				} else if (
					row === targetNodePosition[0] &&
					col === targetNodePosition[1]
				) {
					nodeStatus = "target";
				} else {
					nodeStatus = "unvisited";
				}

				const newNode: NodeState = {
					id: nodeId,
					position: nodePos,
					status: nodeStatus,
				};

				currentRow.push(newNode);
			}
			initialGrid.push(currentRow);
		}
		return initialGrid;
	}

	function handleNodeClick(row: number, col: number): void {
		const newGrid = grid.slice(); // Creates a shallow copy of the grid
		const cell = newGrid[row][col];
		// Update cell state based on the logic (toggle wall, set start/end)
		setGrid(newGrid);
	}

	return (
		<div className="grid">
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className="grid-row">
					{row.map((node, colIndex) => (
						<Node
							key={colIndex}
							nodeId={node.id}
							status={node.status}
							row={node.position[0]}
							col={node.position[1]}
							onNodeClick={handleNodeClick}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Grid;
