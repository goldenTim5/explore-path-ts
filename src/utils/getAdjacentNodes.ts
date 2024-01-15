import { GridState } from "../components/Grid/Grid";
import { NodeState } from "../components/Node/Node";

export function getAdjecentNodes(
	grid: GridState,
	node: NodeState
): NodeState[] {
	// debugger;
	const adjecentNodes: NodeState[] = [];
	const { x, y } = node.position;

	// check all adjacent nodes, up | down | left | right
	if (x > 0) adjecentNodes.push(grid[x - 1][y]);
	if (x < grid.length - 1) adjecentNodes.push(grid[x + 1][y]);
	if (y > 0) adjecentNodes.push(grid[x][y - 1]);
	if (y < grid[0].length - 1) adjecentNodes.push(grid[x][y + 1]);

	return adjecentNodes;
}
