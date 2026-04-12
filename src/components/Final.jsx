import { useRef, useEffect, useState } from "react";

export default function Final() {
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Задержка для текста
          setTimeout(() => {
            setTextVisible(true);
          }, 400);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`final-container ${isVisible ? 'final-visible' : ''}`}
    >
      <div className="final-content">
        <h2 className={`final-heading ${textVisible ? 'text-animate' : ''}`}>
          БУДЕМ РАДЫ ВИДЕТЬ ВАС
          <br />
          НА НАШЕМ ПРАЗДНИКЕ!
        </h2>
        <h1 className={`final-names ${textVisible ? 'text-animate-delay' : ''}`}>
          Михаил и
          <br />
          Дарья
        </h1>
      </div>
    </div>
  );
}