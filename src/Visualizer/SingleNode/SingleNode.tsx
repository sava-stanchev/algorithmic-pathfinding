import "./SingleNode.css";

type Props = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
};

const SingleNode: React.FC<Props> = ({ row, col, isStart, isFinish }) => {
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";
  return <div className={`node ${extraClassName}`}></div>;
};

export default SingleNode;
