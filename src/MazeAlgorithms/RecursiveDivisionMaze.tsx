import { NodeType } from "../Visualizer/SingleNode/SingleNode";

const relevantClassNames = ["node node-start", "node node-finish"];

const isBorderCell = (row: number, col: number) =>
  row === 0 || col === 0 || row === 20 || col === 39;

const isValidWallPlacement = (node: HTMLElement) =>
  !relevantClassNames.includes(node.className);

const getNode = (col: number, row: number) =>
  document.getElementById(`node-${col}-${row}`)!;

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
  if (rowEnd < rowStart || colEnd < colStart) return [grid, wallsToAnimate];

  if (!surroundingWalls) {
    for (let row of grid) {
      for (let node of row) {
        const element = getNode(node.col, node.row);
        if (isBorderCell(node.row, node.col) && isValidWallPlacement(element)) {
          wallsToAnimate.push(element);
          node.isWall = true;
        }
      }
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    const possibleRows = Array.from(
      { length: Math.floor((rowEnd - rowStart) / 2) + 1 },
      (_, i) => rowStart + i * 2
    );
    const possibleCols = Array.from(
      { length: Math.floor((colEnd - colStart + 2) / 2) + 1 },
      (_, i) => colStart - 1 + i * 2
    );

    const currentRow =
      possibleRows[Math.floor(Math.random() * possibleRows.length)];
    const colRandom =
      possibleCols[Math.floor(Math.random() * possibleCols.length)];

    for (let row of grid) {
      for (let node of row) {
        if (
          node.row === currentRow &&
          node.col !== colRandom &&
          node.col >= colStart - 1 &&
          node.col <= colEnd + 1
        ) {
          const element = getNode(node.col, node.row);
          if (isValidWallPlacement(element)) {
            wallsToAnimate.push(element);
            node.isWall = true;
          }
        }
      }
    }

    const topOrientation =
      currentRow - 2 - rowStart > colEnd - colStart
        ? orientation
        : skew === "horizontalSkew"
        ? "horizontal"
        : "vertical";

    const bottomOrientation =
      rowEnd - (currentRow + 2) > colEnd - colStart
        ? skew === "verticalSkew"
          ? "vertical"
          : orientation
        : "vertical";

    createRecursiveDivisionMaze(
      grid,
      rowStart,
      currentRow - 2,
      colStart,
      colEnd,
      topOrientation,
      surroundingWalls,
      wallsToAnimate,
      skew
    );
    createRecursiveDivisionMaze(
      grid,
      currentRow + 2,
      rowEnd,
      colStart,
      colEnd,
      bottomOrientation,
      surroundingWalls,
      wallsToAnimate,
      skew
    );
  } else {
    const possibleCols = Array.from(
      { length: Math.floor((colEnd - colStart) / 2) + 1 },
      (_, i) => colStart + i * 2
    );
    const possibleRows = Array.from(
      { length: Math.floor((rowEnd - rowStart + 2) / 2) + 1 },
      (_, i) => rowStart - 1 + i * 2
    );

    const currentCol =
      possibleCols[Math.floor(Math.random() * possibleCols.length)];
    const rowRandom =
      possibleRows[Math.floor(Math.random() * possibleRows.length)];

    for (let row of grid) {
      for (let node of row) {
        if (
          node.col === currentCol &&
          node.row !== rowRandom &&
          node.row >= rowStart - 1 &&
          node.row <= rowEnd + 1
        ) {
          const element = getNode(node.col, node.row);
          if (isValidWallPlacement(element)) {
            wallsToAnimate.push(element);
            node.isWall = true;
          }
        }
      }
    }

    const leftOrientation =
      rowEnd - rowStart > currentCol - 2 - colStart
        ? skew === "verticalSkew"
          ? "vertical"
          : "horizontal"
        : skew === "horizontalSkew"
        ? "horizontal"
        : orientation;

    const rightOrientation =
      rowEnd - rowStart > colEnd - (currentCol + 2)
        ? "horizontal"
        : orientation;

    createRecursiveDivisionMaze(
      grid,
      rowStart,
      rowEnd,
      colStart,
      currentCol - 2,
      leftOrientation,
      surroundingWalls,
      wallsToAnimate,
      skew
    );
    createRecursiveDivisionMaze(
      grid,
      rowStart,
      rowEnd,
      currentCol + 2,
      colEnd,
      rightOrientation,
      surroundingWalls,
      wallsToAnimate,
      skew
    );
  }

  return [grid, wallsToAnimate];
};
