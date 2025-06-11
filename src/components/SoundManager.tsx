import { useEffect, useRef } from "react";

interface SoundManagerProps {
  gameStarted: boolean;
}

const SoundManager = ({ gameStarted }: SoundManagerProps) => {
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!gameStarted) return;

    // Создаем базовый звуковой контекст для генерации звуков
    try {
      audioContext.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (e) {
      console.log("Web Audio API не поддерживается");
      return;
    }

    // Функция для создания жуткого звука
    const createHorrorSound = (
      frequency: number,
      duration: number,
      type: OscillatorType = "sawtooth",
    ) => {
      if (!audioContext.current) return;

      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.current.currentTime,
      );
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.1,
        audioContext.current.currentTime + 0.01,
      );
      gainNode.gain.linearRampToValueAtTime(
        0,
        audioContext.current.currentTime + duration,
      );

      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + duration);
    };

    // Фоновые звуки
    const ambientInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        // Низкие жуткие звуки
        createHorrorSound(40 + Math.random() * 60, 2 + Math.random() * 3);
      }
    }, 5000);

    // Случайные жуткие эффекты
    const effectInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        // Высокие пугающие звуки
        createHorrorSound(
          800 + Math.random() * 400,
          0.1 + Math.random() * 0.2,
          "square",
        );
      }
    }, 3000);

    return () => {
      clearInterval(ambientInterval);
      clearInterval(effectInterval);
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [gameStarted]);

  // Визуальная индикация что звуки активны
  return gameStarted ? (
    <div className="fixed top-4 right-4 z-20">
      <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400">ЗВУК</span>
      </div>
    </div>
  ) : null;
};

export default SoundManager;
