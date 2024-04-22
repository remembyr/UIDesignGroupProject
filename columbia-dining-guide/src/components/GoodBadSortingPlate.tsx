import React from 'react';
import { Card } from 'flowbite-react';
import FoodEntry from './FoodEntry';

interface GoodBadSortingPlateProps {
  onDropGood: (event: React.DragEvent<HTMLDivElement>) => void;
  onDropBad: (event: React.DragEvent<HTMLDivElement>) => void;
}

const GoodBadSortingPlate: React.FC<GoodBadSortingPlateProps> = ({ onDropGood, onDropBad }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, category: 'good' | 'bad') => {
    event.preventDefault();
    if (category === 'good') {
      onDropGood(event);
    } else {
      onDropBad(event);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Good Section */}
      <div
        className="relative rounded-full overflow-hidden bg-green-200 flex justify-center items-center shadow-sm"
        style={{ borderRadius: '50% 0 0 50%', width: '250px', height: '500px', lineHeight: '500px'}}
        onDrop={(event) => handleDrop(event, 'good')}
        onDragOver={handleDragOver}
      >
        <span className="text-green-800 text-xl font-semibold">Good Proteins</span>
      </div>

      {/* Bad Section */}
      <div
        className="relative rounded-full overflow-hidden bg-red-200 flex justify-center items-center shadow-sm"
        style={{ borderRadius: '0 50% 50% 0', width: '250px', height: '500px', lineHeight: '500px' }}
        onDrop={(event) => handleDrop(event, 'bad')}
        onDragOver={handleDragOver}
      >
        <span className="text-red-800 text-xl font-semibold">Bad Proteins</span>
      </div>
    </div>
  );
};

export default GoodBadSortingPlate;