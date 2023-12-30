"use client";
import io from "socket.io-client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { api_call } from "@/utils/service/constant";


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

export const useAppContext = () => useContext(AppContext)
