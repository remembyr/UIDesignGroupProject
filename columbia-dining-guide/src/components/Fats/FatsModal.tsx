import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function FatsModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify fats?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You chose to explore fats!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Fats can be identified in foods that contain oils, butter, cream, nuts, seeds, and fatty meats. 
              They come in various forms including saturated, unsaturated, and trans fats, and are 
              important for nutrient absorption and nerve health.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => navigate("/learn/fats-quality")}>
              Back
            </Button>
          <Button onClick={() => setModalOpen(true)}>Play Sorting Game</Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
