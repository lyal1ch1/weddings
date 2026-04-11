import { useRef, useEffect, useState } from "react";

export default function Gaudi() {
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
                    }, 300);
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
        <div ref={sectionRef} className={`gaudi-container ${isVisible ? 'gaudi-visible' : ''}`}>
            <h1 className={`gaudi-heading ${textVisible ? 'text-animate' : ''}`}>
                Место проведения
            </h1>
            <p className={`gaudi-description ${textVisible ? 'text-animate-delay' : ''}`}>
                Наш праздник пройдет <br /> в Банкетном зале GAUDI <br />
                по адресу: г. Киров, Володарского 103А, 3 этаж
            </p>
        </div>
    );
}
