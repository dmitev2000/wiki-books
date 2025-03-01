import { createContext, useContext, useState, ReactNode } from "react";

interface AppDrawerContextType {
  isOpen: boolean;
  toggleAppDrawer: () => void;
  openAppDrawer: () => void;
  closeAppDrawer: () => void;
}

const AppDrawerContext = createContext<AppDrawerContextType | undefined>(undefined);

interface AppDrawerProviderProps {
  children: ReactNode;
}

export const AppDrawerProvider = ({ children }: AppDrawerProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAppDrawer = () => setIsOpen((prev) => !prev);
  const openAppDrawer = () => setIsOpen(true);
  const closeAppDrawer = () => setIsOpen(false);

  return (
    <AppDrawerContext.Provider value={{ isOpen, toggleAppDrawer, openAppDrawer, closeAppDrawer }}>
      {children}
    </AppDrawerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppDrawer = (): AppDrawerContextType => {
  const context = useContext(AppDrawerContext);
  if (!context) {
    throw new Error("useAppDrawer must be used within a AppDrawerProvider");
  }
  return context;
};
