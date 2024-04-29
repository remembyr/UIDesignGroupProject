import React from "react";
import { Card } from 'flowbite-react';

interface Food {
  name: string;
  imgURL: string;
}

interface SortingPlateProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  macro: string;
  foods: Food[];
  removeFromPlate: (food: string) => void;
}

const SortingPlate: React.FC<SortingPlateProps> = ({
  onDrop,
  macro,
  foods,
  removeFromPlate,
}) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDrop(event);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="w-100 h-100 flex justify-center rounded-full bg-gray-200 shadow-sm"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-center">
        <span className="relative top-16 text-xl font-semibold text-gray-700">
          Drag {macro}s here
        </span>
        <div className="relative top-20 text-center text-lg text-gray-600">
          {foods.map((food) => (
            <div className="flex justify-between items-center font-medium w-72 mb-1 p-[10px] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                <span>{food.name}</span>
              <button className="ml-4 font-semibold" onClick={() => removeFromPlate(food.name)}>
                &#x2715;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingPlate;
