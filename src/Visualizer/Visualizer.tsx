import { useState } from "react";
import { dijkstra } from "../Algorithms/Dijkstra";
import { AStar } from "../Algorithms/AStar";
import SingleNode from "./SingleNode/SingleNode";
import { NodeType } from "./SingleNode/SingleNode";
import { ReactComponent as StartIcon } from "../Icons/start.svg";
import { ReactComponent as TargetIcon } from "../Icons/target.svg";
import { ReactComponent as DropdownIcon } from "../Icons/dropdown-arrow.svg";
import "./Visualizer.css";
import TutorialModal from "../Modal/TutorialModal";
import { createRandomMaze } from "../MazeAlgorithms/RandomMaze";
import { createRecursiveDivisionMaze } from "../MazeAlgorithms/RecursiveDivisionMaze";
import { mazeGenerationAnimation } from "../MazeAlgorithms/MazeAnimation";
import {
  getGridWithNewFinish,
  getGridWithNewStart,
  getNewGridWithWallToggled,
} from "../HelperFuncs/GetGridHelpers";
import { getNodesInShortestPathOrder } from "../HelperFuncs/AlgorithmHelpers";
import { depthFirstSearch } from "../Algorithms/DepthFirstSearch";

const Visualizer: React.FC = () => {
  const [startNodeCol, setStartNodeCol] = useState(10);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [finishNodeCol, setFinishNodeCol] = useState(29);
  const [finishNodeRow, setFinishNodeRow] = useState(10);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [pressedNodeStatus, setPressedNodeStatus] = useState("");
  const [selectedNode, setSelectedNode] = useState<NodeType>({} as NodeType);
  const [open, setOpen] = useState(true);
  const [isMazeDropdownOpen, setIsMazeDropdownOpen] = useState(false);
  const [isAlgoDropdownOpen, setIsAlgoDropdownOpen] = useState(false);

  const createNode = (row: number, col: number) => {
    return {
      row,
      col,
      isStart: col === startNodeCol && row === startNodeRow,
      isFinish: col === finishNodeCol && row === finishNodeRow,
      distance: Infinity,
      totalDistance: Infinity,
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

    const clearGrid = grid.slice();

    for (let i = 0; i < clearGrid.length; i++) {
      for (let j = 0; j < clearGrid[i].length; j++) {
        clearGrid[i][j].isWall = false;
        clearGrid[i][j].isVisited = false;
        clearGrid[i][j].previousNode = null;
        clearGrid[i][j].distance = Infinity;
      }
    }

    setGrid(clearGrid);
  };

  const generateRandomMaze = () => {
    resetGrid();
    setIsMazeDropdownOpen(!isMazeDropdownOpen);
    setGrid(createRandomMaze(grid));
  };

  const generateRecursiveDivisionMaze = () => {
    resetGrid();
    setIsMazeDropdownOpen(!isMazeDropdownOpen);
    const wallsToAnimate: HTMLElement[] = [];
    const [newGrid, theWalls] = createRecursiveDivisionMaze(
      grid,
      2,
      18,
      2,
      37,
      "horizontal",
      false,
      wallsToAnimate
    );

    setGrid(newGrid);
    mazeGenerationAnimation(theWalls);
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

  const animateAlgorithm = (
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
        if (i !== visitedNodesInOrder.length) {
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
    setIsAlgoDropdownOpen(!isAlgoDropdownOpen);
    const startNode = grid[startNodeCol][startNodeRow];
    const finishNode = grid[finishNodeCol][finishNodeRow];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (!visitedNodesInOrder) return;
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeAStar = () => {
    setIsAlgoDropdownOpen(!isAlgoDropdownOpen);
    const startNode = grid[startNodeCol][startNodeRow];
    const finishNode = grid[finishNodeCol][finishNodeRow];
    const visitedNodesInOrder = AStar(grid, startNode, finishNode)!;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (!visitedNodesInOrder) return;
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeDFS = () => {
    setIsAlgoDropdownOpen(!isAlgoDropdownOpen);
    const startNode = grid[startNodeCol][startNodeRow];
    const finishNode = grid[finishNodeCol][finishNodeRow];
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode)!;
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (!visitedNodesInOrder) return;
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleMouseLeaveGrid = () => {
    if (pressedNodeStatus === "start") {
      setStartNodeCol(selectedNode.col);
      setStartNodeRow(selectedNode.row);
      document.getElementById(
        `node-${selectedNode.col}-${selectedNode.row}`
      )!.className = "node node-start";
    }

    if (pressedNodeStatus === "finish") {
      setFinishNodeCol(selectedNode.col);
      setFinishNodeRow(selectedNode.row);
      document.getElementById(
        `node-${selectedNode.col}-${selectedNode.row}`
      )!.className = "node node-finish";
    }

    setPressedNodeStatus("");
    setMouseIsPressed(false);
  };

  return (
    <div className="container">
      <div className="buttons-container">
        <div className="options-container">
          <button
            className="btn"
            onClick={() => setIsMazeDropdownOpen(!isMazeDropdownOpen)}
          >
            Generate Maze
            <DropdownIcon
              style={{
                width: 16,
                height: "auto",
                marginLeft: 24,
                fill: "white",
              }}
            />
          </button>
          {isMazeDropdownOpen ? (
            <ul className="options">
              <li onClick={() => generateRecursiveDivisionMaze()}>
                Recursive Division Maze
              </li>
              <li onClick={() => generateRandomMaze()}>Basic Random Maze</li>
            </ul>
          ) : null}
        </div>
        <div className="start-icon">
          <StartIcon />
        </div>
        <div className="explain-icons">Start Node</div>
        <div className="start-icon">
          <TargetIcon />
        </div>
        <div className="explain-icons">Target Node</div>
        <div className="options-container">
          <button
            className="btn"
            onClick={() => setIsAlgoDropdownOpen(!isAlgoDropdownOpen)}
          >
            Visualize Algo
            <DropdownIcon
              style={{
                width: 16,
                height: "auto",
                marginLeft: 24,
                fill: "white",
              }}
            />
          </button>
          {isAlgoDropdownOpen ? (
            <ul className="options">
              <li onClick={() => visualizeDijkstra()}>Dijkstra's Algorithm</li>
              <li onClick={() => visualizeAStar()}>A* Algorithm</li>
              <li onClick={() => visualizeDFS()}>DFS Algorithm</li>
            </ul>
          ) : null}
        </div>
        <button className="reset-btn" onClick={() => resetGrid()}>
          Reset
        </button>
      </div>
      <div className="grid" onMouseLeave={() => handleMouseLeaveGrid()}>
        {grid.map((col, colIdx) => {
          return (
            <div key={colIdx}>
              {col.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish } = node;
                return (
                  <SingleNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isStart={isStart}
                    isFinish={isFinish}
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
