import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";

function App() {
	const navbarHeight = 100;
	const textHeight = 60;
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	// calculate the dimensions of the grid withthe window size
	function calculateDimensions() {
		const height = Math.floor(
			(window.innerHeight - navbarHeight - textHeight) / 28
		);
		const width = Math.floor(window.innerWidth / 25);
		setDimensions({ height, width });
	}
	useEffect(() => {
		calculateDimensions();
		// window.addEventListener("resize", calculateDimensions);

		return () => window.removeEventListener("resize", calculateDimensions);
	}, []);

	return (
		<>
			<Grid
				numRows={dimensions.height}
				numCols={dimensions.width}
				calculateDimensions={calculateDimensions}
			/>
		</>
	);
}

export default App;
