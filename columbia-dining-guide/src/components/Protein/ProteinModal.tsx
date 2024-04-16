import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function ProteinModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify proteins?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You chose to explore proteins!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Proteins are typically found in animal products like meat, fish, and eggs, as well as in
              plant-based sources such as beans, lentils, and nuts. They are made up of amino acids
                and are crucial for building and repairing tissues.
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
