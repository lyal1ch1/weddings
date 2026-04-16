import { useThemeColor } from "./useThemeColor";
import { useState, useRef, useEffect } from "react";
import Hero from "./hero";
import Guest from "./guest";
import MyCalendarPage from "./Data";
import Gaudi from "./Gaudi";
import Plan from "./Plan";
import Details from "./Details";
import Forms from "./Forms";
import Timer from "./Timer";
import Songs from "../assets/songs2.mp3";
import Sounds from "../assets/off-songs2.svg";
import Final from "./Final";

export default function WeddingInvite() {
  const [isMobile] = useState(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isInviteOpened, setIsInviteOpened] = useState(false);
  const audioRef = useRef(null);

  useThemeColor("#fdfdfd");

  // 🔒 Блокируем скролл, пока открытка не открыта
  useEffect(() => {
    document.body.style.overflow = isInviteOpened ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isInviteOpened]);

  // Запуск музыки + открытие открытки
  const handleMusicStart = () => {
    setIsInviteOpened(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.log("Автовоспроизведение заблокировано:", error);
        });
    }
  };

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

  return (
    <div className="app">
      <audio ref={audioRef} loop preload="auto">
        <source src={Songs} type="audio/mpeg" />
      </audio>

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Выключить музыку" : "Включить музыку"}
      >
        <img
          src={Sounds}
          alt="Music control"
          className={`music-icon ${isMusicPlaying ? "music-playing" : "music-paused"
            }`}
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
      <Final />
    </div>
  );
}
