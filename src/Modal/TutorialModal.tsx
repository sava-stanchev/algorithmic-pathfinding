import { useEffect, useRef } from "react";
import "./TutorialModal.css";

type Props = {
  openModal: boolean;
  closeModal: () => void;
};

const TutorialModal: React.FC<Props> = ({ openModal, closeModal }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} className="modal">
      <p>
        A pathfinding algorithm seeks to find the shortest path between two
        points.
      </p>
      <p>Click & drag the start and target nodes to move them.</p>
      <p>
        Click on the grid to add/remove walls. The path cannot cross through a
        wall.
      </p>
      <button className="modal-btn" onClick={closeModal}>
        Okay... I understand
      </button>
    </dialog>
  );
};

export default TutorialModal;
