/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Button } from "flowbite-react";
import 'bootstrap/dist/css/bootstrap.css';
import { useDrag } from 'react-dnd';
import "./Plate/Plate.css";
import React, { useState, useEffect } from 'react';
import FoodList from "./FoodList";
import { QuizModal } from "./QuizModal";

import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { stringify } from "querystring";
import { captureRejectionSymbol } from "events";

interface Food {
    name: string;
    imgURL: string;
}

// store dishes here
let currentPlate:  { [key: string]: any } = {
    "50%": [],
    "20%": [],
    "30%": []
};


export default function Quiz() {
    const [fiftyPercentMeal, setFifty] = useState(""); // carbs
    const [twentyPercentMeal, setTwenty] = useState(""); // fats
    const [thirtyPercentMeal, setThirty] = useState(""); // protein

    // store dishes here
    // let currentPlate:  { [key: string]: any } = {
    //     "50%": [],
    //     "20%": [],
    //     "30%": []
    // };

    const navigate = useNavigate();
    const { isModalOpen, setModalOpen } = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [foods, setFoods] = useState<Food[]>([]);

    // request dishes from Flask database
    useEffect(() => {
        async function getFoods() {
        const res = await fetch("/get_foods");
        const data = await res.json();

        // console.log(data)
        setFoods(data);
        setIsLoading(false);
        }

        setTimeout(() => {
        getFoods();
        }, 2000);
    }, []);


    // dish draged
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
        event.preventDefault();
    }
    
    // dish dropped
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        const foodType = event.dataTransfer.getData("text/plain");

        let percent = event.currentTarget.innerText.substring(0, 3)
        console.log(percent);

        // only add the dish to the plate section if the plate section isn't already occupied
        if (currentPlate[percent].length < 1) {
            currentPlate[percent].push(foodType)

            let newFood = document.createElement('div')
            newFood.textContent = foodType
            newFood.draggable = true  
            
            if (percent === "50%") {
                setFifty(foodType)
                newFood.classList.add("food-50")
            }

            if (percent === "20%") {
                setTwenty(foodType)
                newFood.classList.add("food-20")
            }

            if (percent === "30%") {
                setThirty(foodType)
                newFood.classList.add("food-30")
            }
            event.currentTarget.appendChild(newFood)
            console.log(currentPlate)
        }
    };
    
    const handleDragStartBox = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
        // take meal out of plate
        if (event.currentTarget.id === "meal-50-x") {
            const elements = document.querySelectorAll('.food-50')

            // remove element from box on plate
            elements.forEach((element) => {
                element.remove()
            })

            setFifty("") // clear out indicator beneath plate
            currentPlate["50%"] = [] // update meal array
        }

        if (event.currentTarget.id === "meal-30-x") {
            const elements = document.querySelectorAll('.food-30')

            // remove element from box on plate
            elements.forEach((element) => {
                element.remove()
            })

            setThirty("") // clear out indicator beneath plate
            currentPlate["30%"] = [] // update meal array
        }

        if (event.currentTarget.id === "meal-20-x") {
            const elements = document.querySelectorAll('.food-20')

            // remove element from box on plate
            elements.forEach((element) => {
                element.remove()
            })

            setTwenty("") // clear out indicator beneath plate
            currentPlate["20%"] = [] // update meal array
        }
    }

    const handleSubmission = () => {

        // post meal submission to database
        const allMeals = [].concat(...Object.values(currentPlate));
        console.log(allMeals)


        navigate('../quiz/results') // move to results page
    }


    return (
        <div className="container" draggable={false}>
            <QuizModal />
            <div className="row" draggable={false}>
                <div className="col-md-6" draggable={false}>

                    {/* <div draggable={false}>
                        Fat: []%;
                        Protein: []%;
                        Carbs: []%;
                    </div> */}

                    Plate:
                    {/* virtual plate */}
                    <div draggable={false}>
                        <div id="circle" draggable={false}>
                            <div onDragOver={enableDropping} 
                                 onDrop={handleDrop}
                                 onDragStart={handleDragStartBox}
                                 draggable={false}
                                 id="percent50-segment" >50%</div>
                            <div onDragOver={enableDropping}
                                 onDragStart={handleDragStartBox}
                                 onDrop={handleDrop}
                                 draggable={false}
                                 id="percent20-segment" >20%</div>
                            <div onDragOver={enableDropping}
                                 onDragStart={handleDragStartBox}
                                 onDrop={handleDrop}
                                 draggable={false}
                                 id="percent30-segment" >30%</div>
                        </div>
                    </div>

                    <div id="meals-info">
                        {/* 50 */}
                        <div>
                            <p className="plate-label">50%: {fiftyPercentMeal}</p>
                            <Button id="meal-50-x" color={"blue"} onClick={handleMeal}>X</Button>
                        </div>
                        
                        {/* 30 */}
                        <div>
                            <p className="plate-label">30%: {thirtyPercentMeal}</p>
                            <Button id="meal-30-x" color={"blue"} onClick={handleMeal}>X</Button>
                        </div>
                       
                        {/* 20 */}
                        <div>
                            <p className="plate-label">20%: {twentyPercentMeal}</p>
                            <Button id="meal-20-x" color={"blue"} onClick={handleMeal}>X</Button>
                        </div>
                        


                    </div>

                </div>
                <div className="col-md-6">
                    <p className="non-select">Meals:</p>
                    <FoodList isLoading={isLoading} foods={foods}/>

                    <Button color={"blue"} onClick={handleSubmission} className={"font-normal"} outline>Submit</Button>
                </div>

            </div>
        </div>
    )
}