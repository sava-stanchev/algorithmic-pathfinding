import "./SingleNode.css";

export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  previousNode: NodeType | null;
  isWall: boolean;
};

type Props = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  onMouseDown: (col: number, row: number) => void;
  onMouseEnter: (col: number, row: number) => void;
  onMouseLeave: (col: number, row: number) => void;
  onMouseUp: (col: number, row: number) => void;
};

const SingleNode: React.FC<Props> = ({
  row,
  col,
  isStart,
  isFinish,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
}) => {
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";

  return (
    <div
      id={`node-${col}-${row}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(col, row)}
      onMouseEnter={() => onMouseEnter(col, row)}
      onMouseLeave={() => onMouseLeave(col, row)}
      onMouseUp={() => onMouseUp(col, row)}
    ></div>
  );
};

export default SingleNode;
