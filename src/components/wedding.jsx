import { useEffect, useState } from "react";
import Hero from "./hero";
import Guest from "./guest";
import MyCalendarPage from "./Data";
import Gaudi from "./Gaudi";
import Plan from "./Plan";
import Details from "./Details";
import Forms from "./Forms";
import Timer from "./Timer";

export default function WeddingInvite() {

  const [isMobile, setIsMobile] = useState(false);

  // Определяем устройство
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android|iphone|ipad|ipod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);



  // ===== UI =====
  if (!isMobile) {
    return (
      <div className="qr-app">
        <div className="qr-container">
          <h1>📱 Откройте на телефоне</h1>
          <p>Данная страница открывается только на мобильных устройствах</p>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://87.242.118.7"
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
      <Hero />
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
