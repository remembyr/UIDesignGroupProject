import React from "react";

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
      className="w-100 h-100 flex justify-center rounded-full bg-gray-300 shadow-sm"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div>
        <span className="relative top-16 text-xl font-semibold text-gray-700">
          Drag {macro}s here
        </span>
        <div className="relative top-20 text-center text-lg text-gray-600">
          {foods.map((food) => (
            <div>
              {food.name}
              <button onClick={() => removeFromPlate(food.name)}>
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
