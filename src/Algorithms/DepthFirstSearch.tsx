import { getUnvisitedNeighbors } from "../HelperFuncs/AlgorithmHelpers";
import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const depthFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  const unvisitedNodes = [];
  const visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    const closestNode = unvisitedNodes.shift();
    if (!closestNode) return;
    if (closestNode.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (let unvisitedNeighbor of unvisitedNeighbors) {
      unvisitedNeighbor.previousNode = closestNode;
      unvisitedNodes.unshift(unvisitedNeighbor);
    }
  }
};
