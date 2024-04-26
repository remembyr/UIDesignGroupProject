import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

const CarbsQualityModal = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal
        size="4xl"
        dismissible
        show={!isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header style={{ marginTop: 10 }} className="items-center p-4">
          <h2>Watch out—not all carbs are good!</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 gap-10">
            <div className="space-y-6 border-r border-gray-300">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Look for...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>unprocessed, complex carbs</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>whole grains</li>
                  <li>brown rice</li>
                  <li>vegetables</li>
                </ul>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Avoid or limit...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>processed, simple carbs</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>white bread</li>
                  <li>high sugar sodas</li>
                  <li>candy</li>
                  <li>white rice</li>
                </ul>
              </ul>
            </div>
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
};

export default CarbsQualityModal;
