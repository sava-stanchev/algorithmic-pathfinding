import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRandomMaze = (grid: NodeType[][]) => {
  const newGrid = grid.slice();

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let random = Math.random();
      let currNode = document.getElementById(
        `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
      )!;
      let relevantClassNames = ["node node-start", "node node-finish"];

      if (random < 0.25 && !relevantClassNames.includes(currNode.className)) {
        currNode.className = "node node-wall";
        newGrid[i][j].isWall = true;
      }

      if (random >= 0.25 && !relevantClassNames.includes(currNode.className)) {
        currNode.className = "node";
        newGrid[i][j].isWall = false;
      }
    }
  }

  return newGrid;
};
