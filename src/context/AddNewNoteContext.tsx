import { createContext, ReactNode, useState } from "react";

interface AddNewNoteContextType {
  isNewNoteShow: boolean;
  toggleAddNewNote: () => void;
}

export const AddNewNoteContext = createContext<
  AddNewNoteContextType | undefined
>(undefined);

export const AddNewNoteProvider = ({ children }: { children: ReactNode }) => {
  const [isNewNoteShow, setIsNewNoteShow] = useState(false);

  const toggleAddNewNote = () => {
    setIsNewNoteShow((prev) => !prev);
  };

  return (
    <AddNewNoteContext.Provider value={{ isNewNoteShow, toggleAddNewNote }}>
      {children}
    </AddNewNoteContext.Provider>
  );
};
