//slides 20-25
"use client";
import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function QuizTutorial() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(0)

    const tutorialSteps = [
        {
          title: 'Step 1',
          content: "It's time to create a balanced meal that adheres to the 50-30-20 dietary rule, using foods commonly found in Columbia University's dining halls.",
        },
        {
          title: 'Step 2',
          content: 'Move the circles on the border of the plate to change the portion sizes. Ideally, you want meals and portions that allow for as close to 50% carbs, 30% protein, and 20% fat (in grams).',
        },
        {
            title: 'Step 3',
            content: `You will start off with one dish preselected for you. It's up to you to choose one or two others to balance it out!`,
        }
    ]

    const handleNextStep = () => {
        if (currentStep < tutorialSteps.length) {
            if (currentStep == tutorialSteps.length - 1) {
                navigate("1") // moving to sample quiz
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (

        <>

            {currentStep < tutorialSteps.length && <Modal
                show={true}
                // onClose={() => setShowModal1(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400" id="tutorial-text">
                        {tutorialSteps[currentStep].content}
                        </p>

                        <Button color={"blue"} onClick={() => {handlePrevStep()}} disabled={currentStep === 0} className={"font-normal"} outline>Previous</Button>

                        <Button color={"blue"} onClick={() => {handleNextStep()}} className={"font-normal"} outline>Next</Button>
                    </div>
                </Modal.Body>
            </Modal>}
        </>

    )
}