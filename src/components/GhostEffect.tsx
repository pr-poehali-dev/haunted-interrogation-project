import { useEffect, useState } from "react";

interface Ghost {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: string;
}

const ghostEmojis = ["👻", "💀", "🕷️", "🦇", "👹"];

const GhostEffect = () => {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);

  useEffect(() => {
    const createGhost = () => {
      const newGhost: Ghost = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: ghostEmojis[Math.floor(Math.random() * ghostEmojis.length)],
        size: Math.random() > 0.5 ? "text-4xl" : "text-6xl",
      };

      setGhosts((prev) => [...prev, newGhost]);

      // Удаляем призрака через 5 секунд
      setTimeout(() => {
        setGhosts((prev) => prev.filter((ghost) => ghost.id !== newGhost.id));
      }, 5000);
    };

    // Создаем призраков каждые 3-7 секунд
    const interval = setInterval(
      () => {
        if (Math.random() < 0.7) {
          createGhost();
        }
      },
      3000 + Math.random() * 4000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className={`absolute ghost-fade ${ghost.size} opacity-30`}
          style={{
            left: `${ghost.x}px`,
            top: `${ghost.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {ghost.emoji}
        </div>
      ))}

      {/* Статичные элементы для атмосферы */}
      <div className="absolute top-10 left-10 text-2xl opacity-20 float">
        🕸️
      </div>
      <div className="absolute top-20 right-20 text-3xl opacity-15 flicker">
        🦇
      </div>
      <div className="absolute bottom-20 left-20 text-2xl opacity-25 shake">
        💀
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-10 ghost-fade">
        👻
      </div>
    </div>
  );
};

export default GhostEffect;
