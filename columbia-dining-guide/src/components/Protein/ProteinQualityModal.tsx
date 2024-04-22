import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function ProteinQualityModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal size="4xl" dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header style={{marginTop: 10}} className="p-4 items-center"><h2>But not all proteins are good!</h2></Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-2 gap-10 max-w-5xl">
              <div className="space-y-6 border-r border-gray-300">
                <p className="text-3xl leading-relaxed text-gray-500 dark:text-gray-400 mb-0">
                  Look for...
                </p>
                <ul className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400 list-disc ml-4 mt-0">
                  <li>plant proteins</li>
                    <ul className="text-xl leading-relaxed text-gray-400 dark:text-gray-400 list-square ml-4">
                      <li>chickpeas</li>
                    </ul>
                  <li>lean meats</li>
                    <ul className="text-xl leading-relaxed text-gray-400 dark:text-gray-400 list-square ml-4">
                      <li>chicken</li>
                      <li>turkey</li>
                      <li>pork</li>
                    </ul>
                  <li>fish</li>
                    <ul className="text-xl leading-relaxed text-gray-400 dark:text-gray-400 list-square ml-4">
                      <li>salmon</li>
                      <li>tuna</li>
                    </ul>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-3xl leading-relaxed text-gray-500 dark:text-gray-400 mb-0">
                  Avoid...
                </p>
                <ul className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400 list-disc ml-4 mt-0">
                  <li>red meats</li>
                    <ul className="text-xl leading-relaxed text-gray-400 dark:text-gray-400 list-square ml-4">
                      <li>beef</li>
                      <li>lamb</li>
                    </ul>
                  <li>heavily processed meats</li>
                    <ul className="text-xl leading-relaxed text-gray-400 dark:text-gray-400 list-square ml-4">
                      <li>sausage</li>
                      <li>hot dogs</li>
                      <li>pepperoni</li>
                    </ul>
                </ul>
              </div>
            </div> 
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => navigate("/learn/protein-source")}>
                Back
              </Button>
            <Button onClick={() => setModalOpen(true)}>Play Sorting Game</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}
