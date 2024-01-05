import { useEffect, useState } from "react";
import Node from "../Node/Node";
import "./grid.css";

interface NodeState {
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
	const [isMouseDown, setIsMouseDown] = useState<Boolean>(false);

	const startNodePosition: number[] = [
		Math.floor(numRows / 2),
		Math.floor(numCols / 4),
	];
	const targetNodePosition: number[] = [
		Math.floor(numRows / 2),
		Math.floor((3 * numCols) / 4),
	];

	useEffect(() => {
		setGrid(initializeGrid());
	}, [numRows, numCols]);

	function initializeGrid(): GridState {
		// initialize the grid state with an empty array
		const initialGrid: GridState = [];

		for (let row = 0; row < numRows; row++) {
			// create the current empty row array
			const currentRow: NodeState[] = [];

			for (let col = 0; col < numCols; col++) {
				// collect the position and the status
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
					position: nodePos,
					status: nodeStatus,
				};
				// push this new node to the current row
				currentRow.push(newNode);
			}
			// push the whole row to the grid array
			initialGrid.push(currentRow);
		}
		return initialGrid;
	}

	function handleNodeClick(row: number, col: number): void {
		// create a copy of the grid and toggle the current node status
		const newGrid = grid.map((gridRow, r) =>
			gridRow.map((cell, c) => {
				if (r === row && c === col) {
					let newStatus = cell.status;
					if (cell.status === "unvisited") {
						newStatus = "wall";
					} else if (cell.status === "wall") {
						newStatus = "unvisited";
					}
					return { ...cell, status: newStatus };
				}
				return cell;
			})
		);
		setGrid(newGrid);
	}

	function handleMouseDown(row: number, col: number): void {
		setIsMouseDown(true);
		handleNodeClick(row, col);
	}

	function handleMouseEnter(row: number, col: number): void {
		if (!isMouseDown) return;
		handleNodeClick(row, col);
	}

	function handleMouseUp(): void {
		setIsMouseDown(false);
	}

	return (
		<div className="grid">
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className="grid-row">
					{row.map((node, colIndex) => (
						<Node
							key={colIndex}
							status={node.status}
							row={node.position[0]}
							col={node.position[1]}
							onMouseDown={handleMouseDown}
							onMouseEnter={handleMouseEnter}
							onMouseUp={handleMouseUp}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Grid;
