/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import $ from "jquery";
import "jquery-ui";
import { Button } from "flowbite-react";
import 'bootstrap/dist/css/bootstrap.css';
// import Plate from "./Plate/Plate";
import {useNavigate} from "react-router-dom";
import { useDrag } from 'react-dnd'
import "./Plate/Plate.css"


export default function Quiz() {
    const navigate = useNavigate()
    let dishes: Object[]

    // getting dishes from database (doesn't work)
    fetch("http://localhost:5000/get_foods", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then((data) => {
        // console.log(data)
        dishes = data
        console.log(dishes)

        // add dishes to meal list
    })
    .catch(error => console.error('Error', error))

    let draggedDish: EventTarget & HTMLDivElement;

    // dish draged
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
        draggedDish = event.currentTarget
        console.log("element: ")
        console.log(event.currentTarget)
        console.log()
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
        event.preventDefault();
    }
    
    // dish dropped
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        console.log(`Somebody dropped an element:`);

        // element dragged to section of plate stored in draggedDish prior to dropping
        console.log(draggedDish)
        console.log(draggedDish.id)


        
    }
    

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        Plate:

                        {/* virtual plate (extremely rudimentary) */}
                        <div>
                            <div id="circle">
                                <div onDragOver={enableDropping} onDrop={handleDrop} id="percent50-segment">50%</div>
                                <div onDragOver={enableDropping} onDrop={handleDrop} id="percent20-segment">20%</div>
                                <div onDragOver={enableDropping} onDrop={handleDrop} id="percent30-segment">30%</div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        Meals:

                        {/* meal list gets appended here via Flask database */}
                        <div id="meal-list">
                            <div draggable="true" onDragStart={handleDragStart}  className="meal">Dish A</div>
                            <div draggable="true" onDragStart={handleDragStart} className="meal">Dish B</div>
                            <div draggable="true" onDragStart={handleDragStart} className="meal">Dish C</div>

                        </div>

                        <Button color={"blue"} onClick={() => navigate('../quiz/results')} className={"font-normal"} outline>Submit</Button>
                    </div>

                </div>
            </div>
        </>
    )
}