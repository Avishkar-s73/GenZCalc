import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  variant?: "default" | "operator" | "function" | "equals" | "clear";
  colorScheme?: "purple";
}

const CalculatorButton = ({
  onClick,
  children,
  className,
  variant = "default",
  colorScheme = "purple",
}: CalculatorButtonProps) => {
  const baseStyles =
    "calculator-button flex items-center justify-center text-lg font-medium rounded-lg p-3 transition-all";

  // Define color scheme based styles
  const colorSchemeStyles = {
    purple: {
      operator: "bg-primary/80 hover:bg-primary text-background neon-glow",
      function: "bg-accent/80 hover:bg-accent text-foreground neon-pink",
      equals:
        "bg-neon-purple hover:bg-neon-purple/80 text-background neon-glow",
    },
  };

  const variantStyles = {
    default: "bg-secondary/80 hover:bg-secondary text-foreground",
    operator: colorSchemeStyles[colorScheme].operator,
    function: colorSchemeStyles[colorScheme].function,
    equals: colorSchemeStyles[colorScheme].equals,
    clear: "bg-destructive/80 hover:bg-destructive text-destructive-foreground",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
