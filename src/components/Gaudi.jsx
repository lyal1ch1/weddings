import { useRef, useEffect, useState } from "react";

export default function Details() {
    const [visibleSections, setVisibleSections] = useState([]);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observers = sectionRefs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleSections(prev => {
                                if (!prev.includes(index)) {
                                    return [...prev, index];
                                }
                                return prev;
                            });
                        }, index * 150);
                    }
                },
                {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            if (ref) {
                observer.observe(ref);
            }

            return observer;
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <div className="details">
            <h1
                ref={el => sectionRefs.current[0] = el}
                className={`det-heading ${visibleSections.includes(0) ? 'detail-visible' : ''}`}
            >
                Детали
            </h1>

            <div
                ref={el => sectionRefs.current[1] = el}
                className={`details-el ${visibleSections.includes(1) ? 'detail-visible' : ''}`}
            >
                <h2 className="details-heading">Подарки</h2>
                <h3 className="descr-details">
                    В качестве подарка будем рады вкладу в бюджет нашей семьи. Он точно поможет воплотить нашу мечту в реальность.
                </h3>
            </div>

            <div
                ref={el => sectionRefs.current[2] = el}
                className={`line ${visibleSections.includes(2) ? 'line-visible' : ''}`}
            ></div>

            <div
                ref={el => sectionRefs.current[3] = el}
                className={`details-el second-details-el ${visibleSections.includes(3) ? 'detail-visible' : ''}`}
            >
                <h2 className="details-heading">Формат мероприятия <br /> 18+</h2>
                <h3 className="descr-details">
                    Мы будем рады видеть вас на нашей свадьбе, но формат торжества предполагает вечер только для взрослых, поэтому просим оставить детей дома, чтобы вы могли полностью насладиться праздником !
                </h3>
            </div>
        </div>
    );
}