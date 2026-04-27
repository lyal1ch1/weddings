import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Toast({ toast }) {
    if (typeof document === 'undefined') return null;
    if (!toast.visible && !toast.hiding) return null;

    return createPortal(
        <div
            className={`toast ${toast.visible ? 'show' : ''} ${toast.hiding ? 'hide' : ''} ${toast.type}`}
        >
            {toast.message}
        </div>,
        document.body
    );
}

export default function Forms() {
    const [form, setForm] = useState({
        lastName: '',
        firstName: '',
        attendance: '',
        drinks: [],
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        message: '',
        type: '',
        visible: false,
        hiding: false,
    });
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const formRef = useRef(null);
    const toastTimerRef = useRef(null);
    const hideTimerRef = useRef(null);

    const drinkOptions = [
        'Белое вино',
        'Красное вино',
        'Водка',
        'Шампанское',
        'Безалкогольный напиток',
    ];

    useEffect(() => {
        const node = formRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px',
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(toastTimerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleDrinkChange = (drink) => {
        setForm((prev) => ({
            ...prev,
            drinks: prev.drinks.includes(drink)
                ? prev.drinks.filter((d) => d !== drink)
                : [...prev.drinks, drink],
        }));

        setErrors((prev) => ({ ...prev, drinks: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.lastName.trim()) newErrors.lastName = 'Введите фамилию';
        if (!form.firstName.trim()) newErrors.firstName = 'Введите имя';
        if (!form.attendance) newErrors.attendance = 'Выберите вариант присутствия';
        if (form.attendance === 'yes' && form.drinks.length === 0) {
            newErrors.drinks = 'Выберите хотя бы один напиток';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showToast = (message, type = 'success') => {
        clearTimeout(toastTimerRef.current);
        clearTimeout(hideTimerRef.current);

        setToast({
            message,
            type,
            visible: true,
            hiding: false,
        });

        toastTimerRef.current = setTimeout(() => {
            setToast((prev) => ({ ...prev, hiding: true }));

            hideTimerRef.current = setTimeout(() => {
                setToast({
                    message: '',
                    type: '',
                    visible: false,
                    hiding: false,
                });
            }, 350);
        }, 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Пожалуйста, заполните обязательные поля', 'error');
            return;
        }

        setLoading(true);

        try {
            await fetch(
                'https://script.google.com/macros/s/AKfycbw7zw7B2k_S5STZ2sGlPkm2QRDqQxcFM3O_MFsIJkv7Kgt7uypjLNdEvHUrmlWHx1qk/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                }
            );

            showToast('Спасибо! Анкета успешно отправлена.', 'success');

            setForm({
                lastName: '',
                firstName: '',
                attendance: '',
                drinks: [],
            });
        } catch (error) {
            console.error('Ошибка отправки:', error);
            showToast('Ошибка при отправке формы', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                ref={formRef}
                className={`forms-container ${isVisible ? 'forms-visible' : ''}`}
            >
                <div className="line"></div>
                <h1 className="heading-forms">Анкета Гостя</h1>
                <h2 className="head-forms">
                    ПОДТВЕРДИТЕ, ПОЖАЛУЙСТА, СВОЕ ПРИСУТСТВИЕ ДО 14.05.2026
                </h2>

                <p className="descr-forms">
                    Анкету необходимо заполнять индивидуально на каждого гостя.
                </p>

                <div className="invite-wrapper">
                    <form className="invite-form" onSubmit={handleSubmit}>
                        <label>Ваша фамилия:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}

                        <label>Ваше имя:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}

                        <div className="section-title">Присутствие:</div>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="attendance"
                                value="yes"
                                checked={form.attendance === 'yes'}
                                onChange={handleChange}
                            />
                            Я с удовольствием приду
                        </label>

                        <label className="radio-option">
                            <input
                                type="radio"
                                name="attendance"
                                value="no"
                                checked={form.attendance === 'no'}
                                onChange={handleChange}
                            />
                            К сожалению, не смогу присутствовать
                        </label>
                        {errors.attendance && <p className="error">{errors.attendance}</p>}

                        {form.attendance === 'yes' && (
                            <>
                                <div className="section-title">Что предпочитаете из напитков?</div>
                                <div className="checkbox-group">
                                    {drinkOptions.map((drink) => (
                                        <label key={drink} className="checkbox-option">
                                            <input
                                                type="checkbox"
                                                checked={form.drinks.includes(drink)}
                                                onChange={() => handleDrinkChange(drink)}
                                            />
                                            {drink}
                                        </label>
                                    ))}
                                </div>
                                {errors.drinks && <p className="error">{errors.drinks}</p>}
                            </>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? 'ОТПРАВКА...' : 'Подтвердить'}
                        </button>
                    </form>
                </div>
            </div>

            <Toast toast={toast} />
        </>
    );
}
