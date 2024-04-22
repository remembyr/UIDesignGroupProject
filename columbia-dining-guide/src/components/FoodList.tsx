import React from 'react';
import { Card, Spinner } from 'flowbite-react';
import FoodEntry from './FoodEntry';

interface Food {
    name: string;
    imgURL: string;
}

interface FoodListProps {
    isLoading: boolean;
    foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ isLoading, foods }) => {
    if(isLoading) {
        return <Spinner />;
    }

    if(!foods || foods.length == 0) {
        return <p>Uh oh. No food items found.</p>;
    }

    return (
       <>
        <Card className='overflow-y-auto h-96 bg-gray-100'>
            <div className="flex flex-col space-y-2 py-4 mt-96 mb-2">
                {foods.map((food) => (
                    <FoodEntry name={food.name} imgURL={food.imgURL} draggable/>
                ))}
            </div>
        </Card>
       </>
    )
}

export default FoodList;