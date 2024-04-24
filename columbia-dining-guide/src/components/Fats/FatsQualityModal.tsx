import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

const FatsQualityModal = () => {
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
          <h2>But not all fats are bad!</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 gap-10">
            <div className="space-y-6 border-r border-gray-300">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Look for...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>nuts and seeds</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>walnuts</li>
                  <li>chia seeds</li>
                </ul>
                <li>fish</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>salmon</li>
                  <li>trout</li>
                </ul>
                <li>vegetables</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>avocado</li>
                  <li>soybeans</li>
                </ul>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Avoid or limit...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>trans fats</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>fried food</li>
                  <li>commercial baked goods</li>
                </ul>
                <li>saturated fats</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>processed meat</li>
                  <li>butter</li>
                  <li>pastries</li>
                </ul>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => navigate("/learn/fats-source")}>
            Back
          </Button>
          <Button onClick={() => setModalOpen(true)}>Play Sorting Game</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FatsQualityModal;
