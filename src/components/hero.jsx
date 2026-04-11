import { useState } from "react";

export default function Hero({ onMusicStart }) {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleTap = () => {
    if (showIntro) {
      setFadeOut(true);

      // Запускаем музыку
      if (onMusicStart) {
        onMusicStart();
      }

      // Полностью убираем интро через 1 секунду
      setTimeout(() => {
        setShowIntro(false);
      }, 1000);
    }
  };

  return (
    <>
      {showIntro && (
        <div
          className={`hero-intro ${fadeOut ? 'hero-intro-fade-out' : ''}`}
          onClick={handleTap}
        >
          <div className="intro-content">
            <h1 className="intro-title">
              ВЫ ПОЛУЧИЛИ
              <br />
              ПРИГЛАШЕНИЕ
            </h1>
            <p className="intro-subtitle">для просмотра коснитесь экрана</p>
            <div className="tap-indicator">
              <div className="tap-circle"></div>
            </div>
          </div>
        </div>
      )}

      <div className="hero">
        <div className="hero-overlay">
          <div className="text-box">
            <div className="text-two">
              <h1 className="first-name">Приглашение</h1>
              <h1 className="second-name">на нашу свадьбу</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}