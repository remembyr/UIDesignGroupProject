import React from "react";
import {Card} from "flowbite-react";
import chart from "../images/macros/pie-chart.png";
import {Button} from "flowbite-react";

const Breakdown = () => {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <Card className="max-w-4xl">
          <h5 className="mb-6">
            Let's put it all together with the 50-30-20 rule
          </h5>
          <div className="flex">
            <div className="flex-col mr-3">
              <img src={chart} alt="chart with 50% carbs, 30% protein, and 20% fat"/>
            </div>
            <div className="flex-col">
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-4 mb-4">
                The 50-30-20 rule is a dietary guideline suggesting that 50% of your calories should come from
                carbohydrates,
                30% from proteins, and 20% from fats. This balance can help support sustained energy, optimal health,
                and weight management.
              </p>
              <div className="flex justify-center">
                <Button color="blue" outline>Next</Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
);
}

export default Breakdown