
import React, { useState } from 'react';

export default function Forms() {
    const [form, setForm] = useState({
        lastName: '',
        firstName: '',
        attendance: '',
        drinks: [],
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    const drinkOptions = [
        'Белое вино',
        'Красное вино',
        'Водка',
        'Шампанское',
        'Безалкогольный напиток',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleDrinkChange = (drink) => {
        setForm((prev) => ({
            ...prev,
            drinks: prev.drinks.includes(drink)
                ? prev.drinks.filter((d) => d !== drink)
                : [...prev.drinks, drink],
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.lastName.trim()) {
            newErrors.lastName = 'Введите фамилию';
        }

        if (!form.firstName.trim()) {
            newErrors.firstName = 'Введите имя';
        }

        if (!form.attendance) {
            newErrors.attendance = 'Выберите вариант присутствия';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            await fetch('https://script.google.com/macros/s/AKfycbw7zw7B2k_S5STZ2sGlPkm2QRDqQxcFM3O_MFsIJkv7Kgt7uypjLNdEvHUrmlWHx1qk/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            setSuccessMessage('Спасибо! Ваша анкета успешно отправлена.');

            setForm({
                lastName: '',
                firstName: '',
                attendance: '',
                drinks: [],
            });
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Ошибка при отправке формы');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forms-container">
            <div className="line"></div>
            <h1 className="heading-forms">Анкета Гостя</h1>
            <h2 className="head-forms">
                ПОДТВЕРДИТЕ, ПОЖАЛУЙСТА, СВОЕ ПРИСУТСТВИЕ ДО 01.05.2026
            </h2>

            <p className="descr-forms">
                Анкету необходимо заполнять индивидуально на каждого гостя.
                <br />
                Для заполнения следующей анкеты гостя отправьте текущую
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

                    <div className="section-title">
                        Что предпочитаете из напитков?
                    </div>
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

                    <button type="submit" disabled={loading}>
                        {loading ? 'ОТПРАВКА...' : 'ПОДТВЕРДИТЬ'}
                    </button>

                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
