import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal, Spinner } from "flowbite-react";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

interface Food {
    name: string;
    imgURL: string;
}

interface Meal {
  food1: string;
  food2: string;
  protein: number;
  carbs: number;
  fat: number;
}

export default function QuizResults() {

    const navigate = useNavigate();
    const { isModalOpen, setModalOpen } = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [meal1, setMeal1] = useState<Meal>({food1: "", food2: "", protein: 0, carbs: 0, fat:0});
    const [meal2, setMeal2] = useState<Meal>({food1: "", food2: "", protein: 0, carbs: 0, fat:0});
    const [meal3, setMeal3] = useState<Meal>({food1: "", food2: "", protein: 0, carbs: 0, fat:0});
    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
      async function getQuizScores() {
        const res = await fetch("http://127.0.0.1:5000/get_quiz_scores");
        const data = await res.json();
  
        console.log(data);
        setMeal1(data["1"]);
        setMeal2(data["2"]);
        setMeal3(data["3"]);
        setIsLoading(false);
      }
  
      setTimeout(() => {
        getQuizScores();
      }, 2000);
  
    }, []);

    return (
        <>
        <main className="flex min-h-screen items-center justify-center dark:bg-gray-800">
          <Card className="max-w-5xl">
            <h1 className="text-2xl">Well done!</h1>
            <h2 className="text-xl">
              You passed all three challenges. Here are your final dish-tributions:
            </h2>
  
            {isLoading ? (
              <div className="mb-2 gap-4 flex items-center justify-between">
              <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Buffalo Chicken Wrap
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><Spinner className="ml-28"/>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <Spinner className="ml-28"/>
                    </div>
                  </Card>
                  <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Lentil Curry
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><Spinner className="ml-28"/>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <Spinner className="ml-28"/>
                    </div>
                  </Card>
                  <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Caesar Salad
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><Spinner className="ml-28"/>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <Spinner className="ml-28"/>
                    </div>
                  </Card>
            
              </div>
            ) : (
              <div className="mb-2 gap-4 flex items-center justify-between">
              <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Buffalo Chicken Wrap
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><span className="text-gray-900 pl-4">{meal1.food1}</span><br /><span className="text-gray-900 pl-4">{meal1.food2}</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: {meal1.protein}g ({Math.round((meal1.protein/(meal1.carbs+meal1.fat+meal1.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: {meal1.carbs}g ({Math.round((meal1.carbs/(meal1.carbs+meal1.fat+meal1.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: {meal1.fat}g ({Math.round((meal1.fat/(meal1.carbs+meal1.fat+meal1.protein))*100)}%)</span>
                    </div>
                  </Card>
                  <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Lentil Curry
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><span className="text-gray-900 pl-4">{meal2.food1}</span><br /><span className="text-gray-900 pl-4">{meal2.food2}</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: {meal2.protein}g ({Math.round((meal2.protein/(meal2.carbs+meal2.fat+meal2.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: {meal2.carbs}g ({Math.round((meal2.carbs/(meal2.carbs+meal2.fat+meal2.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: {meal3.fat}g ({Math.round((meal2.fat/(meal2.carbs+meal2.fat+meal2.protein))*100)}%)</span>
                    </div>
                  </Card>
                  <Card
                    className="max-w-md"
                  >
                    <div className="justify-center" style={{ display: "flex" }}>
                      <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Caesar Salad
                      </div>
                        <span style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                          <svg
                            className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        You selected:<br></br><span className="text-gray-900 pl-4">{meal3.food1}</span><br /><span className="text-gray-900 pl-4">{meal3.food2}</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: {meal3.protein}g ({Math.round((meal3.protein/(meal3.carbs+meal3.fat+meal3.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: {meal3.carbs}g ({Math.round((meal3.carbs/(meal3.carbs+meal3.fat+meal3.protein))*100)}%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: {meal3.fat}g ({Math.round((meal3.fat/(meal3.carbs+meal3.fat+meal3.protein))*100)}%)</span>
                    </div>
                  </Card>
            
              </div>
            )}
            <p className="font-normal text-gray-700">
              Great work passing the quiz. If you want to take it again, hit the button below.
            </p>
              <Button
                onClick={() => {setModalOpen(false); navigate("../quiz");}}
                style={{ backgroundColor: "#008901" }}
              >
                Try Again
              </Button>
          </Card>
        </main>
      </>
    )
}