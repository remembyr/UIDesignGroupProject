/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Button } from "flowbite-react";
import "bootstrap/dist/css/bootstrap.css";
import { useDrag } from "react-dnd";
import MacroPlate from "./Plate/MacroPlate";

import React, { useState, useEffect } from "react";
import FoodList from "./FoodList";
import { QuizModal } from "./QuizModal";

import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { stringify } from "querystring";
import { captureRejectionSymbol } from "events";

interface Food {
  name: string;
  imgURL: string;
  protein: number;
  carbs: number;
  fats: number;
}

// store dishes here
let currentPlate: { [key: string]: any } = {
  "50%": [],
  "25% top": [],
  "25% bottom": [],
};

let plateTotal = 0;
let plateProtein = 0;
let plateCarbs = 0;
let plateFats = 0;

export default function Quiz() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);

  const [userChoices50Section, setUserChoices50Section] = useState<Food[]>([]);
  const [userChoices25TopSection, setUserChoices25TopSection] = useState<
    Food[]
  >([]);
  const [userChoices25BottomSection, setUserChoices25BottomSection] = useState<
    Food[]
  >([]);

  // request dishes from Flask database
  useEffect(() => {
    async function getFoods() {
      const res = await fetch("http://127.0.0.1:5000/get_quiz1");
      const data = await res.json();

      setFoods(data);
      console.log(data);
      setIsLoading(false);
    }

    setTimeout(() => {
      getFoods();
    }, 2000);
  }, []);

  /* dropping onto plate */

  const handleDrop50 = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL, protein, carbs, fats } = JSON.parse(dataString);
    console.log(protein);

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
        {
          name: name,
          imgURL: imgURL,
          protein: protein,
          carbs: carbs,
          fats: fats,
        },
      ];
      setUserChoices50Section(updatedUserChoices50Section);

      currentPlate["50%"].push({
        name: name,
        imgURL: imgURL,
        protein: protein,
        carbs: carbs,
        fats: fats,
      });

      plateTotal = plateTotal + protein + carbs + fats;
      console.log(plateTotal);
      plateProtein = plateProtein + protein;
      plateCarbs = plateCarbs + carbs;
      plateFats = plateFats + fats;

      console.log(currentPlate);
    }
  };

  const handleDrop25Top = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL, protein, carbs, fats } = JSON.parse(dataString);

    if (currentPlate["25% top"].length === 0) {
      const updatedFoods = foods.filter((food) => {
        return food.name !== name;
      });
      setFoods(updatedFoods);

      const updatedUserChoices25TopSection = [
        ...userChoices25TopSection,
        {
          name: name,
          imgURL: imgURL,
          protein: protein,
          carbs: carbs,
          fats: fats,
        },
      ];
      setUserChoices25TopSection(updatedUserChoices25TopSection);

      plateTotal = plateTotal + protein + carbs + fats;
      plateProtein = plateProtein + protein;
      plateCarbs = plateCarbs + carbs;
      plateFats = plateFats + fats;

      currentPlate["25% top"].push({ name: name, imgURL: imgURL });
      console.log(currentPlate);
    }
  };

  const handleDrop25Bottom = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL, protein, carbs, fats } = JSON.parse(dataString);

    if (currentPlate["25% bottom"].length === 0) {
      const updatedFoods = foods.filter((food) => {
        return food.name !== name;
      });
      setFoods(updatedFoods);

      const updatedUserChoices25BottomSection = [
        ...userChoices25BottomSection,
        {
          name: name,
          imgURL: imgURL,
          protein: protein,
          carbs: carbs,
          fats: fats,
        },
      ];

      plateTotal = plateTotal + protein + carbs + fats;
      plateProtein = plateProtein + protein;
      plateCarbs = plateCarbs + carbs;
      plateFats = plateFats + fats;

      setUserChoices25BottomSection(updatedUserChoices25BottomSection);
      currentPlate["25% bottom"].push({
        name: name,
        imgURL: imgURL,
        protein: protein,
        carbs: carbs,
        fats: fats,
      });
      console.log(currentPlate);
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

    plateTotal =
      plateTotal - removedFood.protein - removedFood.carbs - removedFood.fats;
    plateProtein = plateProtein - removedFood.protein;
    plateCarbs = plateCarbs - removedFood.carbs;
    plateFats = plateFats - removedFood.fats;

    currentPlate["50%"] = [];

    // console.log(foods)
  };

  const removeFromPlate25Top = (food: string) => {
    const removedFood = userChoices25TopSection.find(
      (item) => item.name === food,
    );
    if (!removedFood) return;

    const updatedUserChoices25TopSection = userChoices25TopSection.filter(
      (item) => item.name !== food,
    );
    setUserChoices25TopSection(updatedUserChoices25TopSection);
    setFoods([...foods, removedFood]);

    plateTotal =
      plateTotal - removedFood.protein - removedFood.carbs - removedFood.fats;
    plateProtein = plateProtein - removedFood.protein;
    plateCarbs = plateCarbs - removedFood.carbs;
    plateFats = plateFats - removedFood.fats;

    currentPlate["25% top"] = [];
    // console.log(currentPlate)
  };

  const removeFromPlate25Bottom = (food: string) => {
    const removedFood = userChoices25BottomSection.find(
      (item) => item.name === food,
    );
    if (!removedFood) return;

    const updatedUserChoices25BottomSection = userChoices25BottomSection.filter(
      (item) => item.name !== food,
    );
    setUserChoices25BottomSection(updatedUserChoices25BottomSection);
    setFoods([...foods, removedFood]);

    plateTotal =
      plateTotal - removedFood.protein - removedFood.carbs - removedFood.fats;
    plateProtein = plateProtein - removedFood.protein;
    plateCarbs = plateCarbs - removedFood.carbs;
    plateFats = plateFats - removedFood.fats;

    currentPlate["25% bottom"] = [];
    // console.log(currentPlate)
  };

  const handleSubmission = () => {
    // post meal submission to database
    const allMeals = [].concat(...Object.values(currentPlate));
    console.log(allMeals);
    console.log(
      "carbs: " +
        plateCarbs +
        ", proteins: " +
        plateProtein +
        ", fats: " +
        plateFats,
    );

    // handle dish-tribution calculation logic here:

    if (
      allMeals.length == 3 &&
      0.4 <= plateCarbs / plateTotal &&
      0.6 >= plateCarbs / plateTotal &&
      0.2 <= plateProtein / plateTotal &&
      0.4 >= plateProtein / plateTotal &&
      0.1 <= plateFats / plateTotal &&
      0.3 >= plateFats / plateTotal
    ) {
      navigate("../quiz/results"); // move to results page
    }
  };

  return (
    <div className="container mt-12 min-h-screen" draggable={false}>
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
          <p className="mb-4 mt-3 select-none text-2xl font-semibold">
            Drag foods to the plate to balance the meal!
          </p>

          {/* loaded food list */}
          <FoodList isLoading={isLoading} foods={foods} />

          {/* submit button */}
          <Button
            style={{ backgroundColor: "#008901" }}
            onClick={handleSubmission}
            className="mt-4"
            id="submit-button"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
