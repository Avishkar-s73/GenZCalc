import { X } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface CalculatorHistoryProps {
  className?: string;
}

const CalculatorHistory = ({ className }: CalculatorHistoryProps) => {
  const { history, isHistoryOpen, toggleHistory, clearHistory, colorScheme } =
    useCalculator();

  if (!isHistoryOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-0 right-0 w-full h-full z-10 glass-effect p-4 rounded-xl overflow-hidden",
        "animate-slide-in-right transition-all duration-300 ease-out",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold neon-text">Calculation History</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleHistory}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100%-80px)]">
          <p className="text-muted-foreground text-sm">
            No calculation history yet
          </p>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[calc(100%-80px)] pr-2">
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg glass-effect border border-white/5 transition-all hover:border-white/10"
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {format(item.timestamp, "MM/dd/yyyy HH:mm:ss")}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {item.expression}
                  </div>
                  <div
                    className={cn(
                      "text-lg font-bold truncate",
                      colorScheme === "purple" && "text-neon-purple"
                    )}
                  >
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mb-5  flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="text-xs bg-purple-500"
            >
              Clear History
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CalculatorHistory;
