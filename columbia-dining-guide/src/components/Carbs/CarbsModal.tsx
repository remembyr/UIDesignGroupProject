import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function CarbsModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify carbs?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You chose to explore carbohydrates!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Carbohydrates are found in foods like fruits, vegetables, breads, pastas, and grains.
             They can be categorized into simple carbs (sugars) and complex carbs (starches and fibers), 
             both of which provide energy to the body.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => navigate("/learn/macros")}>
              Back
            </Button>
          <Button onClick={() => setModalOpen(true)}>Play Sorting Game</Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
