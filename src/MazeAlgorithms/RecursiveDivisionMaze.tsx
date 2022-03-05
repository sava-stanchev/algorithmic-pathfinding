import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRecursiveDivisionMaze = (
  grid: NodeType[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: string,
  surroundingWalls: boolean
) => {
  const newGrid = grid.slice();

  if (rowEnd < rowStart || colEnd < colStart) {
    return newGrid;
  }

  if (!surroundingWalls) {
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
        )!;
        let relevantClassNames = ["node node-start", "node node-finish"];
        if (!relevantClassNames.includes(currNode.className)) {
          if (
            newGrid[i][j].row === 0 ||
            newGrid[i][j].col === 0 ||
            newGrid[i][j].row === 20 ||
            newGrid[i][j].col === 39
          ) {
            // currNode.className = "node node-wall";
            newGrid[i][j].isWall = true;
          }
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
        )!;

        if (
          newGrid[i][j].row === currentRow &&
          newGrid[i][j].col !== colRandom &&
          newGrid[i][j].col >= colStart - 1 &&
          newGrid[i][j].col <= colEnd + 1
        ) {
          let relevantClassNames = ["node node-start", "node node-finish"];
          if (!relevantClassNames.includes(currNode.className)) {
            // currNode.className = "node node-wall";
            newGrid[i][j].isWall = true;
          }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }

    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      createRecursiveDivisionMaze(
        newGrid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      createRecursiveDivisionMaze(
        newGrid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${newGrid[i][j].col}-${newGrid[i][j].row}`
        )!;

        if (
          newGrid[i][j].col === currentCol &&
          newGrid[i][j].row !== rowRandom &&
          newGrid[i][j].row >= rowStart - 1 &&
          newGrid[i][j].row <= rowEnd + 1
        ) {
          let relevantClassNames = ["node node-start", "node node-finish"];
          if (!relevantClassNames.includes(currNode.className)) {
            // currNode.className = "node node-wall";
            newGrid[i][j].isWall = true;
          }
        }
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls
      );
    } else {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls
      );
    }

    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls
      );
    } else {
      createRecursiveDivisionMaze(
        newGrid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls
      );
    }
  }

  return newGrid;
};
