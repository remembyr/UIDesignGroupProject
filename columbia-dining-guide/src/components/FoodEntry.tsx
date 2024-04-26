import React, { useState } from "react";
import { Card } from "flowbite-react";
import ProteinImg from "../images/macros/protein.jpg";

interface FoodEntryProps {
  name: string;
  imgURL: string;
  draggable?: boolean;
}

const FoodEntry: React.FC<FoodEntryProps> = ({
  name,
  imgURL,
  draggable = true,
}) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.stringify({ name, imgURL });
    event.dataTransfer.setData("application/json", data);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Card
        draggable={draggable}
        onDragStart={handleDragStart}
        className={`flex cursor-pointer rounded-lg border border-gray-300 p-1 ${
          draggable ? "draggable" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <img
            style={{ width: "7.5rem", height: "5rem" }}
            className="w-35 mr-4 h-20 shrink-0 rounded"
            src={imgURL}
            alt="food"
          />
          <h2 className="grow text-2xl font-semibold">{name}</h2>
        </div>
      </Card>
    </>
  );
};

export default FoodEntry;
