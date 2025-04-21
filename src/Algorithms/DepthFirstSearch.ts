import { getUnvisitedNeighbors } from "../HelperFuncs/AlgorithmHelpers";
import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const depthFirstSearch = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
) => {
    if (!startNode || !finishNode || startNode === finishNode) return false;

    const stack: NodeType[] = [startNode];
    const visitedNodesInOrder: NodeType[] = [];

    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (!currentNode || currentNode.isWall || currentNode.isVisited) {
            continue;
        }

        if (currentNode === finishNode) return visitedNodesInOrder;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            if (!neighbor.isVisited) {
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }
    }
};
