import { getUnvisitedNeighbors } from "../HelperFuncs/AlgorithmHelpers";
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

const updateUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

export const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  const visitedNodesInOrder = [];
  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvisitedNodes.shift();
    if (closestNode) {
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      if (closestNode === finishNode) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
};
