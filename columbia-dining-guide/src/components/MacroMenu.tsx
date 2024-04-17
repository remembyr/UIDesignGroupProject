//slide 4, 9, 14
import React, { useState, useEffect } from "react";
import { MyModal } from "./Modal";
import { SimpleNavbar } from "./SimpleNavbar";
import { Card, Button } from "flowbite-react";
import proteinImage from "../images/macros/protein.jpg";
import carbsImage from "../images/macros/carbs.jpg";
import fatsImage from "../images/macros/fats.jpg";
import {useNavigate} from "react-router-dom";

function MacroMenu() {

  const navigate = useNavigate()

  const [proteinProgress, setProteinProgress] = useState<boolean>(false);
  const [carbProgress, setCarbProgress] = useState<boolean>(false);
  const [fatProgress, setFatProgress] = useState<boolean>(false);

  useEffect(()=> {
    fetch("/user").then(
      res => res.json()
    ).then(
      data => {
        setProteinProgress(data.user.completedProtein);
        setCarbProgress(data.user.completedCarbs);
        setFatProgress(data.user.completedFat);
        console.log(data);
      }
    )
  }, [])

  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <Card className="max-w-4xl">
            <h1 className="text-2xl dark:text-white">What are macronutrients?</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">Macronutrients are the nutrients your body needs in large amounts to maintain essential functions and provide energy. They include proteins, carbohydrates, and fats, each serving unique roles in building and repairing tissues, fueling bodily processes, and supporting overall health.</p>
            <h2 className="text-xl dark:text-white">Pick a macronutrient to explore:</h2>
            <div className="mb-4 flex items-center justify-between">
                <Card className="max-w-sm" href="/learn/protein-source" renderImage={() => <img style={{ width: 250, height: 175 }} src={proteinImage} alt="Foods with high protein" />}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Proteins
                    </h5>
                </Card>
                {proteinProgress && (
                    <Card className="max-w-sm" href="/learn/carbs-source" renderImage={() => <img style={{ width: 250, height: 175 }} src={carbsImage} alt="Foods with high carbs" />}>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Carbs
                      </h5>
                    </Card>
                  )}
                {/*{!proteinProgress && ( 
                    <Card className="max-w-sm" renderImage={() => <img style={{ width: 250, height: 175 }} src={carbsImage} alt="Foods with high carbs" />}>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Carbs (do protein first)
                      </h5>
                    </Card>
                  )
                }*/}
                <Card className="max-w-sm" href="/learn/fat-source" renderImage={() => <img style={{ width: 250, height: 175 }} src={fatsImage} alt="Foods with high fat content" />}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Fats
                    </h5>
                </Card>
            </div>
            <Button onClick={() => navigate("/learn/breakdown")}>Continue</Button>
        </Card>
      </main>
    </>
  );
}

export default MacroMenu;