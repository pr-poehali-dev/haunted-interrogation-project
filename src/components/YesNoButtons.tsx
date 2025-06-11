import { useState } from "react";

interface YesNoButtonsProps {
  onAnswer: (answer: boolean) => void;
  disabled: boolean;
}

const YesNoButtons = ({ onAnswer, disabled }: YesNoButtonsProps) => {
  const [clickedButton, setClickedButton] = useState<"yes" | "no" | null>(null);

  const handleClick = (answer: boolean) => {
    if (disabled) return;

    setClickedButton(answer ? "yes" : "no");
    onAnswer(answer);

    setTimeout(() => {
      setClickedButton(null);
    }, 1000);
  };

  return (
    <div className="flex gap-8 justify-center">
      <button
        onClick={() => handleClick(true)}
        disabled={disabled}
        className={`horror-button px-12 py-6 text-2xl font-bold text-white rounded-lg creepy-text
          transition-all duration-300 ${
            clickedButton === "yes" ? "jump-scare bg-green-600" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      >
        <span className="block text-4xl mb-2">✅</span>
        ДА
      </button>

      <button
        onClick={() => handleClick(false)}
        disabled={disabled}
        className={`horror-button px-12 py-6 text-2xl font-bold text-white rounded-lg creepy-text
          transition-all duration-300 ${
            clickedButton === "no" ? "jump-scare bg-red-800" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      >
        <span className="block text-4xl mb-2">❌</span>
        НЕТ
      </button>
    </div>
  );
};

export default YesNoButtons;
