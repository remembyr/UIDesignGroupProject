//slide 6, 11, 16
import React, { useEffect, useState } from "react";
import { MyModal } from "../Modal";
import { SimpleNavbar } from "../SimpleNavbar";
import { Card, Button } from "flowbite-react";
import fatsImage from "../../images/macros/fats.jpg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { FatsModal } from "./FatsModal";
import FatsQualityModal from "./FatsQualityModal";
import FailModal from "../Sorting Games/FailModal";
import PassModal from "../Sorting Games/PassModal";
import { usePassModal } from "../../contexts/PassModalContext";
import { useFailModal } from "../../contexts/FailModalContext";
import GoodBadSortingPlate from "../Sorting Games/GoodBadSortingPlate";
import FoodList from "../FoodList";

interface Food {
  name: string;
  imgURL: string;
}

function FatsGoodBadSource() {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();
  const { isFailModalOpen, setFailModalOpen } = useFailModal();
  const { isPassModalOpen, setPassModalOpen } = usePassModal();
  const [numAway, setNumAway] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState<Food[]>([]);
  const [goodUserChoices, setGoodUserChoices] = useState<Food[]>([]);
  const [badUserChoices, setBadUserChoices] = useState<Food[]>([]);
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  useEffect(() => {
    async function getFoods() {
      const res = await fetch("http://127.0.0.1:5000/get_fats_quality");
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
    const userAnswer = goodUserChoices.map((choice) => choice.name);
    const req = await fetch("http://127.0.0.1:5000/check_fats_quality", {
      method: "POST",
      body: JSON.stringify({ userAnswer: userAnswer }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let res = await req.json();
    if (res.isCorrect) {
      setPassModalOpen(false);
      updateUserProgress();
    } else {
      setNumAway(res.numAway);
      setFailModalOpen(false);
      setBadUserChoices([]);
      setGoodUserChoices([]);
      setForceUpdate(forceUpdate + 1);
    }
  };

  async function updateUserProgress() {
    const res = await fetch("http://127.0.0.1:5000/get_user");
    let data = await res.json();
    data.completedFat = true;
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
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL } = JSON.parse(dataString);
    const updatedFoods = foods.filter((food) => {
      return food.name !== name;
    });
    setFoods(updatedFoods);

    const updatedGoodUserChoices = [
      ...goodUserChoices,
      { name: name, imgURL: imgURL },
    ];
    setGoodUserChoices(updatedGoodUserChoices);
  };

  const handleDropBad = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = event.dataTransfer.getData("application/json");
    const { name, imgURL } = JSON.parse(dataString);
    const updatedFoods = foods.filter((food) => {
      return food.name !== name;
    });
    setFoods(updatedFoods);

    const updatedBadUserChoices = [
      ...badUserChoices,
      { name: name, imgURL: imgURL },
    ];
    setBadUserChoices(updatedBadUserChoices);
  };

  const removeFromPlateGood = (food: string) => {
    const removedFood = goodUserChoices.find((item) => item.name === food);
    if (!removedFood) return;

    const updatedGoodUserChoices = goodUserChoices.filter(
      (item) => item.name !== food,
    );
    setGoodUserChoices(updatedGoodUserChoices);
    setFoods([...foods, removedFood]);
  };

  const removeFromPlateBad = (food: string) => {
    const removedFood = badUserChoices.find((item) => item.name === food);
    if (!removedFood) return;

    const updatedBadUserChoices = badUserChoices.filter(
      (item) => item.name !== food,
    );
    setBadUserChoices(updatedBadUserChoices);
    setFoods([...foods, removedFood]);
  };

  return (
    <>
      <FatsQualityModal />
      <PassModal
        description="The avocado in guacamole provides is a great source of healthy fat. Salmon and almonds are also great options for unsaturated fat!"
        nextURL="/learn/macros"
      />
      <FailModal
        description="Remember that healthy, unsaturated fats can be found in nuts, seeds, fish, and avocados. 
      Try to stay away from trans fats in fried food and saturated fats in red meat and dairy products."
        numAway={numAway}
      />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="grid max-w-6xl grid-cols-2 gap-20">
          <div>
            <GoodBadSortingPlate
              onDropGood={handleDropGood}
              onDropBad={handleDropBad}
              macro="Fat"
              goodFoods={goodUserChoices}
              badFoods={badUserChoices}
              removeFromPlateGood={removeFromPlateGood}
              removeFromPlateBad={removeFromPlateBad}
            />
          </div>
          <div>
            <h1 className="mb-4 text-2xl dark:text-white">
              Drag the dining hall food to the correct side of the plate
              depending on if it's a good or bad fat!
            </h1>
            <FoodList isLoading={isLoading} foods={foods} />
            <Button
              className="mt-4"
              onClick={() => checkAnswer()}
              disabled={foods.length > 0}
              style={{ backgroundColor: "#ff4500" }}
            >
              Check Answer
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FatsGoodBadSource;
