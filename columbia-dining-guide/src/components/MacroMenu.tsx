//slide 4, 9, 14
import React from "react";
import { MyModal } from "./Modal";
import { SimpleNavbar } from "./SimpleNavbar";
import { Card } from "flowbite-react";
import proteinImage from "../images/macros/protein.jpg";
import carbsImage from "../images/macros/carbs.jpg";
import fatsImage from "../images/macros/fats.jpg";

function MacroMenu() {

  return (
    <>
      <SimpleNavbar />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <Card className="max-w-4xl">
            <h1 className="text-2xl dark:text-white">What are macronutrients?</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">Macronutrients are the nutrients your body needs in large amounts to maintain essential functions and provide energy. They include proteins, carbohydrates, and fats, each serving unique roles in building and repairing tissues, fueling bodily processes, and supporting overall health.</p>
            <h2 className="text-xl dark:text-white">Pick a macronutrient to explore:</h2>
            <div className="mb-4 flex items-center justify-between">
                <Card className="max-w-sm" href="/" renderImage={() => <img style={{ width: 250, height: 175 }} src={proteinImage} alt="Foods with high protein" />}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Proteins
                    </h5>
                </Card>
                <Card className="max-w-sm" href="/" renderImage={() => <img style={{ width: 250, height: 175 }} src={carbsImage} alt="Foods with high carbs" />}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Carbs
                    </h5>
                </Card>
                <Card className="max-w-sm" href="/" renderImage={() => <img style={{ width: 250, height: 175 }} src={fatsImage} alt="Foods with high fat content" />}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Fats
                    </h5>
                </Card>
            </div>
        </Card>
      </main>
    </>
  );
}

export default MacroMenu;