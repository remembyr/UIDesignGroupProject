import React from "react";
import { Card, Spinner } from "flowbite-react";
import FoodEntry from "./FoodEntry";

interface Food {
  name: string;
  imgURL: string;
  protein?: number;
  carbs?: number;
  fats?: number;
}

interface FoodListProps {
  isLoading: boolean;
  foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ isLoading, foods }) => {
  if (isLoading) {
    return (
      <>
        <Card className="h-96 items-center justify-center overflow-y-auto bg-gray-100">
          <div className="mb-2 flex flex-col space-y-2 py-4">
            <Spinner />
          </div>
        </Card>
      </>
    );
  }

  if (!foods || foods.length == 0) {
    return (
      <>
        <Card className="h-96 overflow-y-auto bg-gray-100">
          <div className="mb-2 mt-96 flex flex-col space-y-2 py-4"></div>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="h-96 overflow-y-auto bg-gray-100">
        <div className="flex h-full flex-col space-y-2">
          {foods.map((food) => (
            <FoodEntry
              name={food.name}
              imgURL={food.imgURL}
              protein={food.protein}
              carbs={food.carbs}
              fats={food.fats}
              draggable
            />
          ))}
        </div>
      </Card>
    </>
  );
};

export default FoodList;
