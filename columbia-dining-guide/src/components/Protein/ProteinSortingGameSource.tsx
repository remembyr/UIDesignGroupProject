//slide 6, 11, 16
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import FoodList from "../FoodList";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { ProteinModal } from "./ProteinModal";
import FailModal from "../Sorting Games/FailModal";
import PassModal from "../Sorting Games/PassModal";
import { usePassModal } from "../../contexts/PassModalContext";
import { useFailModal } from "../../contexts/FailModalContext";
import SortingPlate from "../Sorting Games/SortingPlate";

interface Food {
  name: string;
  imgURL: string;
}

const ProteinSortingGameSource: React.FC = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const { isFailModalOpen, setFailModalOpen } = useFailModal();
  const { isPassModalOpen, setPassModalOpen } = usePassModal();
  const [numAway, setNumAway] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);
  const [userChoices, setUserChoices] = useState<String[]>([]);
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  useEffect(() => {
    async function getFoods() {
      const res = await fetch("http://127.0.0.1:5000/get_protein");
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
    const req = await fetch("http://127.0.0.1:5000/check_protein_source", {
      method: "POST",
      body: JSON.stringify({ userAnswer: userChoices }),
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
    const foodType = event.dataTransfer.getData("text/plain");
    console.log(`Dropped ${foodType} onto the plate`);
    const updatedFoods = foods.filter((food) => {
      return food.name !== foodType;
    });
    setFoods(updatedFoods);

    const updatedUserChoices: String[] = userChoices;
    updatedUserChoices.push(foodType);
    setUserChoices(updatedUserChoices);
    console.log(updatedUserChoices);
  };

  return (
    <>
      <ProteinModal />
      <PassModal description="Red lentil dahl, steak, and chickpeas are all great examples of foods with high protein content."
        nextURL="/learn/protein-quality"/>
      <FailModal description="Remember that proteins are typically found in animal products like meat, fish,
                and eggs, as well as in plant-based sources such as beans,
                lentils, and nuts." numAway={numAway}/>
      <main className="flex min-h-screen items-center justify-center dark:bg-gray-800">
        <div className="grid max-w-6xl grid-cols-2 gap-4">
          <div className="mr-6">
            <SortingPlate
              onDrop={handleDrop}
              macro="protein"
              foods={userChoices}
            />
          </div>
          <div className="ml-12">
            <h1 className="mb-4 text-2xl dark:text-white">
              Drag the dining hall food to the plate if it's a good source of
              protein!
            </h1>
            <FoodList isLoading={isLoading} foods={foods} />
            <Button
              className="mt-4"
              onClick={() => checkAnswer()}
              style={{ backgroundColor: "#ff4500" }}
            >
              Check Answer
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProteinSortingGameSource;
