// src/contexts/ModalContext.js
import React, { createContext, useContext, useState } from "react";

const PassModalContext = createContext();

export const usePassModal = () => useContext(PassModalContext);

export const PassModalProvider = ({ children }) => {
  const [isPassModalOpen, setPassModalOpen] = useState(true);

  return (
    <PassModalContext.Provider value={{ isPassModalOpen, setPassModalOpen }}>
      {children}
    </PassModalContext.Provider>
  );
};
