import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";

function App() {
	const navbarHeight = 150;
	const textHeight = 60;
	const [dimensions, setDimensions] = useState({ height: 5, width: 10 });

	useEffect(() => {
		const calculateDimensions = () => {
			const height = Math.floor(
				(window.innerHeight - navbarHeight - textHeight) / 28
			);
			const width = Math.floor(window.innerWidth / 25);
			setDimensions({ height, width });
		};

		calculateDimensions();

		window.addEventListener("resize", calculateDimensions);

		return () => window.removeEventListener("resize", calculateDimensions);
	}, []);

	return (
		<>
			<Grid numRows={dimensions.height} numCols={dimensions.width} />
		</>
	);
}

export default App;
