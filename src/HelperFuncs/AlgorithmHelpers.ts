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

const getUnvisitedNeighbors = (
    node: NodeType,
    grid: NodeType[][]
): NodeType[] => {
    const neighbors: NodeType[] = [];
    const { col, row } = node;
    const maxCol = grid.length - 1;
    const maxRow = grid[0].length - 1;

    if (row < maxRow) neighbors.push(grid[col][row + 1]); // Down
    if (col < maxCol) neighbors.push(grid[col + 1][row]); // Right
    if (row > 0) neighbors.push(grid[col][row - 1]); // Up
    if (col > 0) neighbors.push(grid[col - 1][row]); // Left

    return neighbors.filter(
        (neighbor) => !neighbor.isWall && !neighbor.isVisited
    );
};

export { getNodesInShortestPathOrder, getUnvisitedNeighbors };
