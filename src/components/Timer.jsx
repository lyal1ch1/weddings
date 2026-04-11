import { useEffect, useState, useRef } from "react";

export default function Timer() {
  const targetDate = new Date("2026-07-25T15:00:00");
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const timerRef = useRef(null);

  const getTimeLeft = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { d: "00", h: "00", m: "00", s: "00" };
    }

    return {
      d: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      h: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      m: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
      s: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Задержка для текста
          setTimeout(() => {
            setTextVisible(true);
          }, 200);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (timerRef.current) {
      observer.observe(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        observer.unobserve(timerRef.current);
      }
    };
  }, []);

  return (
    <div ref={timerRef} className={`timer ${isVisible ? 'timer-visible' : ''}`}>
      <div className="overlay"></div>
      <h2 className={`timer-title-heading ${textVisible ? 'text-animate' : ''}`}>
        До свадьбы
      </h2>
      <h2 className={`timer-title ${textVisible ? 'text-animate-delay' : ''}`}>
        ОСТАЛОСЬ
      </h2>

      <div className={`timer-numbers ${textVisible ? 'text-animate-scale' : ''}`}>
        <span>{time.d}</span>
        <span className="sep">|</span>
        <span>{time.h}</span>
        <span className="sep">|</span>
        <span>{time.m}</span>
        <span className="sep">|</span>
        <span>{time.s}</span>
      </div>

      <div className={`timer-labels ${textVisible ? 'text-animate-delay-2' : ''}`}>
        <span>дни</span>
        <span>часы</span>
        <span>мин</span>
        <span>сек</span>
      </div>
    </div>
  );
}
