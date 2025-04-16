
import { createContext, useContext, useState, ReactNode } from "react";

type ColorScheme = "purple" | "blue" | "green" | "orange";

interface CalculationHistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  history: CalculationHistoryItem[];
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
  isHistoryOpen: boolean;
  toggleHistory: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("purple");
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const addToHistory = (expression: string, result: string) => {
    setHistory(prev => [
      { 
        expression, 
        result, 
        timestamp: new Date() 
      }, 
      ...prev
    ].slice(0, 50)); // Keep only the last 50 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(prev => !prev);
  };

  return (
    <CalculatorContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        history,
        addToHistory,
        clearHistory,
        isHistoryOpen,
        toggleHistory,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
