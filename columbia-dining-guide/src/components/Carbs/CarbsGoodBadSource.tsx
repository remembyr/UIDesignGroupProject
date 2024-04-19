//slide 6, 11, 16
import React, { useEffect } from "react";
import { MyModal } from "../Modal";
import { SimpleNavbar } from "../SimpleNavbar";
import { Card, Button } from "flowbite-react";
import proteinImage from "../../images/macros/protein.jpg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import { CarbsModal } from "./CarbsModal";
import { CarbsQualityModal } from "./CarbsQualityModal";

const CarbsGoodBadSource = () => {
  const navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useModal();

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
    data.completedCarbs = true;
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

  return (
    <>
      <CarbsQualityModal />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <div className="grid max-w-5xl grid-cols-2 gap-20">
          <div>
            <img
              className="rounded-full"
              style={{ width: 450, height: 450 }}
              src={proteinImage}
              alt="Plate"
            />
          </div>
          <div>
            <h1 className="text-2xl dark:text-white">
              Sort these dining hall foods into good and bad carbs!
            </h1>
            List of foods goes here
            <Button onClick={() => checkAnswer()}>Check Answer</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CarbsGoodBadSource;
