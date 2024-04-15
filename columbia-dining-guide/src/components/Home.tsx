import { DarkThemeToggle } from "flowbite-react";
import { MyModal } from "./Modal";

//slide 2

function Home() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <h1 className="text-2xl dark:text-white">Dining Guide</h1>
        <MyModal />
      </main>
    </>
  );
}

export default Home;
