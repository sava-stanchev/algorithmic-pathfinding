import { useState } from "react";
import SingleNode from "./SingleNode/SingleNode";
import "./Visualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  previousNode: NodeType | null;
};

const getInitialGrid = () => {
  const theGrid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    theGrid.push(currentRow);
  }

  return theGrid;
};

const Visualizer: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const initialState = getInitialGrid();
    return initialState;
  });

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish } = node;
              return (
                <SingleNode
                  key={nodeIdx}
                  col={col}
                  row={row}
                  isStart={isStart}
                  isFinish={isFinish}
                ></SingleNode>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Visualizer;
