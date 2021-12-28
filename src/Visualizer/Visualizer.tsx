import { useState } from "react";
import SingleNode from "./SingleNode/SingleNode";
import "./Visualizer.css";

const getInitialGrid = () => {
  const theGrid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push([]);
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
              return <SingleNode key={nodeIdx}></SingleNode>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Visualizer;
