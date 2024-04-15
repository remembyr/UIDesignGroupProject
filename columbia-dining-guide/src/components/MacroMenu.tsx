//slide 4, 9, 14
import React from "react";
import { MyModal } from "./Modal";
import { SimpleNavbar } from "./SimpleNavbar";
import { Card } from "flowbite-react";


//slide 2

function MacroMenu() {
  return (
    <>
      <SimpleNavbar />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <h1 className="text-2xl dark:text-white">Macro Menu</h1>
        <MyModal />
      </main>
    </>
  );
}

export default MacroMenu;