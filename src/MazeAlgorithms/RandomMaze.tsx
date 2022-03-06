import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRandomMaze = (grid: NodeType[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let random = Math.random();
      let currNode = document.getElementById(
        `node-${grid[i][j].col}-${grid[i][j].row}`
      )!;
      let relevantClassNames = ["node node-start", "node node-finish"];

      if (random < 0.25 && !relevantClassNames.includes(currNode.className)) {
        currNode.className = "node node-wall";
        grid[i][j].isWall = true;
      }

      if (random >= 0.25 && !relevantClassNames.includes(currNode.className)) {
        currNode.className = "node";
        grid[i][j].isWall = false;
      }
    }
  }

  return grid;
};
