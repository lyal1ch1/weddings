import { useEffect, useState, useRef } from "react";
import Hero from "./hero";
import Guest from "./guest";
import MyCalendarPage from "./Data";
import Gaudi from "./Gaudi";
import Plan from "./Plan";
import Details from "./Details";
import Forms from "./Forms";
import Timer from "./Timer";
import Songs from "../assets/songs2.mp3"
import Sounds from "../assets/off-songs2.svg"

export default function WeddingInvite() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Определяем устройство
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android|iphone|ipad|ipod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  // Функция запуска музыки
  const handleMusicStart = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Автовоспроизведение заблокировано:", error);
        });
    }
  };

  // Функция переключения музыки
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // ===== UI =====
  if (!isMobile) {
    return (
      <div className="qr-app">
        <div className="qr-container">
          <h1>📱 Откройте на телефоне</h1>
          <p>Данная страница открывается только на мобильных устройствах</p>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://the-white-day.ru/"
            alt="QR Code"
          />

          <p className="hint">Отсканируйте QR-код телефоном</p>
        </div>
      </div>
    );
  }

  // Мобильная версия (сайт)
  return (
    <div className="app">
      {/* Аудио элемент */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src={Songs} type="audio/mpeg" />
      </audio>

      {/* Кнопка управления музыкой */}
      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Выключить музыку" : "Включить музыку"}
      >
        <img
          src={Sounds}
          alt="Music control"
          className={`music-icon ${isMusicPlaying ? 'music-playing' : 'music-paused'}`}
        />
      </button>

      <Hero onMusicStart={handleMusicStart} />
      <Guest />
      <MyCalendarPage />
      <Gaudi />
      <Plan />
      <Details />
      <Timer />
      <Forms />
    </div>
  );
}