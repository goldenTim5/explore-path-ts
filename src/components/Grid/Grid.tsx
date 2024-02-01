import gsap from "gsap";
import { useEffect, useState } from "react";
import { animatePathfiding } from "../../utils/animations";
import Footer from "../Footer/Footer";
import NavBar from "../Nav/Nav";
import Node, { NodePosition, NodeState } from "../Node/Node";
import { aStarAlgorithm } from "../algorithms/astar";
import { disjktraAlgorithm } from "../algorithms/dijkstra";
import "./grid.css";

interface GridProps {
	numRows: number;
	numCols: number;
	calculateDimensions: () => void;
}

export type GridState = NodeState[][];

function Grid({ numRows, numCols, calculateDimensions }: GridProps) {
	const [grid, setGrid] = useState<GridState>([]);
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
	const [selectedAlgorithm, setSelectedAlgorithm] =
		useState<string>("dijkstra");
	const [distanceCalculation, setDistanceCalculation] =
		useState<string>("manhattan");
	// 0 for left, 1 for right
	const [pressedMouseButton, setPressedMouseButton] = useState<number>(-1);

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
					gCost: Infinity,
					fCost: Infinity,
				};
				// push this new node to the current row
				currentRow.push(newNode);
			}
			// push the whole row to the grid array
			initialGrid.push(currentRow);
		}
		return initialGrid;
	}

	function clearNodes(clearWalls: boolean): void {
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

					// reset costs
					node.gCost = Infinity;
					node.fCost = Infinity;

					// reset walls
					if (clearWalls && node.status !== "start" && node.status !== "target")
						node.status = "unvisited";

					// reset class name
					nodeRef.className = `node ${node.status}`;
				}
			});
		});
	}

	function resetGrid(): void {
		// re-calculate the dimensions of the grid
		calculateDimensions();
		// reset the grid state
		setGrid(initializeGrid());

		// clear all the styles
		clearNodes(true);
	}

	function disableRightClick(event: React.MouseEvent) {
		event.preventDefault();
	}

	function handleNodeClick(
		mouseButton: number,
		row: number,
		col: number
	): void {
		// create a copy of the grid and toggle the current node status
		const newGrid = grid.map((gridRow, r) =>
			gridRow.map((cell, c) => {
				if (r === row && c === col) {
					console.log(mouseButton);

					let newStatus = cell.status;
					// left click to create walls
					if (mouseButton === 0 && cell.status === "unvisited") {
						newStatus = "wall";
					}
					// right click to remove walls
					else if (mouseButton === 2 && cell.status === "wall") {
						newStatus = "unvisited";
					}
					return { ...cell, status: newStatus };
				}
				return cell;
			})
		);
		setGrid(newGrid);
	}

	function handleMouseDown(
		event: React.MouseEvent,
		row: number,
		col: number
	): void {
		event.preventDefault();
		setIsMouseDown(true);
		setPressedMouseButton(event.button);
		handleNodeClick(event.button, row, col);
	}

	function handleMouseEnter(row: number, col: number): void {
		if (!isMouseDown) return;
		handleNodeClick(pressedMouseButton, row, col);
	}

	function handleMouseUp(): void {
		setIsMouseDown(false);
		setPressedMouseButton(-1);
	}

	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);

		return () => window.addEventListener("mouseup", handleMouseUp);
	}, []);

	function onStart() {
		if (!selectedAlgorithm) return;
		if (selectedAlgorithm === "dijkstra") return visualiseDijkstra();
		if (selectedAlgorithm === "astar") return visualiseAStar();
	}

	function visualiseDijkstra(): void {
		const startingNode = grid[startNodePosition.x][startNodePosition.y];
		const { shortestPath, visitedNodes } = disjktraAlgorithm(
			grid,
			startingNode
		);

		clearNodes(false);
		animatePathfiding(shortestPath, visitedNodes);
	}

	function visualiseAStar(): void {
		const startingNode = grid[startNodePosition.x][startNodePosition.y];
		const targetNode = grid[targetNodePosition.x][targetNodePosition.y];
		const { shortestPath, visitedNodes } = aStarAlgorithm(
			grid,
			startingNode,
			targetNode,
			distanceCalculation
		);
		clearNodes(false);

		animatePathfiding(shortestPath, visitedNodes);
	}

	return (
		<>
			<NavBar
				selectedAlgorithm={selectedAlgorithm}
				setSelectedAlgorithm={setSelectedAlgorithm}
				onStart={onStart}
				resetGrid={resetGrid}
				clearNodes={clearNodes}
				setDistanceCalculation={setDistanceCalculation}
				distanceCalculation={distanceCalculation}
			/>
			<div draggable="false" className="grid" onContextMenu={disableRightClick}>
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
			<Footer />
		</>
	);
}

export default Grid;
