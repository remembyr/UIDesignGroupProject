import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useModal } from "../contexts/ModalContext";
import balancedMealImage from "../images/balancedmeal.jpg";

export function QuizModal() {
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
          <h3>Now it's time to test your knowledge!</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="grid max-w-5xl grid-cols-2 items-center gap-10">
            <div>
              <img
                className="rounded"
                style={{ width: 400, height: 250 }}
                src={balancedMealImage}
                alt="Proteins"
              />
            </div>
            <div className="space-y-6">
              <p className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                One food will be given to you on the plate. It's your job to add
                more foods to balance out the meal!
              </p>
              <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Remember the 50-30-20 rule! Try to make the plate 50%
                carbohydrates, 30% proteins, and 20% fats. If you can pass all
                three levels, you win!
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: "#008901" }}
          >
            Start Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
