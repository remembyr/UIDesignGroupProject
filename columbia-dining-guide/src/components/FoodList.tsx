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
        return (
            <>
        <Card className='overflow-y-auto h-96 bg-gray-100 items-center justify-center'>
            <div className="flex flex-col space-y-2 py-4 mb-2">
                <Spinner />
            </div>
        </Card>
       </>
        )
    }

    if(!foods || foods.length == 0) {
        return (
            <>
            <Card className='overflow-y-auto h-96 bg-gray-100'>
                <div className="flex flex-col space-y-2 py-4 mt-96 mb-2">
                </div>
            </Card>
           </>
        )
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