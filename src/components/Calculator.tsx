import { useState, useEffect, useRef } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import { cn } from "@/lib/utils";
import {
  Plus,
  Minus,
  X,
  Divide,
  Equal,
  Percent,
  RotateCcw,
  Delete,
  ChevronDown,
  ChevronUp,
  Square,
  CircleDot,
  X as XIcon,
  PowerOff,
  History,
  Zap,
  Flame,
  Bomb,
  Wind,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useCalculator } from "@/context/CalculatorContext";
import CalculatorHistory from "./CalculatorHistory";
const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [resultAnimation, setResultAnimation] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const { toggleHistory, addToHistory } = useCalculator();

  // Clear all values and reset the calculator
  const clear = () => {
    setCurrentValue("0");
    setExpression("");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  // Clear only the current entry
  const clearEntry = () => {
    setCurrentValue("0");
    setWaitingForOperand(false);
  };

  // Input a digit
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setCurrentValue(digit);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === "0" ? digit : currentValue + digit);
    }
  };

  // Input a decimal point
  const inputDot = () => {
    if (waitingForOperand) {
      setCurrentValue("0.");
      setWaitingForOperand(false);
    } else if (currentValue.indexOf(".") === -1) {
      setCurrentValue(currentValue + ".");
    }
  };

  // Toggle the sign of the current value
  const toggleSign = () => {
    setCurrentValue(
      currentValue.charAt(0) === "-"
        ? currentValue.substring(1)
        : "-" + currentValue
    );
  };

  // Calculate percentage
  const inputPercent = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(String(value / 100));
  };

  // Perform an operation with an operator
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(currentValue);
    if (prevValue === null) {
      setPrevValue(currentValue);
      setExpression(`${currentValue} ${nextOperator}`);
    } else if (operator) {
      const currentValueNum = parseFloat(currentValue);
      const previousValueNum = parseFloat(prevValue);
      let newValue: number;
      switch (operator) {
        case "+":
          newValue = previousValueNum + currentValueNum;
          break;
        case "-":
          newValue = previousValueNum - currentValueNum;
          break;
        case "×":
          newValue = previousValueNum * currentValueNum;
          break;
        case "÷":
          newValue = previousValueNum / currentValueNum;
          break;
        case "x^y":
          newValue = Math.pow(previousValueNum, currentValueNum);
          break;
        default:
          newValue = currentValueNum;
      }
      setPrevValue(String(newValue));
      setCurrentValue(String(newValue));
      setExpression(`${newValue} ${nextOperator}`);
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  // Calculate the final result
  const calculate = () => {
    if (!prevValue || !operator) return;
    const currentValueNum = parseFloat(currentValue);
    const previousValueNum = parseFloat(prevValue);
    let newValue: number;
    switch (operator) {
      case "+":
        newValue = previousValueNum + currentValueNum;
        break;
      case "-":
        newValue = previousValueNum - currentValueNum;
        break;
      case "×":
        newValue = previousValueNum * currentValueNum;
        break;
      case "÷":
        newValue = previousValueNum / currentValueNum;
        break;
      case "x^y":
        newValue = Math.pow(previousValueNum, currentValueNum);
        break;
      default:
        newValue = currentValueNum;
    }
    const resultStr = String(newValue);
    const fullExpression = `${previousValueNum} ${operator} ${currentValueNum} =`;
    setCurrentValue(resultStr);
    setExpression(`${fullExpression}`);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);

    // Add to history and trigger animation
    addToHistory(fullExpression, resultStr);
    setResultAnimation(true);
  };

  // Reset animation state after animation completes
  useEffect(() => {
    if (resultAnimation) {
      const timer = setTimeout(() => {
        setResultAnimation(false);
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [resultAnimation]);

  // Reset active animation after animation completes
  useEffect(() => {
    if (activeAnimation) {
      const timer = setTimeout(() => {
        setActiveAnimation(null);
      }, 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [activeAnimation]);

  // Handle the mode toggle with rotation animation
  const toggleScientific = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsScientific(!isScientific);
      setTimeout(() => {
        setIsFlipping(false);
      }, 150);
    }, 150);
  };

  // Scientific calculator functions
  const squareRoot = () => {
    const value = parseFloat(currentValue);
    const result = Math.sqrt(value);
    setCurrentValue(String(result));
    setExpression(`sqrt(${value})`);
    setWaitingForOperand(true);
  };
  const square = () => {
    const value = parseFloat(currentValue);
    const result = value * value;
    setCurrentValue(String(result));
    setExpression(`${value}²`);
    setWaitingForOperand(true);
  };
  const sin = () => {
    const value = parseFloat(currentValue);
    const result = Math.sin(value * (Math.PI / 180)); // Convert to radians
    setCurrentValue(String(result));
    setExpression(`sin(${value}°)`);
    setWaitingForOperand(true);
  };
  const cos = () => {
    const value = parseFloat(currentValue);
    const result = Math.cos(value * (Math.PI / 180)); // Convert to radians
    setCurrentValue(String(result));
    setExpression(`cos(${value}°)`);
    setWaitingForOperand(true);
  };
  const tan = () => {
    const value = parseFloat(currentValue);
    const result = Math.tan(value * (Math.PI / 180)); // Convert to radians
    setCurrentValue(String(result));
    setExpression(`tan(${value}°)`);
    setWaitingForOperand(true);
  };
  const ln = () => {
    const value = parseFloat(currentValue);
    const result = Math.log(value);
    setCurrentValue(String(result));
    setExpression(`ln(${value})`);
    setWaitingForOperand(true);
  };
  const log = () => {
    const value = parseFloat(currentValue);
    const result = Math.log10(value);
    setCurrentValue(String(result));
    setExpression(`log(${value})`);
    setWaitingForOperand(true);
  };
  const pi = () => {
    setCurrentValue(String(Math.PI));
    setWaitingForOperand(true);
  };
  const exp = () => {
    setCurrentValue(String(Math.E));
    setWaitingForOperand(true);
  };

  // Animation functions
  const triggerAnimation = (type: string) => {
    setActiveAnimation(type);
  };
  return (
    <div
      className={cn(
        "p-6 rounded-xl overflow-hidden glass-effect transition-all duration-300 relative perspective",
        isFlipping ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100",
        isScientific ? "w-[360px]" : "w-[320px]",
        activeAnimation === "kick" && "animate-[bounce_0.5s_ease]",
        activeAnimation === "punch" && "animate-[shake_0.5s_ease]",
        activeAnimation === "shake" && "animate-[wiggle_0.5s_ease]",
        activeAnimation === "hit" && "animate-[flash_0.5s_ease]",
        "border-neon-purple/30"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-purple neon-text text-xl text-center ">
          GenZCalc
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {isScientific ? "Scientific" : "Basic"}
          </span>
          <Switch
            checked={isScientific}
            onCheckedChange={toggleScientific}
            className="data-[state=checked]:bg-neon-purple rounded-3xl"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          <button
            onClick={() => triggerAnimation("kick")}
            className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-neon-purple"
            title="Kick calculator"
          >
            <Zap size={18} />
          </button>
          <button
            onClick={() => triggerAnimation("punch")}
            className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-neon-pink"
            title="Punch calculator"
          >
            <Flame size={18} />
          </button>
          <button
            onClick={() => triggerAnimation("shake")}
            className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-neon-blue"
            title="Shake calculator"
          >
            <Wind size={18} />
          </button>
          <button
            onClick={() => triggerAnimation("hit")}
            className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-neon-orange"
            title="Hit calculator"
          >
            <Bomb size={18} />
          </button>
        </div>
        <button
          onClick={toggleHistory}
          className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
        >
          <History size={18} />
        </button>
      </div>

      <CalculatorDisplay
        value={currentValue}
        expression={expression}
        className="relative overflow-hidden animate-[float_3s_ease-in-out_infinite] border-neon-purple/20"
        colorScheme="purple"
        resultAnimation={resultAnimation}
      />

      <div
        className={cn(
          "grid gap-2 transition-all duration-300",
          isScientific ? "grid-cols-5" : "grid-cols-4"
        )}
      >
        {/* Basic calculator buttons */}
        <CalculatorButton onClick={clear} variant="clear" colorScheme="purple">
          AC
        </CalculatorButton>
        <CalculatorButton
          onClick={toggleSign}
          variant="operator"
          colorScheme="purple"
        >
          +/-
        </CalculatorButton>
        <CalculatorButton
          onClick={inputPercent}
          variant="operator"
          colorScheme="purple"
        >
          <Percent size={18} />
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation("÷")}
          variant="operator"
          colorScheme="purple"
        >
          <Divide size={18} />
        </CalculatorButton>

        {isScientific && (
          <CalculatorButton
            onClick={sin}
            variant="function"
            colorScheme="purple"
          >
            sin
          </CalculatorButton>
        )}

        <CalculatorButton onClick={() => inputDigit("7")} colorScheme="purple">
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("8")} colorScheme="purple">
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("9")} colorScheme="purple">
          9
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation("×")}
          variant="operator"
          colorScheme="purple"
        >
          <X size={18} />
        </CalculatorButton>

        {isScientific && (
          <CalculatorButton
            onClick={cos}
            variant="function"
            colorScheme="purple"
          >
            cos
          </CalculatorButton>
        )}

        <CalculatorButton onClick={() => inputDigit("4")} colorScheme="purple">
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("5")} colorScheme="purple">
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("6")} colorScheme="purple">
          6
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation("-")}
          variant="operator"
          colorScheme="purple"
        >
          <Minus size={18} />
        </CalculatorButton>

        {isScientific && (
          <CalculatorButton
            onClick={tan}
            variant="function"
            colorScheme="purple"
          >
            tan
          </CalculatorButton>
        )}

        <CalculatorButton onClick={() => inputDigit("1")} colorScheme="purple">
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("2")} colorScheme="purple">
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit("3")} colorScheme="purple">
          3
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation("+")}
          variant="operator"
          colorScheme="purple"
        >
          <Plus size={18} />
        </CalculatorButton>

        {isScientific && (
          <CalculatorButton
            onClick={ln}
            variant="function"
            colorScheme="purple"
          >
            ln
          </CalculatorButton>
        )}

        <CalculatorButton
          onClick={() => inputDigit("0")}
          className="col-span-2"
          colorScheme="purple"
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDot} colorScheme="purple">
          .
        </CalculatorButton>
        <CalculatorButton
          onClick={calculate}
          variant="equals"
          colorScheme="purple"
        >
          <Equal size={18} />
        </CalculatorButton>

        {isScientific && (
          <CalculatorButton
            onClick={log}
            variant="function"
            colorScheme="purple"
          >
            log
          </CalculatorButton>
        )}

        {/* Additional scientific buttons */}
        {isScientific && (
          <>
            <CalculatorButton
              onClick={squareRoot}
              variant="function"
              colorScheme="purple"
            >
              <CircleDot size={18} />
            </CalculatorButton>
            <CalculatorButton
              onClick={square}
              variant="function"
              colorScheme="purple"
            >
              x²
            </CalculatorButton>
            <CalculatorButton
              onClick={() => performOperation("x^y")}
              variant="function"
              colorScheme="purple"
            >
              x^y
            </CalculatorButton>
            <CalculatorButton
              onClick={pi}
              variant="function"
              colorScheme="purple"
            >
              π
            </CalculatorButton>
            <CalculatorButton
              onClick={exp}
              variant="function"
              colorScheme="purple"
            >
              e
            </CalculatorButton>
          </>
        )}
      </div>

      <CalculatorHistory />
    </div>
  );
};
export default Calculator;
