import "./footer.css";

function Footer() {
	return (
		<footer>
			<ul className="footer">
				<li>
					<div className="node start"></div>Start Node
				</li>
				<li>
					<div className="node target"></div>Target Node
				</li>
				<li>
					<div className="node"></div>Unvisited Node
				</li>
				<li>
					<div className="node wall"></div>Wall Node
				</li>
				<li>
					<div className="node keep-visited"></div>Visited Node
				</li>
				<li>
					<div className="node short-path"></div>Shortest Path Node
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
