"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DataType {
  currentGame: string;
  setCurrentGame: Dispatch<SetStateAction<string>>;
  isguess: boolean;
  setIsGuess: Dispatch<SetStateAction<boolean>>;
}

const initialState: DataType = {
  currentGame: "",
  setCurrentGame: () => "",
  isguess: false,
  setIsGuess: () => null,
};

const AppContext = createContext<DataType>(initialState);

export const AppContextProvider = ({ children }: any) => {
  const [currentGame, setCurrentGame] = useState<string>("");
  const [isguess, setIsGuess] = useState<boolean>(false);
  const values = {
    currentGame,
    setCurrentGame,
    isguess,
    setIsGuess,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
