import React from 'react';
import { Card } from 'flowbite-react';
import FoodEntry from './FoodEntry';

const FoodList = () => {
    return (
       <>
        <Card className='overflow-y-auto h-96 bg-gray-100'>
            <div className="flex flex-col space-y-2 py-4 mt-96 mb-2">
                <FoodEntry />
                <FoodEntry />
                <FoodEntry />
                <FoodEntry />
                <FoodEntry />
            </div>
        </Card>
       </>
    )
}

export default FoodList;