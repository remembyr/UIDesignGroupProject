import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

const FatsQualityModal = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify fats?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
              Not all fats are bad!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Fats get a bad reputation, but many are actually really good for you! Healthy unsaturated fats
              can be found in nuts, seeds, fish, and avocados.
              <br />
              However, many fats are the villains they’ve been made out to be. Stay away from from trans
              fats in fried food, and limit saturated fats from red meat and dairy products.
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

export default FatsQualityModal;