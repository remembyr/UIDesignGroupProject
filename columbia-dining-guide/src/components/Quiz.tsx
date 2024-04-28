/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Button } from "flowbite-react";
import 'bootstrap/dist/css/bootstrap.css';
import { useDrag } from 'react-dnd';
import MacroPlate from "./Plate/MacroPlate";
import { PieChart } from '@mui/x-charts/PieChart';

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
    "25% top": [],
    "25% bottom": []
};


export default function Quiz() {

    const navigate = useNavigate();
    const { isModalOpen, setModalOpen } = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [foods, setFoods] = useState<Food[]>([]);

    const [userChoices50Section, setUserChoices50Section] = useState<Food[]>([]);
    const [userChoices25TopSection, setUserChoices25TopSection] = useState<Food[]>([]);
    const [userChoices25BottomSection, setUserChoices25BottomSection] = useState<Food[]>([]);

    // request dishes from Flask database
    useEffect(() => {
        async function getFoods() {
        const res = await fetch("/get_foods");
        const data = await res.json();

        setFoods(data);
        setIsLoading(false);
        }

        setTimeout(() => {
        getFoods();
        }, 2000);
    }, []);


    /* dropping onto plate */

    const handleDrop50 = (event: React.DragEvent<HTMLDivElement>) => {
        const dataString = event.dataTransfer.getData("application/json");
        const { name, imgURL } = JSON.parse(dataString);

        /**
         * User can place dish on section on plate iff there isn't already a dish there
         */
        if (currentPlate["50%"].length === 0) {
            const updatedFoods = foods.filter((food) => {
                return food.name !== name;
            });
            setFoods(updatedFoods);
        
            const updatedUserChoices50Section = [
                ...userChoices50Section,
                { name: name, imgURL: imgURL },
            ];
            setUserChoices50Section(updatedUserChoices50Section);
    
            currentPlate["50%"].push(
                { name: name, imgURL: imgURL }
            )
            console.log(currentPlate)
        }
    };


    const handleDrop25Top = (event: React.DragEvent<HTMLDivElement>) => {
        const dataString = event.dataTransfer.getData("application/json");
        const { name, imgURL } = JSON.parse(dataString);
        
        if (currentPlate["25% top"].length === 0) {
            const updatedFoods = foods.filter((food) => {
                return food.name !== name;
            });
            setFoods(updatedFoods);
        
            const updatedUserChoices25TopSection = [
                ...userChoices25TopSection,
                { name: name, imgURL: imgURL },
            ];
            setUserChoices25TopSection(updatedUserChoices25TopSection);
    
            currentPlate["25% top"].push(
                { name: name, imgURL: imgURL }
            )
            console.log(currentPlate)
        }
        
    };


    const handleDrop25Bottom = (event: React.DragEvent<HTMLDivElement>) => {
        const dataString = event.dataTransfer.getData("application/json");
        const { name, imgURL } = JSON.parse(dataString);

        if (currentPlate["25% bottom"].length === 0) {
            const updatedFoods = foods.filter((food) => {
                return food.name !== name;
            });
            setFoods(updatedFoods);

            const updatedUserChoices25BottomSection = [
                ...userChoices25BottomSection,
                { name: name, imgURL: imgURL },
            ];
            setUserChoices25BottomSection(updatedUserChoices25BottomSection);
            currentPlate["25% bottom"].push(
                { name: name, imgURL: imgURL }
            )
            console.log(currentPlate)
        }   
    };


    /* removing from plate */

    const removeFromPlate50 = (food: string) => {
        const removedFood = userChoices50Section.find((item) => item.name === food);
        if (!removedFood) return;
    
        // updatedUserChoices50Section
        const updatedUserChoices50Section = userChoices50Section.filter(
            (item) => item.name !== food,
        );
        setUserChoices50Section(updatedUserChoices50Section);
        setFoods([...foods, removedFood]);

        currentPlate["50%"] = []
        // console.log(foods)
    };

    const removeFromPlate25Top = (food: string) => {
        const removedFood = userChoices25TopSection.find((item) => item.name === food);
        if (!removedFood) return;
    
        const updatedUserChoices25TopSection = userChoices25TopSection.filter(
            (item) => item.name !== food,
        );
        setUserChoices25TopSection(updatedUserChoices25TopSection);
        setFoods([...foods, removedFood]);

        currentPlate["25% top"] = []
        // console.log(currentPlate)
    };


    const removeFromPlate25Bottom = (food: string) => {
        const removedFood = userChoices25BottomSection.find((item) => item.name === food);
        if (!removedFood) return;
    
        const updatedUserChoices25BottomSection = userChoices25BottomSection.filter(
            (item) => item.name !== food,
        );
        setUserChoices25BottomSection(updatedUserChoices25BottomSection);
        setFoods([...foods, removedFood]);
        
        currentPlate["25% bottom"] = []
        // console.log(currentPlate)
    };


    const handleSubmission = () => {
        // post meal submission to database
        const allMeals = [].concat(...Object.values(currentPlate));
        console.log(allMeals)

        // handle dish-tribution calculation logic here:

        
        
        navigate('../quiz/results') // move to results page
    }

    return (
        <div className="container mt-9" draggable={false}>
            <QuizModal />
            <div className="row" draggable={false}>
                <div className="col-md-6 left-column" draggable={false}>

                    {/* <div draggable={false}>
                        Fat: []%;
                        Protein: []%;
                        Carbs: []%;
                    </div> */}
                    
                    {/* Plate: */}

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

                <div className="col-md-6 right-column">
                    <p className="select-none font-semibold text-xl mt-3">Meals:</p>

                    {/* loaded food list */}
                    <FoodList isLoading={isLoading} foods={foods}/>

                    {/* submit button */}
                    <Button color={"blue"} onClick={handleSubmission} className="font-normal my-[1.875rem] mb-[10rem]" id="submit-button" outline>Submit</Button>
                </div>

            </div>
        </div>
    )
}