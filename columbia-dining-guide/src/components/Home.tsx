import {Button} from "flowbite-react";
import {useNavigate} from "react-router-dom";

//slide 2

function Home() {

  const navigate = useNavigate()

  return (
    <>
      <main className="min-h-screen items-center gap-2 dark:bg-gray-800">
        <div className="grid-cols-6 gap-4 items-center ml-20">
          <h1 className="text-7xl mb-8 mt-40">
            Dining Guide
          </h1>
          <h3 className="text-3xl text-gray-600 font-normal mb-8">
            Learn how to balance Columbia Dining meals.
          </h3>
          <Button color={"blue"} onClick={() => navigate('/learn/macros')} className={"font-normal"} outline>Start Learning</Button>
        </div>
      </main>
    </>
  );
}

export default Home;
