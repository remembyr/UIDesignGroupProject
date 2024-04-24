import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";
import fatsImage from "../../images/macros/fats.jpg";

export function FatsModal() {
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
          <h3>How do we identify fats?</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 items-center gap-10">
            <div>
              <img
                className="rounded"
                style={{ width: 400, height: 250 }}
                src={fatsImage}
                alt="Fats"
              />
            </div>
            <div className="space-y-6">
              <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                You chose to explore fats!
              </p>
              <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Fats can be identified in foods that contain oils, butter,
                cream, nuts, seeds, and fatty meats. They come in various forms
                including saturated, unsaturated, and trans fats, and are
                important for nutrient absorption and nerve health.
              </p>
            </div>
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
