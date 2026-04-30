// context/SelectContext.jsx
import { createContext, useContext, useState } from "react";

const FilaContext = createContext();

export function FilaProvider({ children }) {
  const [fila, setFila] = useState(null);

  return (
    <FilaContext.Provider value={{ fila, setFila }}>
      {children}
    </FilaContext.Provider>
  );
}

export function useFila( )
{
  return useContext(FilaContext);
}