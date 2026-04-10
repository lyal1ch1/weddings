import { useRef, useEffect, useState } from "react";
import photoCal from "../assets/Calendar2.png";

export default function MyCalendarPage() {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px'
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={imgRef}
            className={`image-container ${isVisible ? 'image-visible' : ''}`}
        >
            <img src={photoCal} alt="Календарь свадьбы" className="imageCal" />
        </div>
    );
}