/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
import React from "react";
import { Card } from "flowbite-react";
import FoodEntry from "../FoodEntry";

interface Food {
  name: string;
  imgURL: string;
}

interface MacroPlateProps {

  onDrop25Top: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop25Bottom: (event: React.DragEvent<HTMLDivElement>) => void;

  macro: string;

  food50: Food[];
  food25_1: Food[];
  food25_2: Food[];
  removeFromPlate25Top: (food: string) => void;
  removeFromPlate25Bottom: (food: string) => void;
}

const MacroPlate: React.FC<MacroPlateProps> = ({

  onDrop25Top,
  onDrop25Bottom,

  macro,

  food50,
  food25_1,
  food25_2,

  removeFromPlate25Top,
  removeFromPlate25Bottom
}) => {
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    category: "50percent" | "25percent_top" | "25percent_bottom"
  ) => {
    event.preventDefault();

    if (category === "25percent_top") {
      onDrop25Top(event)
    } else { // category == "25percent_bottom"
      onDrop25Bottom(event)
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="inline">
      {/* 50% Section */}
      <div
        className="relative float-left z-0 flex justify-center rounded-full bg-gray-200 shadow-sm"
        style={{ borderRadius: "250px 0 0 250px", width: "250px", height: "500px" }}
      >
        <div>
          <div className="relative -right-5 top-[11rem] text-right text-lg text-gray-600">

            {/* representation of individual dishes on plate */}
            {food50.map((food) => (
              <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] px-4 size-auto">
                <svg className="w-6 h-6 mx-auto text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                </svg>

                <p className="relative mb-0 text-center text-[0.75rem] font-semibold">{food.name}</p>

                <img className="block w-28 h-20 mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name} draggable="false"></img>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* two 25% Sections */}
      <div> 
        <div
          className="relative z-0 flex justify-center rounded-full bg-gray-300  shadow-sm"
          style={{ borderRadius: "0 250px 0 0", width: "250px", height: "250px" }}
          onDrop={(event) => handleDrop(event, "25percent_top")}
          onDragOver={handleDragOver}
        >
          <div>
            <div className="relative -left-6 top-20 text-lg text-gray-600">
              {food25_1.map((food) => (
                <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] px-4 size-auto">
                  <button className="relative top-0 right-0 hover:bg-blue-100 rounded-md px-[0.375rem]" onClick={() => removeFromPlate25Top(food.name)}>
                    &#x2715;
                  </button>

                  <p className="relative mb-0 text-center text-[0.75rem] font-semibold">{food.name}</p>

                  <img className="block w-28 h-20 mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name} draggable="false"></img>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div
          className="relative z-0 flex justify-center rounded-full bg-gray-400  shadow-sm"
          style={{ borderRadius: "0 0 250px 0", width: "250px", height: "250px" }}
          onDrop={(event) => handleDrop(event, "25percent_bottom")}
          onDragOver={handleDragOver}
        >
          <div>
            <div className="relative -left-6 top-[0.7rem] text-lg text-gray-600">
              {food25_2.map((food) => (
                <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] px-4 size-auto">
                  <button className="relative top-0 right-0 hover:bg-blue-100 rounded-md px-[0.375rem]" onClick={() => removeFromPlate25Bottom(food.name)}>
                    &#x2715;
                  </button>

                  <p className="relative mb-0 text-center text-[0.75rem] font-semibold">{food.name}</p>

                  <img className="block w-28 h-20 mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name} draggable="false"></img>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default MacroPlate;
