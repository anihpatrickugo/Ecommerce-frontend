import React from "react";
import { useState, createContext, useContext } from "react";

const categoriesContext = createContext("");

const CategoriesContextProvider = ({ children }) => {
  const [category, setCategory] = useState("");

  return (
    <categoriesContext.Provider value={{ category, setCategory }}>
      {children}
    </categoriesContext.Provider>
  );
};

export const useCategory = () => useContext(categoriesContext);

export default CategoriesContextProvider;
