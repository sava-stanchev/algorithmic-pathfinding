import { NodeType } from "../Visualizer/SingleNode/SingleNode";

export const createRecursiveDivisionMaze = (
  grid: NodeType[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: string,
  surroundingWalls: boolean,
  wallsToAnimate: HTMLElement[],
  skew: string
): [NodeType[][], HTMLElement[]] => {
  if (rowEnd < rowStart || colEnd < colStart) {
    return [grid, wallsToAnimate];
  }

  if (!surroundingWalls) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${grid[i][j].col}-${grid[i][j].row}`
        )!;
        let relevantClassNames = ["node node-start", "node node-finish"];
        if (!relevantClassNames.includes(currNode.className)) {
          if (
            grid[i][j].row === 0 ||
            grid[i][j].col === 0 ||
            grid[i][j].row === 20 ||
            grid[i][j].col === 39
          ) {
            wallsToAnimate.push(currNode);
            grid[i][j].isWall = true;
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
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${grid[i][j].col}-${grid[i][j].row}`
        )!;

        if (
          grid[i][j].row === currentRow &&
          grid[i][j].col !== colRandom &&
          grid[i][j].col >= colStart - 1 &&
          grid[i][j].col <= colEnd + 1
        ) {
          let relevantClassNames = ["node node-start", "node node-finish"];
          if (!relevantClassNames.includes(currNode.className)) {
            wallsToAnimate.push(currNode);
            grid[i][j].isWall = true;
          }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    } else {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        skew === "horizontalSkew" ? "horizontal" : "vertical",
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    }

    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      createRecursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    } else {
      createRecursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        wallsToAnimate,
        skew
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
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let currNode = document.getElementById(
          `node-${grid[i][j].col}-${grid[i][j].row}`
        )!;

        if (
          grid[i][j].col === currentCol &&
          grid[i][j].row !== rowRandom &&
          grid[i][j].row >= rowStart - 1 &&
          grid[i][j].row <= rowEnd + 1
        ) {
          let relevantClassNames = ["node node-start", "node node-finish"];
          if (!relevantClassNames.includes(currNode.className)) {
            wallsToAnimate.push(currNode);
            grid[i][j].isWall = true;
          }
        }
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    } else {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        skew === "horizontalSkew" ? "horizontal" : orientation,
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    }

    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    } else {
      createRecursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        wallsToAnimate,
        skew
      );
    }
  }

  return [grid, wallsToAnimate];
};
