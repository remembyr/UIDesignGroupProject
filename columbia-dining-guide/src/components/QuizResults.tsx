import { useModal } from "../contexts/ModalContext";
import { Card, Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Plate from "./Plate";
import {useNavigate} from "react-router-dom";

export default function QuizResults() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        Plate:

                        <Plate />

                    </div>
                    <div className="col-md-6">
                        Well done!

                        Your final dish-tribution was:
                    </div>

                </div>
            </div>
        </>
    )
}