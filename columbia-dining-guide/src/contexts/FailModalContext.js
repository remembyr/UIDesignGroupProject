// src/contexts/ModalContext.js
import React, { createContext, useContext, useState } from "react";

const FailModalContext = createContext();

export const useFailModal = () => useContext(FailModalContext);

export const FailModalProvider = ({ children }) => {
  const [isFailModalOpen, setFailModalOpen] = useState(true);

  return (
    <FailModalContext.Provider value={{ isFailModalOpen, setFailModalOpen }}>
      {children}
    </FailModalContext.Provider>
  );
};
