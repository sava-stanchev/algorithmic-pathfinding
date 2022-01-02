import "./TutorialModal.css";
import ReactDom from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const TutorialModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" />
      <div className="modal-styles">
        <p>
          A pathfinding algorithm seeks to find the shortest path between two
          points.
        </p>
        <p>Click & drag the start and target nodes to move them.</p>
        <p>
          Click on the grid to add/remove walls. The path cannot cross through a
          wall.
        </p>
        <button className="modal-btn" onClick={onClose}>
          Okay... I understand
        </button>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default TutorialModal;
