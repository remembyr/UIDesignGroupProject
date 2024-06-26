import React from "react";
import { Card } from "flowbite-react";
import chart from "../images/macros/breakdown.png";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Breakdown = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <Card className="max-w-4xl">
          <h5 className="mb-0 mt-2 text-2xl">
            One last thing—let's put it all together with the 50-30-20 rule!
          </h5>
          <hr></hr>
          <div className="flex">
            <div className="mr-5 flex-col">
              <img
                src={chart}
                alt="chart with 50% carbs, 30% protein, and 20% fat"
              />
            </div>
            <div className="grow flex-col">
              <p className="mb-4 mt-1 max-w-2xl text-xl font-normal text-gray-700 dark:text-gray-400">
                The 50-30-20 rule is a dietary guideline suggesting that 50% of
                your calories should come from carbohydrates, 30% from proteins,
                and 20% from fats. This balance can help support sustained
                energy, optimal health, and weight management.
              </p>
              <p className="mt-1 max-w-2xl text-xl font-normal text-gray-700 dark:text-gray-400">
                Now that you know about macros and the 50-30-20 rule, you're
                ready to make a balanced meal!
              </p>
              <div className="mt-16 flex justify-end">
                <Button
                  size="xl"
                  onClick={() => navigate("/quiz")}
                  style={{ backgroundColor: "#008901" }}
                >
                  Quiz time!
                  <svg
                    className="size-6 pl-1 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default Breakdown;
