import React, { useState } from "react";
import { useNavigate } from "react-router";

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
    });

    const specialties = ["IT", "Энергетика", "Радиотехника", "Теплоэнергетика"];
    const types = ["книга", "манга", "комикс", "научная работа"];
    const years = Array.from(
        { length: new Date().getFullYear() - 2000 + 1 },
        (_, i) => 2000 + i
    );

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
        <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column" }}
        >
            <h2>Создание книги</h2>

            <label>
                Название:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Тип:
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
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
                Год:
                <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
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
                    required
                />
            </label>

            <label>
                Ссылка на изображение (img_url):
                <input
                    type="url"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Описание:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                    required
                />
            </label>

            <label>
                Специальность:
                <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                >
                    {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                            {specialty}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit" style={{ marginTop: "20px" }}>
                Создать книгу
            </button>
        </form>
    );
}

export default CreateBook;
