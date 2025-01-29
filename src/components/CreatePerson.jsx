import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../css/createPerson.module.css";

function CreatePerson() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        kz_name: "",
        ru_name: "",
        birthdate: "",
        kz_quote: "",
        ru_quote: "",
        kz_description: "",
        ru_description: "",
        img_url: "",
        links: [] // Список ссылок
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddLink = () => {
        if (formData.links.length < 5) {
            setFormData((prev) => ({
                ...prev,
                links: [...prev.links, { url: "", name: "" }],
            }));
        } else {
            alert("Вы не можете добавить больше 5 ссылок.");
        }
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = formData.links.map((link, i) =>
            i === index ? { ...link, [field]: value } : link
        );
        setFormData((prev) => ({
            ...prev,
            links: updatedLinks,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/persons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                navigate("/admin");
            } else {
                alert("Ошибка при создании личности: " + result.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при создании личности.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button 
                    className={styles.logoutButton}
                    onClick={() => navigate("/admin")}>
                    Назад
                </button>
                <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
                    <h2 className={styles.title}>Создание личности</h2>

                    <label>
                        Имя (Каз):
                        <input
                            type="text"
                            name="kz_name"
                            value={formData.kz_name}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Имя (Рус):
                        <input
                            type="text"
                            name="ru_name"
                            value={formData.ru_name}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Дата рождения:
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Цитата (Каз):
                        <textarea
                            name="kz_quote"
                            value={formData.kz_quote}
                            onChange={handleChange}
                            className={styles["textarea-field"]}
                        />
                    </label>

                    <label>
                        Цитата (Рус):
                        <textarea
                            name="ru_quote"
                            value={formData.ru_quote}
                            onChange={handleChange}
                            className={styles["textarea-field"]}
                        />
                    </label>

                    <label>
                        Описание (Каз):
                        <textarea
                            name="kz_description"
                            value={formData.kz_description}
                            onChange={handleChange}
                            className={styles["textarea-field"]}
                        />
                    </label>

                    <label>
                        Описание (Рус):
                        <textarea
                            name="ru_description"
                            value={formData.ru_description}
                            onChange={handleChange}
                            className={styles["textarea-field"]}
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
                        />
                    </label>

                    {formData.links.map((link, index) => (
                        <div key={index} className={styles.linkGroup}>
                            <label>
                                Ссылка {index + 1}:
                                <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                                    className={styles["input-field"]}
                                    required
                                />
                            </label>
                            <label>
                                Название ссылки {index + 1}:
                                <input
                                    type="text"
                                    value={link.name}
                                    onChange={(e) => handleLinkChange(index, "name", e.target.value)}
                                    className={styles["input-field"]}
                                    required
                                />
                            </label>
                        </div>
                    ))}

                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={handleAddLink}
                    >
                        Добавить ссылку
                    </button>

                    <button type="submit" className={styles.button}>
                        Создать личность
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePerson;
