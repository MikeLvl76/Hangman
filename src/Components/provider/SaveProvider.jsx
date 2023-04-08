import { useState, useEffect } from "react";
import { SaveContext } from "../context/SaveContext";

export default function SaveProvider(props) {
  const [saves, setSaves] = useState(() => {
    const storedSaves = localStorage.getItem("saves");
    return storedSaves ? JSON.parse(storedSaves) : [];
  });

  useEffect(() => {
    localStorage.setItem("saves", JSON.stringify(saves));
  }, [saves]);

  const saveGame = (save) => {
    if (!save) alert('Error: Invalid value.')
    setSaves([...saves, save]);
  };

  const clearSaves = () => {
    setSaves([]);
    localStorage.clear();
  };

  return (
    <SaveContext.Provider value={{ saves, saveGame, clearSaves }}>
      {props.children}
    </SaveContext.Provider>
  );
}