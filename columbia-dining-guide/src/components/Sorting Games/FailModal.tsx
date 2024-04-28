import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useFailModal } from "../../contexts/FailModalContext";

interface FailModalProps {
  description: string;
  numAway: number;
}

const FailModal: React.FC<FailModalProps> = ({ description, numAway }) => {
  const navigate = useNavigate();
  const { isFailModalOpen, setFailModalOpen } = useFailModal();

  return (
    <>
      <Modal
        size="4xl"
        dismissible
        show={!isFailModalOpen}
        onClose={() => setFailModalOpen(false)}
      >
        <Modal.Header style={{ marginTop: 10 }} className="items-center p-4">
          <h3>Close, but not quite!</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
              You were <strong>{numAway}</strong> food(s) away from having the
              correct answer.
            </p>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={() => setFailModalOpen(true)}
            style={{ backgroundColor: "#008901" }}
          >
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FailModal;
