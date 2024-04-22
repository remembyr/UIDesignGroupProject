import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import ProteinImg from "../images/macros/protein.jpg"

interface FoodEntryProps {
    name: string;
    imgURL: string;
    draggable?: boolean;
}

const FoodEntry: React.FC<FoodEntryProps> = ({ name, imgURL, draggable=true }) => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', name);
        event.dataTransfer.effectAllowed = 'move';
      };

    return (
       <>
        <Card
            draggable={draggable}
            onDragStart={handleDragStart}
            className={`cursor-pointer rounded-lg border border-gray-300 p-1 flex ${
                draggable ? 'draggable' : ''
              }`}
        >
            <div className='flex items-center justify-between'>
                <img className="w-35 h-20 mr-4 rounded flex-shrink-0" src={imgURL} alt="food" />
                <h2 className="text-2xl font-semibold flex-grow">{name}</h2>
            </div>
        </Card>
       </>
    )
}

export default FoodEntry;