import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";

export function ProteinQualityModal() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal dismissible show={!isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>How do we identify proteins?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
              But not all proteins are good!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Protein from plants is generally very healthy, so go for garbanzo beans in your salad!
              Lean meats like chicken, turkey, and pork are also good, as well as fish like salmon and tuna.
              <br />
              Watch out though, red meats and heavily processed meats all can raise cholesterol and hurt
              your heart!

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
