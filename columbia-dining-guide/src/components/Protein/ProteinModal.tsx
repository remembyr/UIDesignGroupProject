import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../../contexts/ModalContext";
import proteinImage from "../../images/macros/protein.jpg";

export function ProteinModal() {
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
          <h3>How do we identify proteins?</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 items-center gap-10">
            <div>
              <img
                className="rounded"
                style={{ width: 400, height: 250 }}
                src={proteinImage}
                alt="Proteins"
              />
            </div>
            <div className="space-y-6">
              <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                You chose to explore proteins!
              </p>
              <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Proteins are typically found in animal products like meat, fish,
                and eggs, as well as in plant-based sources such as beans,
                lentils, and nuts. They are made up of amino acids and are
                crucial for building and repairing tissues.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => navigate("/learn/macros")}>
            Back
          </Button>
          <Button
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: "#008901" }}
          >
            Play Sorting Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
