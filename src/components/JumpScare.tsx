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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900 bg-opacity-95 animate-pulse">
      <div className="jump-scare text-9xl animate-pulse shake monster-shadow">
        {scareElement}
      </div>
      <div className="absolute inset-0 bg-black opacity-20 flicker"></div>

      {/* Дополнительные эффекты */}
      <div className="absolute top-1/4 left-1/4 text-6xl opacity-80 shake monster-shadow">
        💀
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-70 flicker monster-shadow">
        👻
      </div>
      <div className="absolute top-1/3 right-1/3 text-5xl opacity-60 float monster-shadow">
        🔪
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-4xl horror-font opacity-90 flicker">
        СКРИМЕР!
      </div>
    </div>
  );
};

export default JumpScare;
