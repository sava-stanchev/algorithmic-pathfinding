import { getUnvisitedNeighbors } from "../HelperFuncs/AlgorithmHelpers";
import { NodeType } from "../Visualizer/SingleNode/SingleNode";

const manhattanDistance = (node: NodeType, target: NodeType) => {
  return Math.abs(node.col - target.col) + Math.abs(node.row - target.row);
};

const isNotInUnvisited = (node: NodeType, unvisited: NodeType[]) => {
  return !unvisited.some((n) => n.row === node.row && n.col === node.col);
};

export const AStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  if (!startNode || !finishNode || startNode === finishNode) return false;

  const unvisitedNodes: NodeType[] = [startNode];
  const visitedNodesInOrder: NodeType[] = [];

  startNode.distance = 0;

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    const neighbors = getUnvisitedNeighbors(closestNode, grid);

    for (const neighbor of neighbors) {
      const tentativeDistance = closestNode.distance + 1;

      if (isNotInUnvisited(neighbor, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbor);
      }

      if (
        tentativeDistance < neighbor.distance ||
        isNotInUnvisited(neighbor, unvisitedNodes)
      ) {
        neighbor.distance = tentativeDistance;
        neighbor.totalDistance =
          tentativeDistance + manhattanDistance(neighbor, finishNode);
        neighbor.previousNode = closestNode;
      }
    }
  }
};
