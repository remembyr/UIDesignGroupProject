//slide 6, 11, 16
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import FoodList from "../FoodList";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { FatsModal } from "./FatsModal";
import FailModal from "../Sorting Games/FailModal";
import PassModal from "../Sorting Games/PassModal";
import { usePassModal } from "../../contexts/PassModalContext";
import { useFailModal } from "../../contexts/FailModalContext";
import SortingPlate from "../Sorting Games/SortingPlate";

interface Food {
  name: string;
  imgURL: string;
}

const FatsSortingGameSource: React.FC = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const { isFailModalOpen, setFailModalOpen } = useFailModal();
  const { isPassModalOpen, setPassModalOpen } = usePassModal();
  const [numAway, setNumAway] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);
  const [userChoices, setUserChoices] = useState<Food[]>([]);
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  useEffect(() => {
    async function getFoods() {
      const res = await fetch("http://127.0.0.1:5000/get_fats");
      const data = await res.json();

      console.log(data);
      setFoods(data);
      setIsLoading(false);
    }

    setTimeout(() => {
      getFoods();
    }, 2000);
  }, [forceUpdate]);

  const checkAnswer = async () => {
    const userAnswer = userChoices.map((choice) => choice.name);
    const req = await fetch("http://127.0.0.1:5000/check_fats_source", {
      method: "POST",
      body: JSON.stringify({ userAnswer: userAnswer }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let res = await req.json();
    if (res.isCorrect) {
      setPassModalOpen(false);
    } else {
      setNumAway(res.numAway);
      setFailModalOpen(false);
      setUserChoices([]);
      setForceUpdate(forceUpdate + 1);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL } = JSON.parse(dataString);
    console.log(`Dropped ${name} onto the plate`);
    const updatedFoods = foods.filter((food) => {
      return food.name !== name;
    });
    setFoods(updatedFoods);

    const updatedUserChoices = [...userChoices, { name: name, imgURL: imgURL }];
    setUserChoices(updatedUserChoices);
    console.log(updatedUserChoices);
  };

  const removeFromPlate = (food: string) => {
    const removedFood = userChoices.find((item) => item.name === food);
    if (!removedFood) return;

    const updatedUserChoices = userChoices.filter((item) => item.name !== food);
    setUserChoices(updatedUserChoices);
    setFoods([...foods, removedFood]);
  };

  return (
    <>
      <FatsModal />
      <PassModal
        description="Almonds, cheese pizza, and french fries are all great examples of foods high in fat."
        nextURL="/learn/fats-quality"
      />
      <FailModal
        description="Remember that fats are found in foods that contain oils, butter, cream, nuts, seeds, and fatty meats."
        numAway={numAway}
      />
      <main className="flex min-h-screen items-center justify-center dark:bg-gray-800">
        <div className="grid max-w-6xl grid-cols-2 gap-4">
          <div className="mr-6">
            <SortingPlate
              onDrop={handleDrop}
              macro="fat"
              foods={userChoices}
              removeFromPlate={removeFromPlate}
            />
          </div>
          <div className="ml-12">
            <h1 className="mb-4 text-2xl dark:text-white">
              Drag the dining hall food to the plate if it's a good source of
              fat!
            </h1>
            <FoodList isLoading={isLoading} foods={foods} />
            <Button
              className="mt-4"
              onClick={() => checkAnswer()}
              style={{ backgroundColor: "#008901" }}
            >
              Check Answer
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default FatsSortingGameSource;
