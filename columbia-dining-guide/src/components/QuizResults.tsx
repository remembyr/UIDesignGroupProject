import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

interface Food {
    name: string;
    imgURL: string;
}

export default function QuizResults() {

    const navigate = useNavigate();
    const { isModalOpen, setModalOpen } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [foods, setFoods] = useState<Food[]>([]);

    return (
        <>
        <main className="flex min-h-screen items-center justify-center dark:bg-gray-800">
          <Card className="max-w-5xl">
            <h1 className="text-2xl">Well done!</h1>
            <h2 className="text-xl">
              You passed all three challenges. Here are your final dish-tributions:
            </h2>
  
            {isLoading ? (
              <div className="mb-2 flex items-center justify-between px-24">
                <Spinner />
                <Spinner />
                <Spinner />{" "}
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
                        You selected:<br></br><span className="text-gray-900 pl-4">Food 1</span><br /><span className="text-gray-900 pl-4">Food 2</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: 0g (0%)</span>
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
                        You selected:<br></br><span className="text-gray-900 pl-4">Food 1</span><br /><span className="text-gray-900 pl-4">Food 2</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: 0g (0%)</span>
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
                        You selected:<br></br><span className="text-gray-900 pl-4">Food 1</span><br /><span className="text-gray-900 pl-4">Food 2</span>
                    </div>
                    <div className="text-xl text-gray-400 font-medium">
                        Macronutrient breakdown of this meal:<br></br>
                        <span className="text-gray-900 pl-4">Protein: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Carbohydrates: 0g (0%)</span><br />
                        <span className="text-gray-900 pl-4">Fat: 0g (0%)</span>
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