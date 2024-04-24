import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";
import carbsImage from "../../images/macros/carbs.jpg"

export function CarbsModal() {
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
        <h3>How do we identify carbs?</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="grid max-w-5xl grid-cols-2 items-center gap-10">
          <div>
            <img
              className="rounded"
              style={{ width: 400, height: 250 }}
              src={carbsImage}
              alt="Carbs"
            />
          </div>
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
              You chose to explore carbohydrates!
            </p>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            Carbohydrates are found in foods like fruits, vegetables, breads, pastas,
             and grains. They can be categorized into simple carbs (sugars) and complex
              carbs (starches and fibers), both of which provide energy to the body.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="gray"
          onClick={() => navigate("/learn/macros")}
          style={{ backgroundColor: "#ff4500" }}
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
