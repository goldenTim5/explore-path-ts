import gsap from "gsap";
import { useEffect, useState } from "react";
import { animatePathfiding } from "../../utils/animations";
import Node from "../Node/Node";
import { disjktraAlgorithm } from "../algorithms/dijkstra";
import "./grid.css";

export interface NodePosition {
	x: number;
	y: number;
}

export interface NodeState {
	position: NodePosition;
	status: string;
	parentNode: NodeState | null;
}

interface GridProps {
	numRows: number;
	numCols: number;
}

export type GridState = NodeState[][];

function Grid({ numRows, numCols }: GridProps) {
	const [grid, setGrid] = useState<GridState>([]);
	const [isMouseDown, setIsMouseDown] = useState<Boolean>(false);

	const startNodePosition: NodePosition = {
		x: Math.floor(numRows / 2),
		y: Math.floor(numCols / 4),
	};
	const targetNodePosition: NodePosition = {
		x: Math.floor(numRows / 2),
		y: Math.floor((3 * numCols) / 4),
	};

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
				const nodePos = { x: row, y: col };
				let nodeStatus: string;

				if (row === startNodePosition.x && col === startNodePosition.y) {
					nodeStatus = "start";
				} else if (
					row === targetNodePosition.x &&
					col === targetNodePosition.y
				) {
					nodeStatus = "target";
				} else {
					nodeStatus = "unvisited";
				}

				const newNode: NodeState = {
					position: nodePos,
					status: nodeStatus,
					parentNode: null,
				};
				// push this new node to the current row
				currentRow.push(newNode);
			}
			// push the whole row to the grid array
			initialGrid.push(currentRow);
		}
		return initialGrid;
	}

	function clearGrid(): void {
		// reset the grid state
		setGrid(initializeGrid());

		// reset the styles of each node
		grid.forEach((row) => {
			row.forEach((node) => {
				const nodeId = `node-${node.position.x}-${node.position.y}`;
				const nodeRef = document.getElementById(nodeId);
				if (nodeRef) {
					// stop all GSAP animations on this node
					gsap.killTweensOf(nodeRef);

					// clear all inline styles set by GSAP
					gsap.set(nodeRef, { clearProps: "all" });

					// reset class name
					nodeRef.className = `node ${node.status}`;
				}
			});
		});
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

	function visualiseDijkstra(): void {
		const startingNode = grid[startNodePosition.x][startNodePosition.y];
		const { shortestPath, visitedNodes } = disjktraAlgorithm(
			grid,
			startingNode
		);

		animatePathfiding(shortestPath, visitedNodes);
	}

	return (
		<>
			<button onClick={() => visualiseDijkstra()}>Visualise</button>
			<button onClick={() => clearGrid()}>Clear Grid</button>
			<div className="grid">
				{grid.map((row: NodeState[], rowIndex: number) => (
					<div key={rowIndex} className="grid-row">
						{row.map((node, colIndex) => (
							<Node
								key={colIndex}
								status={node.status}
								row={node.position.x}
								col={node.position.y}
								onMouseDown={handleMouseDown}
								onMouseEnter={handleMouseEnter}
								onMouseUp={handleMouseUp}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
}

export default Grid;
