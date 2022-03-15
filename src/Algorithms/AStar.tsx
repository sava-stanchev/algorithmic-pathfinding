import { getUnvisitedNeighbors } from "../HelperFuncs/AlgorithmHelpers";
import { NodeType } from "../Visualizer/SingleNode/SingleNode";

const manhattanDistance = (node: NodeType, finishNode: NodeType) => {
  let x = Math.abs(node.col - finishNode.col);
  let y = Math.abs(node.row - finishNode.row);
  return x + y;
};

const neighborNotInUnvisitedNodes = (
  neighbor: NodeType,
  unvisitedNodes: NodeType[]
) => {
  for (let node of unvisitedNodes) {
    if (node.row === neighbor.row && node.col === neighbor.col) {
      return false;
    }
  }
  return true;
};

export const AStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  let unvisitedNodes = [];
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort(
      (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
    );
    let closestNode = unvisitedNodes.shift();
    if (closestNode === finishNode) return visitedNodesInOrder;
    if (closestNode) {
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      let neighbors = getUnvisitedNeighbors(closestNode, grid);

      for (let neighbor of neighbors) {
        let distance = closestNode.distance + 1;

        if (neighborNotInUnvisitedNodes(neighbor, unvisitedNodes)) {
          unvisitedNodes.unshift(neighbor);
          neighbor.distance = distance;
          neighbor.totalDistance =
            distance + manhattanDistance(neighbor, finishNode);
          neighbor.previousNode = closestNode;
        } else if (distance < neighbor.distance) {
          neighbor.distance = distance;
          neighbor.totalDistance =
            distance + manhattanDistance(neighbor, finishNode);
          neighbor.previousNode = closestNode;
        }
      }
    }
  }
  return visitedNodesInOrder;
};
