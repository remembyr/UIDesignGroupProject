import React from "react";
import { Card } from "flowbite-react";
import FoodEntry from "../FoodEntry";

interface Food {
  name: string;
  imgURL: string;
}

interface GoodBadSortingPlateProps {
  onDropGood: (event: React.DragEvent<HTMLDivElement>) => void;
  onDropBad: (event: React.DragEvent<HTMLDivElement>) => void;
  macro: string;
  goodFoods: Food[];
  badFoods: Food[];
  removeFromPlateGood: (food: string) => void;
  removeFromPlateBad: (food: string) => void;
}

const GoodBadSortingPlate: React.FC<GoodBadSortingPlateProps> = ({
  onDropGood,
  onDropBad,
  macro,
  goodFoods,
  badFoods,
  removeFromPlateGood,
  removeFromPlateBad,
}) => {
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    category: "good" | "bad",
  ) => {
    event.preventDefault();
    if (category === "good") {
      onDropGood(event);
    } else {
      onDropBad(event);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="grid grid-cols-2 gap-12">
      {/* Good Section */}
      <div
        className="relative flex justify-center rounded-full bg-green-100 shadow-sm"
        style={{ borderRadius: "50% 0 0 50%", width: "300px", height: "500px" }}
        onDrop={(event) => handleDrop(event, "good")}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <span className="relative -right-10 top-16 text-xl font-semibold text-green-800">
            Good {macro}s
          </span>
          <div className="relative -right-4 top-20 text-right text-lg text-gray-600">
            {goodFoods.map((food) => (
            <div className="flex justify-between items-center font-medium w-60 mb-1 p-[10px] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                <span>{food.name}</span>
              <button className="ml-2 font-semibold" onClick={() => removeFromPlateGood(food.name)}>
                &#x2715;
              </button>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bad Section */}
      <div
        className="relative flex justify-center rounded-full bg-red-100  shadow-sm"
        style={{ borderRadius: "0 50% 50% 0", width: "300px", height: "500px" }}
        onDrop={(event) => handleDrop(event, "bad")}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <span className="relative -left-6 top-16 text-xl font-semibold text-red-800">
            Bad {macro}s
          </span>
          <div className="relative -left-4 top-20 text-lg text-gray-600">
          {badFoods.map((food) => (
            <div className="flex justify-between items-center font-medium w-60 mb-1 p-[10px] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                <span>{food.name}</span>
              <button className="ml-2 font-semibold" onClick={() => removeFromPlateBad(food.name)}>
                &#x2715;
              </button>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodBadSortingPlate;
