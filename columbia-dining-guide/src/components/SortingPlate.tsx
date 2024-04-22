import React from 'react';
import { Card } from 'flowbite-react';
import FoodEntry from './FoodEntry';
import proteinImage from '../images/macros/protein.jpg';

interface SortingPlateProps {
    onDrop: (event: React.DragEvent<HTMLDivElement>) =>  void;
}

const SortingPlate: React.FC<SortingPlateProps> = ({onDrop}) => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDrop(event);
      };
    
      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };

    return (
      <div
        className="w-100 h-100 rounded-full bg-gray-300 flex justify-center shadow-sm"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <span className="relative top-16 text-gray-700 text-xl font-semibold">
            Drag proteins here
        </span>
      </div>
    )
}

export default SortingPlate;