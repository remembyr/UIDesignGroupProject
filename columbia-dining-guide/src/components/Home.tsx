import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

//slide 2

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className="min-h-screen items-center gap-2 dark:bg-gray-800">
        <div className="ml-20 grid-cols-6 items-center gap-4">
          <h1 className="mb-8 mt-40 text-7xl">Dining Guide</h1>
          <h3 className="mb-8 text-3xl font-normal text-gray-600">
            Learn how to balance Columbia Dining meals.
          </h3>
          <Button
            onClick={() => navigate("/learn/macros")}
            className={"font-semibold"}
          >
            Start Learning
          </Button>
        </div>
      </main>
    </>
  );
}

export default Home;
