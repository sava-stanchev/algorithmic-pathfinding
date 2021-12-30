import { useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/Dijkstra";
import SingleNode from "./SingleNode/SingleNode";
import { NodeType } from "./SingleNode/SingleNode";
import "./Visualizer.css";

const START_NODE_COL = 10;
const START_NODE_ROW = 10;
const FINISH_NODE_COL = 29;
const FINISH_NODE_ROW = 10;

const createNode = (row: number, col: number) => {
  return {
    row,
    col,
    isStart: col === START_NODE_COL && row === START_NODE_ROW,
    isFinish: col === FINISH_NODE_COL && row === FINISH_NODE_ROW,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    isWall: false,
  };
};

const getInitialGrid = () => {
  const theGrid = [];
  for (let col = 0; col < 40; col++) {
    const currentCol = [];
    for (let row = 0; row < 21; row++) {
      currentCol.push(createNode(row, col));
    }
    theGrid.push(currentCol);
  }

  return theGrid;
};

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
  newGrid[col][row] = newNode;
  return newGrid;
};

const Visualizer: React.FC = () => {
  const [grid, setGrid] = useState<NodeType[][]>(() => {
    const initialState = getInitialGrid();
    return initialState;
  });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (col: number, row: number) => {
    const newGrid = getNewGridWithWallToggled(grid, col, row);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (col: number, row: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, col, row);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (
    visitedNodesInOrder: NodeType[],
    nodesInShortestPathOrder: NodeType[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.col}-${node.row}`)!.className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.col}-${node.row}`)!.className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_COL][START_NODE_ROW];
    const finishNode = grid[FINISH_NODE_COL][FINISH_NODE_ROW];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="container">
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((col, colIdx) => {
          return (
            <div key={colIdx}>
              {col.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <SingleNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    onMouseDown={(col: number, row: number) =>
                      handleMouseDown(col, row)
                    }
                    onMouseEnter={(col: number, row: number) =>
                      handleMouseEnter(col, row)
                    }
                    onMouseUp={() => handleMouseUp()}
                  ></SingleNode>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;
