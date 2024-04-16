//slide 6, 11, 16
import React, {useEffect} from "react";
import { MyModal } from "../Modal";
import { SimpleNavbar } from "../SimpleNavbar";
import { Card, Button } from "flowbite-react";
import proteinImage from "../../images/macros/protein.jpg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { FatsModal } from "./FatsModal";

function FatsSortingGameSource () {
  const navigate = useNavigate();

  const checkAnswer = (() => {
    //logic for checking if correct
    if(true) {
      navigate("/learn/macros");
    }
  });

  return (
    <>
      <FatsModal />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="grid grid-cols-2 gap-20 max-w-5xl">
          <div>
            <img className="rounded-full" style={{ width: 450, height: 450 }} src={proteinImage} alt="Plate" />
          </div>
          <div>
            <h1 className="text-2xl dark:text-white">Drag the dining hall food to the plate if it's a good source of fat!</h1>
            List of foods goes here
            <Button onClick={() => checkAnswer()}>Check Answer</Button>
          </div>
        </div>     
      </main>
    </>
  );
}

export default FatsSortingGameSource;