// src/components/SimpleNavbar.js
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function SimpleNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar fluid rounded className="bg-gray-200 p-3">
      <NavbarBrand href="/" style={{ textDecorationLine: "none" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Fruit.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Fruit Logo"
        />
        <span
          style={{ fontSize: "1.8rem", color: "#222222" }}
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
          Dining Guide
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button
          className="m-2 rounded px-1 font-bold hover:bg-gray-700"
          onClick={() => navigate("/learn/macros")}
          style={{ backgroundColor: "#ff4500" }}
        >
          Learn
        </Button>
        <Button
          className="text-gray m-2 rounded bg-gray-100 px-1 font-bold hover:bg-gray-700"
          color="gray"
          onClick={() => navigate("/quiz")}
        >
          Quiz
        </Button>
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
