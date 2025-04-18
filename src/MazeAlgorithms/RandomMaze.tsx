import { getNode, isStartOrTarget } from "../HelperFuncs/MazeHelpers";
import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRandomMaze = (grid: NodeType[][]) => {
  for (let row of grid) {
    for (let node of row) {
      const element = getNode(node.col, node.row);
      if (isStartOrTarget(element.className)) continue;

      const isWall = Math.random() < 0.25;
      element.className = isWall ? "node node-wall" : "node";
      node.isWall = isWall;
    }
  }

  return grid;
};
