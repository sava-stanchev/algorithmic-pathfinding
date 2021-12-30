import { NodeType } from "../Visualizer/SingleNode/SingleNode";

const getAllNodes = (grid: NodeType[][]) => {
  const nodes = [];
  for (const col of grid) {
    for (const node of col) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes: NodeType[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const neighbors = [];
  const { col, row } = node;
  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < grid.length - 1) neighbors.push(grid[col + 1][row]);
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode) {
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
};

const getNodesInShortestPathOrder = (finishNode: NodeType | null) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export { dijkstra, getNodesInShortestPathOrder };
