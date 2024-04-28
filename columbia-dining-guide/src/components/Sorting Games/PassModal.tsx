import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { usePassModal } from "../../contexts/PassModalContext";
import { useModal } from "../../contexts/ModalContext";

interface PassModalProps {
  description: string;
  nextURL: string;
}

const PassModal: React.FC<PassModalProps> = ({ description, nextURL }) => {
  const navigate = useNavigate();
  const { isPassModalOpen, setPassModalOpen } = usePassModal();
  const { isModalOpen, setModalOpen } = useModal();

  return (
    <>
      <Modal
        size="4xl"
        dismissible
        show={!isPassModalOpen}
        onClose={() => setPassModalOpen(false)}
      >
        <Modal.Header style={{ marginTop: 10 }} className="items-center p-4">
          <h3>Great job!</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
              {description}
            </p>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              Now press the continue button to keep learning!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={() => {
              setPassModalOpen(true);
              navigate(nextURL);
              setModalOpen(false);
            }}
            style={{ backgroundColor: "#008901" }}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PassModal;
