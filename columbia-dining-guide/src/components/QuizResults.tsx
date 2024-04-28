/* eslint-disable tailwindcss/no-custom-classname */
import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import MacroPlate from "./Plate/MacroPlate";
import {useNavigate} from "react-router-dom";

interface Food {
    name: string;
    imgURL: string;
}

export default function QuizResults() {

    const navigate = useNavigate();
    const { isModalOpen, setModalOpen } = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [foods, setFoods] = useState<Food[]>([]);

    const [userChoices50Section, setUserChoices50Section] = useState<Food[]>([]);
    const [userChoices25TopSection, setUserChoices25TopSection] = useState<Food[]>([]);
    const [userChoices25BottomSection, setUserChoices25BottomSection] = useState<Food[]>([]);

    /* dropping onto plate */

    const handleDrop50 = (event: React.DragEvent<HTMLDivElement>) => {
        // no-op
    };

    const handleDrop25Top = (event: React.DragEvent<HTMLDivElement>) => {
        // no-op
        
    };

    const handleDrop25Bottom = (event: React.DragEvent<HTMLDivElement>) => {
        // no-op  
    };

    const removeFromPlate50 = (food: string) => {
        // no-op
    };

    const removeFromPlate25Top = (food: string) => {
        // no-op
    };

    const removeFromPlate25Bottom = (food: string) => {
        // no-op
    };

    const reenterQuiz = () => {
        navigate("../quiz")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">

                    <div className="my-9 mb-[10rem]">
                        <MacroPlate
                            onDrop50={handleDrop50}
                            onDrop25Top={handleDrop25Top}
                            onDrop25Bottom={handleDrop25Bottom}

                            macro="Carb"

                            food50={userChoices50Section}
                            food25_1={userChoices25TopSection}
                            food25_2={userChoices25BottomSection}
                            
                            removeFromPlate50={removeFromPlate50}
                            removeFromPlate25Top={removeFromPlate25Top}
                            removeFromPlate25Bottom={removeFromPlate25Bottom}
                        />

                    </div>
                   

                </div>
                <div className="col-md-6">
                    <div className="my-9 bg-white shadow-md p-6 rounded-xl">
                        <p className="text-[1.5rem] font-semibold">Well done!</p>

                        <p className="text-[1.25rem]">Your final dish-tribution was:</p>

                        <p id="carbs-results">Carbs: </p>
                        <p id="protein-results">Protein: </p>
                        <p id="fat-results">Fat: </p>

                        <Button color={"blue"} onClick={reenterQuiz} className="font-normal my-[1.875rem]" outline>Try Again</Button>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}