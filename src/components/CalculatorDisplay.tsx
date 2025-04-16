import { cn } from "@/lib/utils";

interface CalculatorDisplayProps {
  value: string;
  expression?: string;
  className?: string;
  colorScheme?: "purple" | "blue" | "green" | "orange";
  resultAnimation?: boolean;
}

const CalculatorDisplay = ({
  value,
  expression = "",
  className,
  colorScheme = "purple",
  resultAnimation = false,
}: CalculatorDisplayProps) => {
  return (
    <div
      className={cn(
        "w-full p-4 mb-4 rounded-lg glass-effect overflow-hidden text-right",
        className
      )}
    >
      {expression && (
        <div className="text-sm text-muted-foreground truncate mb-1">
          {expression}
        </div>
      )}
      <div
        className={cn(
          "text-3xl font-bold truncate",
          resultAnimation && "animate-[bounce_0.5s_ease]"
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
