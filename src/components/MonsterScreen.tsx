import { useState, useEffect } from "react";
import YesNoButtons from "./YesNoButtons";
import JumpScare from "./JumpScare";
import GhostEffect from "./GhostEffect";
import SoundManager from "./SoundManager";

const horrorQuestions = [
  "Ты один дома?",
  "Слышишь ли ты шаги за спиной?",
  "Видишь ли тень в углу комнаты?",
  "Хочешь узнать, что случилось с предыдущими посетителями?",
  "Готов ли ты остаться здесь навсегда?",
  "Чувствуешь ли холод на своей шее?",
  "Веришь ли в призраков?",
  "Боишься ли темноты?",
  "Слышишь ли шепот?",
  "Хочешь увидеть мое истинное лицо?",
];

const MonsterScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showJumpScare, setShowJumpScare] = useState(false);
  const [monsterMood, setMonsterMood] = useState<
    "waiting" | "angry" | "pleased"
  >("waiting");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // Случайные скримеры
    const jumpScareTimer = setInterval(() => {
      if (Math.random() < 0.15 && gameStarted) {
        triggerJumpScare();
      }
    }, 8000);

    return () => clearInterval(jumpScareTimer);
  }, [gameStarted]);

  const triggerJumpScare = () => {
    setShowJumpScare(true);
    setTimeout(() => setShowJumpScare(false), 300);
  };

  const handleAnswer = (answer: boolean) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Логика реакции монстра
    if (Math.random() < 0.3) {
      triggerJumpScare();
    }

    setMonsterMood(
      answer ? (Math.random() < 0.5 ? "pleased" : "angry") : "angry",
    );

    setTimeout(() => {
      setMonsterMood("waiting");
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion >= horrorQuestions.length) {
        setGameWon(true);
      } else {
        setCurrentQuestion(nextQuestion);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameStarted(false);
    setGameWon(false);
    setMonsterMood("waiting");
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <SoundManager gameStarted={gameStarted} />
      <GhostEffect />

      {/* Кровавые подтеки */}
      <div className="absolute top-0 left-1/4 w-1 blood-drip opacity-70"></div>
      <div className="absolute top-0 right-1/3 w-1 blood-drip opacity-50"></div>

      {showJumpScare && <JumpScare />}

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {!gameStarted ? (
          <div className="text-center">
            <div className="monster-shadow mb-8">
              <div className="text-9xl mb-4 float">👹</div>
            </div>
            <h1 className="horror-font text-6xl mb-6 flicker text-red-500 text-glow">
              ДОБРО ПОЖАЛОВАТЬ
            </h1>
            <p className="creepy-text text-2xl mb-4 text-gray-300">
              Я монстр из твоих кошмаров...
            </p>
            <p className="text-lg mb-8 text-red-400 flicker">
              Ответь на все мои вопросы, если сможешь... 💀
            </p>
            <button
              onClick={startGame}
              className="horror-button px-8 py-4 text-xl font-bold text-white rounded-lg creepy-text hover:shake"
            >
              НАЧАТЬ КОШМАР
            </button>
          </div>
        ) : gameWon ? (
          <div className="text-center animate-fade-in">
            <div className="text-9xl mb-8 animate-scale-in float">✨</div>
            <h1 className="horror-font text-6xl mb-6 text-green-400 text-glow">
              ПОБЕДА!
            </h1>
            <p className="creepy-text text-2xl mb-4 text-gray-300">
              Монстр исчез... Ты выжил в кошмаре!
            </p>
            <p className="text-lg mb-8 text-green-400">
              Но помни... я всегда рядом в темноте 👁️
            </p>
            <div className="space-x-4">
              <button
                onClick={resetGame}
                className="horror-button px-8 py-4 text-xl font-bold text-white rounded-lg creepy-text"
              >
                ИГРАТЬ СНОВА
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-2xl">
            {/* Глаза монстра */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="monster-eye w-16 h-16 rounded-full"></div>
              <div className="monster-eye w-16 h-16 rounded-full"></div>
            </div>

            {/* Монстр */}
            <div
              className={`text-8xl mb-8 transition-all duration-500 ${
                monsterMood === "angry"
                  ? "shake text-red-600"
                  : monsterMood === "pleased"
                    ? "text-green-500"
                    : "flicker"
              }`}
            >
              {monsterMood === "angry"
                ? "😈"
                : monsterMood === "pleased"
                  ? "👺"
                  : "👹"}
            </div>

            {/* Вопрос */}
            <div className="horror-glow creepy-border rounded-lg p-6 mb-8 bg-gray-900 bg-opacity-50 creepy-pulse">
              <h2 className="horror-font text-4xl mb-4 text-red-400 text-glow">
                ВОПРОС {currentQuestion + 1}
              </h2>
              <p className="creepy-text text-2xl text-white leading-relaxed">
                {horrorQuestions[currentQuestion]}
              </p>
            </div>

            <YesNoButtons
              onAnswer={handleAnswer}
              disabled={monsterMood !== "waiting"}
            />

            {/* Счетчик вопросов */}
            <div className="mt-8 text-red-500">
              <div className="flex justify-center gap-2">
                {Array.from({ length: horrorQuestions.length }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i <= currentQuestion ? "bg-red-500" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonsterScreen;
