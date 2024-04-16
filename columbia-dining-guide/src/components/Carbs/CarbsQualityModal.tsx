import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function CarbsQualityModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify carbs?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-base font-bold text-gray-500 dark:text-gray-400">
              Not all carbs are good!
            </h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Bad, processed carbs are stripped of their nutrients and absorbed quickly into the bloodstream,
              causing blood sugar to spike. Bad carbs include things like white bread and sodas that are high on sugar.
              <br /><br />
              Good carbs are not processed, and have complex nutrient structures that help your digestive system
              properly break them down. These include whole grains, brown rice, and vegetables!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => navigate("/learn/carbs-source")}>
              Back
            </Button>
          <Button onClick={() => setModalOpen(true)}>Play Sorting Game</Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
