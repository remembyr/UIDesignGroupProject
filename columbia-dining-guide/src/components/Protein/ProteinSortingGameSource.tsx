//slide 6, 11, 16
import React, { useEffect, useState } from "react";
import { MyModal } from "../Modal";
import { SimpleNavbar } from "../SimpleNavbar";
import { Card, Button } from "flowbite-react";
import proteinImage from "../../images/macros/protein.jpg";
import FoodList from "../FoodList";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { ProteinModal } from "./ProteinModal";
import SortingPlate from "../SortingPlate";

interface Food {
  name: string;
  imgURL: string;
}

const ProteinSortingGameSource: React.FC = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function getFoods() {
      const res = await fetch("http://127.0.0.1:5000/get_foods");
      const data = await res.json();

      console.log(data);
      setFoods(data);
      setIsLoading(false);
    }

    setTimeout(() => {
      getFoods();
    }, 2000);
  }, []);

  const checkAnswer = () => {
    //logic for checking if correct
    if (true) {
      setModalOpen(false);
      navigate("/learn/protein-quality");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const foodType = event.dataTransfer.getData("text/plain");
    console.log(`Dropped ${foodType} onto the plate`);
  };

  return (
    <>
      <ProteinModal />
      <main className="flex min-h-screen items-center justify-center dark:bg-gray-800">
        <div className="grid max-w-6xl grid-cols-2 gap-4">
          <div className="mr-6">
            <SortingPlate onDrop={handleDrop} macro="protein" />
          </div>
          <div className="ml-12">
            <h1 className="mb-4 text-2xl dark:text-white">
              Drag the dining hall food to the plate if it's a good source of
              protein!
            </h1>
            <FoodList isLoading={isLoading} foods={foods} />
            <Button className="mt-4" onClick={() => checkAnswer()}>
              Check Answer
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProteinSortingGameSource;
