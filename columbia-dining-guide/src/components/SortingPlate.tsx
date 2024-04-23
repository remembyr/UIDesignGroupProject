import React from 'react';

interface SortingPlateProps {
    onDrop: (event: React.DragEvent<HTMLDivElement>) =>  void;
    macro: string;
    foods: String[];
}

const SortingPlate: React.FC<SortingPlateProps> = ({onDrop, macro, foods}) => {
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
        <div>
          <span className="relative top-16 text-gray-700 text-xl font-semibold">
              Drag {macro}s here
          </span>
          <div className="relative top-20 text-center">
            {foods.map((foodName) => (
              <div>{foodName}</div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default SortingPlate;