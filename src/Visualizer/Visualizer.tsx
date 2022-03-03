import { useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/Dijkstra";
import SingleNode from "./SingleNode/SingleNode";
import { NodeType } from "./SingleNode/SingleNode";
import { ReactComponent as StartIcon } from "../Icons/start.svg";
import { ReactComponent as TargetIcon } from "../Icons/target.svg";
import "./Visualizer.css";
import TutorialModal from "../Modal/TutorialModal";

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

const getGridWithNewStart = (grid: NodeType[][], col: number, row: number) => {
  const newGrid = grid.slice();
  const node = newGrid[col][row];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[col][row] = newNode;
  return newGrid;
};

const getGridWithNewFinish = (grid: NodeType[][], col: number, row: number) => {
  const newGrid = grid.slice();
  const node = newGrid[col][row];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[col][row] = newNode;
  return newGrid;
};

const Visualizer: React.FC = () => {
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(29);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [pressedNodeStatus, setPressedNodeStatus] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodeType>({} as NodeType);
  const [open, setOpen] = useState(true);

  const createNode = (row: number, col: number) => {
    return {
      row,
      col,
      isStart: col === startNodeCol && row === startNodeRow,
      isFinish: col === finishNodeCol && row === finishNodeRow,
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

  const [grid, setGrid] = useState<NodeType[][]>(() => {
    const initialState = getInitialGrid();
    return initialState;
  });

  const resetGrid = () => {
    const visitedNodes = Array.from(
      document.getElementsByClassName("node node-visited")
    );
    const shortestPathNodes = Array.from(
      document.getElementsByClassName("node node-shortest-path")
    );
    const wallNodes = Array.from(
      document.getElementsByClassName("node node-wall")
    );

    visitedNodes
      .concat(shortestPathNodes, wallNodes)
      .forEach((node) => (node.className = "node"));

    setGrid(getInitialGrid());
  };

  const createRandomMaze = () => {
    resetGrid();
    const newGrid = grid.slice();

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let random = Math.random();
        let currNode = document.getElementById(
          `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
        )!;
        let relevantClassNames = ["node node-start", "node node-finish"];

        if (random < 0.25 && !relevantClassNames.includes(currNode.className)) {
          currNode.className = "node node-wall";
          newGrid[i][j].isWall = true;
        }

        if (
          random >= 0.25 &&
          !relevantClassNames.includes(currNode.className)
        ) {
          currNode.className = "node";
          newGrid[i][j].isWall = false;
        }
      }
    }

    setGrid(newGrid);
  };

  const handleMouseDown = (col: number, row: number) => {
    const currNode = grid[col][row];
    setSelectedNode(currNode);
    if (currNode.isStart) {
      setPressedNodeStatus("start");
    } else if (currNode.isFinish) {
      setPressedNodeStatus("finish");
    } else {
      setPressedNodeStatus("");
      const newGrid = getNewGridWithWallToggled(grid, col, row);
      setGrid(newGrid);
    }

    setMouseIsPressed(true);
  };

  const handleMouseEnter = (col: number, row: number) => {
    if (!mouseIsPressed) return;

    const currNode = grid[col][row];

    if (pressedNodeStatus === "start" && !currNode.isFinish) {
      document.getElementById(
        `node-${col}-${row}`
      )!.className = `node node-${pressedNodeStatus}`;
      currNode.isWall = false;
    } else if (pressedNodeStatus === "finish" && !currNode.isStart) {
      document.getElementById(
        `node-${col}-${row}`
      )!.className = `node node-${pressedNodeStatus}`;
      currNode.isWall = false;
    } else {
      const newGrid = getNewGridWithWallToggled(grid, col, row);
      setGrid(newGrid);
    }
  };

  const handleMouseLeave = (col: number, row: number) => {
    if (!mouseIsPressed) return;
    const currNode = grid[col][row];
    if (pressedNodeStatus === "start" && !currNode.isFinish) {
      document.getElementById(`node-${col}-${row}`)!.className = "node";
    } else if (pressedNodeStatus === "finish" && !currNode.isStart) {
      document.getElementById(`node-${col}-${row}`)!.className = "node";
    }
  };

  const handleMouseUp = (col: number, row: number) => {
    if (!mouseIsPressed) return;
    const currNode = grid[col][row];
    if (JSON.stringify(selectedNode) === JSON.stringify(currNode)) {
    } else {
      if (pressedNodeStatus === "start" && !currNode.isFinish) {
        setStartNodeCol(col);
        setStartNodeRow(row);
        document.getElementById(
          `node-${selectedNode.col}-${selectedNode.row}`
        )!.className = "node";
        document.getElementById(`node-${col}-${row}`)!.className =
          "node node-start";
        const newGrid = getGridWithNewStart(grid, col, row);
        setGrid(newGrid);
      } else if (pressedNodeStatus === "start" && currNode.isFinish) {
        setStartNodeCol(selectedNode.col);
        setStartNodeRow(selectedNode.row);
        document.getElementById(
          `node-${selectedNode.col}-${selectedNode.row}`
        )!.className = "node node-start";
      }

      if (pressedNodeStatus === "finish" && !currNode.isStart) {
        setFinishNodeCol(col);
        setFinishNodeRow(row);
        document.getElementById(
          `node-${selectedNode.col}-${selectedNode.row}`
        )!.className = "node";
        document.getElementById(`node-${col}-${row}`)!.className =
          "node node-finish";
        const newGrid = getGridWithNewFinish(grid, col, row);
        setGrid(newGrid);
      } else if (pressedNodeStatus === "finish" && currNode.isStart) {
        setFinishNodeCol(selectedNode.col);
        setFinishNodeRow(selectedNode.row);
        document.getElementById(
          `node-${selectedNode.col}-${selectedNode.row}`
        )!.className = "node node-finish";
      }
    }

    setPressedNodeStatus("");
    setMouseIsPressed(false);
  };

  const animateDijkstra = (
    visitedNodesInOrder: NodeType[],
    nodesInShortestPathOrder: NodeType[]
  ) => {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        if (i !== visitedNodesInOrder.length - 1) {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.col}-${node.row}`)!.className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.col}-${node.row}`)!.className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startNodeCol][startNodeRow];
    const finishNode = grid[finishNodeCol][finishNodeRow];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="container">
      <div className="buttons-container">
        <button className="visualize-btn" onClick={() => createRandomMaze()}>
          Generate Maze
        </button>
        <div className="start-icon">
          <StartIcon />
        </div>
        <div className="explain-icons">Start Node &nbsp;</div>
        <div className="start-icon">
          <TargetIcon />
        </div>
        <div className="explain-icons">Target Node</div>
        <button className="visualize-btn" onClick={() => visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button className="reset-btn" onClick={() => resetGrid()}>
          Reset
        </button>
      </div>
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
                    onMouseLeave={(col: number, row: number) =>
                      handleMouseLeave(col, row)
                    }
                    onMouseUp={(col: number, row: number) =>
                      handleMouseUp(col, row)
                    }
                  ></SingleNode>
                );
              })}
            </div>
          );
        })}
      </div>
      <TutorialModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Visualizer;
