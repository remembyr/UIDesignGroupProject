import React from 'react';
import { Card } from 'flowbite-react';
import FoodEntry from './FoodEntry';

interface GoodBadSortingPlateProps {
  onDropGood: (event: React.DragEvent<HTMLDivElement>) => void;
  onDropBad: (event: React.DragEvent<HTMLDivElement>) => void;
  macro: String;
  goodFoods: String[];
  badFoods: String[];
}

const GoodBadSortingPlate: React.FC<GoodBadSortingPlateProps> = ({ onDropGood, onDropBad, macro, goodFoods, badFoods }) => {
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
        className="relative rounded-full bg-green-100 flex justify-center shadow-sm"
        style={{ borderRadius: '50% 0 0 50%', width: '250px', height: '500px' }}
        onDrop={(event) => handleDrop(event, 'good')}
        onDragOver={handleDragOver}
      >
      <div>
        <span className="relative -right-10 top-16 text-green-800 text-xl font-semibold">Good {macro}s</span>
        <div className="relative -right-4 top-20 text-lg text-gray-600 text-right">
            {goodFoods.map((foodName) => (
              <div>{foodName}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Bad Section */}
      <div
        className="relative rounded-full bg-red-100 flex justify-center  shadow-sm"
        style={{ borderRadius: '0 50% 50% 0', width: '250px', height: '500px' }}
        onDrop={(event) => handleDrop(event, 'bad')}
        onDragOver={handleDragOver}
      >
        <div>
          <span className="relative -left-6 top-16 text-red-800 text-xl font-semibold">Bad {macro}s</span>
          <div className="relative -left-6 top-20 text-lg text-gray-600">
              {badFoods.map((foodName) => (
                <div>{foodName}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodBadSortingPlate;