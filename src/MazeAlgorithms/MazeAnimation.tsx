import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const mazeGenerationAnimation = (grid: NodeType[][]) => {
  let newGrid = grid.slice(0);
  let wallsToAnimate: HTMLElement[] = [];

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      let currNode = document.getElementById(
        `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
      )!;

      if (newGrid[i][j].isWall) {
        wallsToAnimate.push(currNode);
      }
    }
  }

  const timeout = (index: number) => {
    setTimeout(function () {
      if (index === wallsToAnimate.length) {
        wallsToAnimate = [];
        return;
      }

      wallsToAnimate[index].className = "node node-wall";
      timeout(index + 1);
    }, 5);
  };

  timeout(0);
};
