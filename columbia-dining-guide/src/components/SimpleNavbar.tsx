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
import { useModal } from "../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

export function SimpleNavbar() {
  const navigate = useNavigate();
  // const { setModalOpen } = useModal();

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Fruit.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Fruit Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Dining Guide
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {/* <Button onClick={() => setModalOpen(true)}>Get started</Button> */}
        <Button onClick={() => navigate("/learn")}>Get started</Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
