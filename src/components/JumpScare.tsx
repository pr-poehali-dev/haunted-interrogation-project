import { useEffect, useState } from "react";

const jumpScareImages = ["💀", "👻", "🔪", "⚡", "🩸", "😱"];

const JumpScare = () => {
  const [scareElement, setScareElement] = useState("");

  useEffect(() => {
    setScareElement(
      jumpScareImages[Math.floor(Math.random() * jumpScareImages.length)],
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900 bg-opacity-95">
      <div className="jump-scare text-9xl animate-pulse">{scareElement}</div>
      <div className="absolute inset-0 bg-black opacity-20 animate-pulse"></div>

      {/* Дополнительные эффекты */}
      <div className="absolute top-1/4 left-1/4 text-6xl opacity-80 shake">
        💀
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-70 flicker">
        👻
      </div>
      <div className="absolute top-1/3 right-1/3 text-5xl opacity-60 float">
        🔪
      </div>
    </div>
  );
};

export default JumpScare;
