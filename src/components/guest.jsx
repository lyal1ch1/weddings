import { useRef, useEffect, useState } from "react";

export default function Guest() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
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
        <div ref={sectionRef} className={`guest ${isVisible ? 'guest-visible' : ''}`}>
            <div className="line"></div>
            <h1 className="dear-guest">
                Дорогие <br /> <span className="second-dear-guest">гости !</span>
            </h1>
            <p className="descr-guest">
                Приглашаем Вас разделить с нами радость особенного для нас события и стать частью нашей семейной истории!
            </p>
            <div className="line line-bottom"></div>
        </div>
    );
}