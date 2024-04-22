//slide 4, 9, 14
import React, { useState, useEffect } from "react";
import { MyModal } from "./Modal";
import { SimpleNavbar } from "./SimpleNavbar";
import { Card, Button, Spinner } from "flowbite-react";
import proteinImage from "../images/macros/protein.jpg";
import carbsImage from "../images/macros/carbs.jpg";
import fatsImage from "../images/macros/fats.jpg";
import carbsBW from "../images/macros/carbsbw.jpg";
import fatsBW from "../images/macros/fatsbw.jpg";
import { useNavigate } from "react-router-dom";

function MacroMenu() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [proteinProgress, setProteinProgress] = useState<boolean>(false);
  const [carbProgress, setCarbProgress] = useState<boolean>(false);
  const [fatProgress, setFatProgress] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/get_user");
      const data = await res.json();

      console.log(data);
      setProteinProgress(data.completedProtein);
      setCarbProgress(data.completedCarbs);
      setFatProgress(data.completedFat);
      setIsLoading(false);
    }

    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <Card className="max-w-4xl">
          <h1 className="text-2xl dark:text-white">What are macronutrients?</h1>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Macronutrients are the nutrients your body needs in large amounts to
            maintain essential functions and provide energy. They include
            proteins, carbohydrates, and fats, each serving unique roles in
            building and repairing tissues, fueling bodily processes, and
            supporting overall health.
          </p>
          <h2 className="text-xl dark:text-white">
            Pick a macronutrient to explore:
          </h2>
          
            {isLoading ? <div className="mb-4 flex items-center justify-between px-24">
              <Spinner />
              <Spinner />
              <Spinner /> </div>
              :

            <div className="mb-4 flex items-center justify-between">
            <Card
              className="max-w-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/learn/protein-source")}
              renderImage={() => (
                <img
                  style={{ width: 250, height: 175 }}
                  src={proteinImage}
                  alt="Foods with high protein"
                />
              )}
            >
              <div style={{ display: "flex" }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Proteins
                </h5>
                {proteinProgress && (
                  <span style={{ paddingLeft: "7%", paddingTop: "4%" }}>
                    <svg
                      className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </Card>
            {proteinProgress ? (
              <Card
                className="max-w-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/learn/carbs-source")}
                renderImage={() => (
                  <img
                    style={{ width: 250, height: 175 }}
                    src={carbsImage}
                    alt="Foods with high carbs"
                  />
                )}
              >
                <div style={{ display: "flex" }}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Carbs
                  </h5>
                  {carbProgress && (
                    <span style={{ paddingLeft: "7%", paddingTop: "4%" }}>
                      <svg
                        className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </Card>
            ) : (
              <Card
                className="max-w-sm"
                renderImage={() => (
                  <img
                    style={{ width: 250, height: 175 }}
                    src={carbsBW}
                    alt="Foods with high carbs"
                  />
                )}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Carbs
                </h5>
              </Card>
            )}
            {carbProgress ? (
              <Card
                className="max-w-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/learn/fat-source")}
                renderImage={() => (
                  <img
                    style={{ width: 250, height: 175 }}
                    src={fatsImage}
                    alt="Foods with high fat content"
                  />
                )}
              >
                <div style={{ display: "flex" }}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Fats
                  </h5>
                  {fatProgress && (
                    <span style={{ paddingLeft: "7%", paddingTop: "4%" }}>
                      <svg
                        className="size-3.5 text-green-600 dark:text-blue-300 lg:size-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </Card>
            ) : (
              <Card
                className="max-w-sm"
                renderImage={() => (
                  <img
                    style={{ width: 250, height: 175 }}
                    src={fatsBW}
                    alt="Foods with high fat content"
                  />
                )}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Fats
                </h5>
              </Card>
            )}
            </div>
          }
          {proteinProgress && carbProgress && fatProgress && (
            <Button onClick={() => navigate("/learn/breakdown")}>
              Continue
            </Button>
          )}
        </Card>
      </main>
    </>
  );
}

export default MacroMenu;
