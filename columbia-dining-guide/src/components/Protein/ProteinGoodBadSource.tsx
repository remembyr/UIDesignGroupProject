//slide 6, 11, 16
import React, { useEffect, useState } from "react";
import { MyModal } from "../Modal";
import { SimpleNavbar } from "../SimpleNavbar";
import { Card, Button } from "flowbite-react";
import proteinImage from "../../images/macros/protein.jpg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { ProteinModal } from "./ProteinModal";
import { ProteinQualityModal } from "./ProteinQualityModal";
import GoodBadSortingPlate from "../GoodBadSortingPlate";
import FoodList from "../FoodList";

interface Food {
  name: string;
  imgURL: string;
}

function ProteinGoodBadSource() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function getFoods() {
      const res = await fetch("/get_foods");
      const data = await res.json();

      console.log(data)
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
      updateUserProgress();
      navigate("/learn/macros");
    }
  };

  async function updateUserProgress() {
    const res = await fetch("http://127.0.0.1:5000/get_user");
    let data = await res.json();
    data.completedProtein = true;
    console.log(data);

    const req = await fetch("http://127.0.0.1:5000/update_user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let updateRes = await req.json();
    console.log(updateRes);
  }

  const handleDropGood = (event: React.DragEvent<HTMLDivElement>) => {
    // Handle dropping good items here
    console.log('Dropped a good item!');
  };

  const handleDropBad = (event: React.DragEvent<HTMLDivElement>) => {
    // Handle dropping bad items here
    console.log('Dropped a bad item!');
  };

  return (
    <>
      <ProteinQualityModal />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="grid max-w-6xl grid-cols-2 gap-20">
          <div>
            <GoodBadSortingPlate onDropGood={handleDropGood} onDropBad={handleDropBad}/>
          </div>
          <div>
            <h1 className="text-2xl dark:text-white mb-4">
              Drag the dining hall food to the plate if it's a good source of
              protein!
            </h1>
            <FoodList isLoading={isLoading} foods={foods}/>
            <Button className="mt-4" onClick={() => checkAnswer()}>Check Answer</Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProteinGoodBadSource;
