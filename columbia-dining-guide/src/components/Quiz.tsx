/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { Button, Card, Spinner } from "flowbite-react";
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

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

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

export default function Quiz() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);
  const [quizStage, setQuizStage] = useState<number>(1);
  const [plateTotal, setPlateTotal] = useState<number>(0);
  const [plateProtein, setPlateProtein] = useState<number>(0);
  const [plateCarbs, setPlateCarbs] = useState<number>(0);
  const [plateFats, setPlateFats] = useState<number>(0);

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

    async function getLockedFood() {
      const req = await fetch("http://127.0.0.1:5000/get_locked_food", {
        method: "POST",
        body: JSON.stringify({ quizStage: quizStage }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await req.json();

      console.log(data.lockedFood.name);

      currentPlate["50%"].push({
        name: data.lockedFood.name,
        imgURL: data.lockedFood.imgURL,
        protein: data.lockedFood.protein,
        carbs: data.lockedFood.carbs,
        fats: data.lockedFood.fats,
      });

      const updatedUserChoices50Section = [
        ...userChoices50Section,
        {
          name: data.lockedFood.name,
          imgURL: data.lockedFood.imgURL,
          protein: data.lockedFood.protein,
          carbs: data.lockedFood.carbs,
          fats: data.lockedFood.fats,
        },
      ];
      setUserChoices50Section(updatedUserChoices50Section);

      setPlateTotal(
        plateTotal +
          data.lockedFood.protein +
          data.lockedFood.carbs +
          data.lockedFood.fats,
      );
      console.log(plateTotal);
      setPlateProtein(plateProtein + data.lockedFood.protein);
      setPlateCarbs(plateCarbs + data.lockedFood.carbs);
      setPlateFats(plateFats + data.lockedFood.fats);
      setIsLoading(false);
    }

    setTimeout(() => {
      getFoods();
      getLockedFood();
    }, 2000);
  }, [quizStage]);

  async function updateQuizScores() {
    const sectionSolution = {
      quizStage: quizStage,
      food1: userChoices25TopSection[0].name,
      food2: userChoices25BottomSection[0].name,
      protein: plateProtein,
      carbs: plateCarbs,
      fat: plateFats,
    };
    console.log(sectionSolution);
    const req = await fetch("http://127.0.0.1:5000/update_quiz_scores", {
      method: "POST",
      body: JSON.stringify(sectionSolution),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await req.json();

    console.log(data);
  }

  /* dropping onto plate */

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

      setPlateTotal(plateTotal + protein + carbs + fats);
      setPlateProtein(plateProtein + protein);
      setPlateCarbs(plateCarbs + carbs);
      setPlateFats(plateFats + fats);

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

      setPlateTotal(plateTotal + protein + carbs + fats);
      setPlateProtein(plateProtein + protein);
      setPlateCarbs(plateCarbs + carbs);
      setPlateFats(plateFats + fats);

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

    setPlateTotal(
      plateTotal - removedFood.protein - removedFood.carbs - removedFood.fats,
    );
    setPlateProtein(plateProtein - removedFood.protein);
    setPlateCarbs(plateCarbs - removedFood.carbs);
    setPlateFats(plateFats - removedFood.fats);

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

    setPlateTotal(
      plateTotal - removedFood.protein - removedFood.carbs - removedFood.fats,
    );
    setPlateProtein(plateProtein - removedFood.protein);
    setPlateCarbs(plateCarbs - removedFood.carbs);
    setPlateFats(plateFats - removedFood.fats);

    currentPlate["25% bottom"] = [];
    // console.log(currentPlate)
  };

  const [answerCorrect, setAnswerCorrect] = useState<boolean>(true);
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
      allMeals.length >= 3 &&
      0.4 <= plateCarbs / plateTotal &&
      0.6 >= plateCarbs / plateTotal &&
      0.2 <= plateProtein / plateTotal &&
      0.4 >= plateProtein / plateTotal &&
      0.1 <= plateFats / plateTotal &&
      0.3 >= plateFats / plateTotal
    ) {
      updateQuizScores();
      setUserChoices25BottomSection([]);
      setUserChoices25TopSection([]);
      setUserChoices50Section([]);
      setPlateTotal(0);
      setPlateProtein(0);
      setPlateCarbs(0);
      setPlateFats(0);
      currentPlate = {
        "50%": [],
        "25% top": [],
        "25% bottom": [],
      };
      //send this information to database, need to make user score API
      if (quizStage == 3) {
        navigate("../quiz/results");
      } else {
        setQuizStage(quizStage + 1);
      }
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false); // Set answer correctness to false if conditions are not met
    }
  };

  return (
    <div className="container mt-12 min-h-screen" draggable={false}>
      <QuizModal />
      <div className="min-w-screen mb-6 flex items-center justify-between text-xl font-medium ">
        <span>
          <span className="mr-4 rounded-lg border border-gray-200 bg-white p-[10px] shadow-sm">
            Protein: {plateProtein}g (
            {plateProtein / plateTotal
              ? Math.round((plateProtein / plateTotal) * 100)
              : 0}
            %)
          </span>
          <span className="mr-4 rounded-lg border border-gray-200 bg-white p-[10px] shadow-sm">
            Carbs: {plateCarbs}g (
            {plateCarbs / plateTotal
              ? Math.round((plateCarbs / plateTotal) * 100)
              : 0}
            %)
          </span>
          <span className="rounded-lg border border-gray-200 bg-white p-[10px] shadow-sm">
            Fat: {plateFats}g (
            {plateFats / plateTotal
              ? Math.round((plateFats / plateTotal) * 100)
              : 0}
            %)
          </span>
        </span>
        <span className="rounded-lg border border-gray-200 bg-white p-[10px] shadow-sm">
          Meal {quizStage}/3
        </span>
      </div>
      <div className="row" draggable={false}>
        <div className="col-md-6 left-column" draggable={false}>
          {/* <div draggable={false}>
                        Fat: []%;
                        Protein: []%;
                        Carbs: []%;
                    </div> */}

          {/* Plate: */}

          {!isLoading ? (
            <MacroPlate
              onDrop25Top={handleDrop25Top}
              onDrop25Bottom={handleDrop25Bottom}
              macro="Carb"
              food50={userChoices50Section}
              food25_1={userChoices25TopSection}
              food25_2={userChoices25BottomSection}
              removeFromPlate25Top={removeFromPlate25Top}
              removeFromPlate25Bottom={removeFromPlate25Bottom}
            />
          ) : (
            <div className="h-100 flex w-10/12 items-center justify-center rounded-full bg-gray-200 shadow-sm">
              <Spinner />
            </div>
          )}
        </div>

        <div className="col-md-6 right-column">
          <p className="mb-4 mt-3 select-none text-2xl font-semibold">
            Drag foods to the plate to balance the meal!
          </p>

          {/* loaded food list */}
          <FoodList isLoading={isLoading} foods={foods} />

          {!answerCorrect && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Your answer is incorrect!</span>{" "}
              Please adjust your selections before continuing.
            </Alert>
          )}
          {/* submit button */}
          <Button
            style={{ backgroundColor: "#008901" }}
            onClick={handleSubmission}
            className="mt-4"
            id="submit-button"
          >
            {quizStage !== 3 ? "Submit & Continue" : "Submit & Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
