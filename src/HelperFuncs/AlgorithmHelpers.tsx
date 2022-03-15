import { NodeType } from "../Visualizer/SingleNode/SingleNode";

const getNodesInShortestPathOrder = (finishNode: NodeType | null) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

const getUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const neighbors = [];
  const { col, row } = node;
  if (row !== grid[0].length - 1) neighbors.push(grid[col][row + 1]);
  if (col !== grid.length - 1) neighbors.push(grid[col + 1][row]);
  if (row !== 0) neighbors.push(grid[col][row - 1]);
  if (col !== 0) neighbors.push(grid[col - 1][row]);
  return neighbors.filter(
    (neighbor) => !neighbor.isWall && !neighbor.isVisited
  );
};

export { getNodesInShortestPathOrder, getUnvisitedNeighbors };
