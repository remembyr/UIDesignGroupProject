import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function ProteinQualityModal() {
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
          <h2>But not all proteins are good!</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 gap-10">
            <div className="space-y-6 border-r border-gray-300">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Look for...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>plant proteins</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>chickpeas</li>
                </ul>
                <li>lean meats</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>chicken</li>
                  <li>turkey</li>
                  <li>pork</li>
                </ul>
                <li>fish</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>salmon</li>
                  <li>tuna</li>
                </ul>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="mb-0 text-3xl leading-relaxed text-gray-500 dark:text-gray-400">
                Avoid or limit...
              </p>
              <ul className="ml-4 mt-0 list-disc text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                <li>red meats</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>beef</li>
                  <li>lamb</li>
                </ul>
                <li>heavily processed meats</li>
                <ul className="ml-4 list-square text-xl leading-relaxed text-gray-400 dark:text-gray-400">
                  <li>sausage</li>
                  <li>hot dogs</li>
                  <li>pepperoni</li>
                </ul>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => navigate("/learn/protein-source")}
          >
            Back
          </Button>
          <Button
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: "#ff4500" }}
          >
            Play Sorting Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
