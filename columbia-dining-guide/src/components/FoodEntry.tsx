import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import ProteinImg from "../images/macros/protein.jpg"

const FoodEntry = () => {

    /*TO-DO: Implement drag and drop
    https://www.w3schools.com/html/html5_draganddrop.asp */

    const handleDragStart = (event: any) => {
        event.dataTransfer.setData('text/plain', "Food Name");
    };

    return (
       <>
        <Card
            draggable={true}
            onDragStart={handleDragStart}
            className="flex p-1 border border-gray-300 rounded"
        >
            <div className='flex items-center justify-between'>
                <img className="w-35 h-20 mr-4 rounded flex-shrink-0" src={ProteinImg} alt="food" />
                <h2 className="text-2xl font-semibold flex-grow">Food Name</h2>
            </div>
        </Card>
       </>
    )
}

export default FoodEntry;