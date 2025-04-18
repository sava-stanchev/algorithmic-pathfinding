const isStartOrTarget = (className: string) =>
  className === "node node-start" || className === "node node-finish";

const getNode = (col: number, row: number) =>
  document.getElementById(`node-${col}-${row}`)!;

export { isStartOrTarget, getNode };
