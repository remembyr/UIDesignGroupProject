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

  onDrop50: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop25Top: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop25Bottom: (event: React.DragEvent<HTMLDivElement>) => void;

  macro: string;

  food50: Food[];
  food25_1: Food[];
  food25_2: Food[];
  removeFromPlate50: (food: string) => void;
  removeFromPlate25Top: (food: string) => void;
  removeFromPlate25Bottom: (food: string) => void;
}

const MacroPlate: React.FC<MacroPlateProps> = ({

  onDrop50,
  onDrop25Top,
  onDrop25Bottom,

  macro,

  food50,
  food25_1,
  food25_2,

  removeFromPlate50,
  removeFromPlate25Top,
  removeFromPlate25Bottom
}) => {
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    category: "50percent" | "25percent_top" | "25percent_bottom"
  ) => {
    event.preventDefault();

    if (category === "50percent") {
      onDrop50(event)
    } else if (category === "25percent_top") {
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
        className="relative float-left z-0 flex justify-center rounded-full bg-green-100 shadow-sm"
        style={{ borderRadius: "250px 0 0 250px", width: "250px", height: "500px" }}
        onDrop={(event) => handleDrop(event, "50percent")}
        onDragOver={handleDragOver}
      >
        <div>
          {/* <span className="relative -right-10 top-16 text-xl font-semibold text-green-800">
            Good {macro}s
          </span> */}
          <div className="relative right-5 top-20 text-right text-lg text-gray-600">

            {/* representation of individual dishes on plate */}
            {food50.map((food) => (
              <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] size-auto">
                <button className="relative top-0 right-0 hover:bg-blue-100 rounded-md px-[0.375rem]" onClick={() => removeFromPlate50(food.name)}>
                  &#x2715; 
                </button>
                <p className="relative mb-0 mr-[0.5rem] text-center text-[0.75rem] font-semibold">{food.name}</p>

                <img className="block w-7/12 h-auto mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name}></img>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* two 25% Sections */}
      <div> 
        <div
          className="relative z-0 flex justify-center rounded-full bg-red-100  shadow-sm"
          style={{ borderRadius: "0 250px 0 0", width: "250px", height: "250px" }}
          onDrop={(event) => handleDrop(event, "25percent_top")}
          onDragOver={handleDragOver}
        >
          <div>
            {/* <span className="relative -left-6 top-16 text-xl font-semibold text-red-800">
              Bad {macro}s
            </span> */}
            <div className="relative -left-6 top-20 text-lg text-gray-600">
              {food25_1.map((food) => (
                <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] size-auto">
                  <button className="relative top-0 right-0 hover:bg-blue-100 rounded-md px-[0.375rem]" onClick={() => removeFromPlate25Top(food.name)}>
                    &#x2715;
                  </button>

                  <p className="relative mb-0 mr-[0.5rem] text-center text-[0.75rem] font-semibold">{food.name}</p>

                  <img className="block w-7/12 h-auto mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name}></img>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div
          className="relative z-0 flex justify-center rounded-full bg-blue-100  shadow-sm"
          style={{ borderRadius: "0 0 250px 0", width: "250px", height: "250px" }}
          onDrop={(event) => handleDrop(event, "25percent_bottom")}
          onDragOver={handleDragOver}
        >
          <div>
            {/* <span className="relative -left-6 top-16 text-xl font-semibold text-red-800">
              Bad {macro}s
            </span> */}
            <div className="relative -left-6 top-20 text-lg text-gray-600">
              {food25_2.map((food) => (
                <div className="bg-white rounded-2xl z-10 shadow-md p-[0.75rem] size-auto">
                  <button className="relative top-0 right-0 hover:bg-blue-100 rounded-md px-[0.375rem]" onClick={() => removeFromPlate25Bottom(food.name)}>
                    &#x2715;
                  </button>

                  <p className="relative mb-0 mr-[0.5rem] text-center text-[0.75rem] font-semibold">{food.name}</p>

                  <img className="block w-7/12 h-auto mx-auto pb-[0.75rem]" src={food.imgURL} alt={food.name}></img>
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
