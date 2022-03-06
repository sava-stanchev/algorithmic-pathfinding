import { NodeType } from "./SingleNode/SingleNode";

const getNewGridWithWallToggled = (
  grid: NodeType[][],
  col: number,
  row: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[col][row];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  let currNode = document.getElementById(`node-${node.col}-${node.row}`)!;
  if (newNode.isWall) {
    currNode.className = "node node-wall";
  } else {
    currNode.className = "node";
  }
  newGrid[col][row] = newNode;
  return newGrid;
};

const getGridWithNewStart = (grid: NodeType[][], col: number, row: number) => {
  const newGrid = grid.slice();
  const node = newGrid[col][row];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[col][row] = newNode;
  return newGrid;
};

const getGridWithNewFinish = (grid: NodeType[][], col: number, row: number) => {
  const newGrid = grid.slice();
  const node = newGrid[col][row];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[col][row] = newNode;
  return newGrid;
};

export { getNewGridWithWallToggled, getGridWithNewStart, getGridWithNewFinish };
