import { useState } from "react";
import "./nav.css";

interface NavProps {
	selectedAlgorithm: string;
	setSelectedAlgorithm: (value: string) => void;
	onStart: () => void;
	resetGrid: () => void;
	clearNodes: (clearWalls: boolean) => void;
	distanceCalculation: string;
	setDistanceCalculation: (value: string) => void;
}

function NavBar({
	selectedAlgorithm,
	setSelectedAlgorithm,
	onStart,
	resetGrid,
	clearNodes,
	distanceCalculation,
	setDistanceCalculation,
}: NavProps) {
	const [isDisabled, setIsDisabled] = useState(true);
	function handleAlgorithmChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value;
		setSelectedAlgorithm(value);
		if (value === "dijkstra") {
			setIsDisabled(true);
			return;
		}
		setIsDisabled(false);
	}

	function handleDistanceCalculationChange(
		e: React.ChangeEvent<HTMLSelectElement>
	) {
		setDistanceCalculation(e.target.value);
	}

	return (
		<div className="nav-bar-bg">
			<div className="nav-bar">
				<ul className="nav-links">
					<li>
						<a href="#" onClick={onStart}>
							Start
						</a>
					</li>
					<li>
						<a href="#" onClick={resetGrid}>
							Reset
						</a>
					</li>
					<li>
						<a href="#" onClick={() => clearNodes(true)}>
							Clear Walls
						</a>
					</li>
					<li>
						<a href="#" onClick={() => clearNodes(false)}>
							Clear Path
						</a>
					</li>
				</ul>
				<div>
					<select
						disabled={isDisabled}
						value={distanceCalculation}
						onChange={handleDistanceCalculationChange}
						className="distance-select"
					>
						<option value="" disabled>
							Select a Calculation
						</option>
						<option value="manhattan">Manhattan</option>
						<option value="euclidean">Euclidean</option>
					</select>
					<select
						value={selectedAlgorithm}
						onChange={handleAlgorithmChange}
						className="algorithm-select"
					>
						<option value="" disabled>
							Select an Algorithm
						</option>
						<option value="dijkstra">Dijkstra</option>
						<option value="astar">A Star</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
