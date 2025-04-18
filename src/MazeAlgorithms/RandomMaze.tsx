import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRandomMaze = (grid: NodeType[][]) => {
  const isStartOrTarget = (className: string) =>
    className === "node node-start" || className === "node node-finish";

  for (let row of grid) {
    for (let node of row) {
      const element = document.getElementById(`node-${node.col}-${node.row}`)!;
      if (isStartOrTarget(element.className)) continue;

      const isWall = Math.random() < 0.25;
      element.className = isWall ? "node node-wall" : "node";
      node.isWall = isWall;
    }
  }

  return grid;
};
