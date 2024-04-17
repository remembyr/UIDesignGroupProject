"use client";
import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Plate from "./Plate";
import {useNavigate} from "react-router-dom";


export default function Quiz() {
    const navigate = useNavigate()

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        Plate:

                        <Plate />

                    </div>
                    <div className="col-md-6">
                        Meals:
                        <div id="meal-list">
                            <div>Dish A</div>
                            <div>Dish B</div>
                            <div>Dish C</div>

                        </div>

                        <Button color={"blue"} onClick={() => navigate('../quiz/results')} className={"font-normal"} outline>Submit</Button>
                    </div>

                </div>
            </div>
        </>
    )
}