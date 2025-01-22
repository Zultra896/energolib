import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../css/createBook.module.css";

function CreateBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        type: "книга", // По умолчанию "книга"
        year: new Date().getFullYear(), // По умолчанию текущий год
        author: "",
        description: "",
        link: "",
        specialty: "IT", // По умолчанию "IT"
        img_url: "", // Ссылка на изображение
        language: "RU", // По умолчанию "Русский"
    });

    const specialties = ["IT", "Энергетика", "Радиоэлектроника", "Теплоэнергетика"];
    const types = ["книга", "манга", "комикс", "научная работа"];
    const years = Array.from(
        { length: new Date().getFullYear() - 2000 + 1 },
        (_, i) => 2000 + i
    );
    const languages = ["RU", "KZ"]; // Доступные языки

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "title" || name === "author" ? capitalize(value) : value,
        }));
    };

    const isFormValid = () => {
        return (
            formData.title.trim() &&
            formData.author.trim() &&
            formData.description.trim() &&
            formData.link.trim() &&
            formData.img_url.trim()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Пожалуйста, заполните все обязательные поля!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                navigate("/admin"); // Используем navigate вместо window.location.href
            } else {
                alert("Ошибка при создании книги: " + result.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при создании книги.");
        }
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button 
                    className={styles.logoutButton}
                    onClick={() => navigate("/admin")}>
                    Назад
                </button>
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className={styles.form}
                >
                    <h2 className={styles.title}>Создание книги</h2>

                    <label>
                        Название:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Тип:
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={styles["select-field"]}
                            required
                        >
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Язык:
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className={styles["select-field"]}
                            required
                        >
                            {languages.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Год:
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className={styles["select-field"]}
                            required
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Автор:
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Ссылка на изображение:
                        <input
                            type="url"
                            name="img_url"
                            value={formData.img_url}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Описание:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles["textarea-field"]}
                            rows="4"
                            required
                        />
                    </label>

                    <label>
                        Ссылка (Google Drive):
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Специальность:
                        <select
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            className={styles["select-field"]}
                            required
                        >
                            {specialties.map((specialty) => (
                                <option key={specialty} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className={styles.button}>
                        Создать книгу
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateBook;
