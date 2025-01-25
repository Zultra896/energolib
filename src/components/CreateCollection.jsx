import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "../css/createCollection.module.css";

function CreateCollection() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        img_url: "",
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return formData.name.trim() && formData.description.trim();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setError('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        setError(''); // Очищаем ошибку перед отправкой

        try {
            const response = await axios.post('http://localhost:5000/collections', formData);

            if (response.data.success) {
                navigate("/admin"); // Возврат к странице администратора
            } else {
                alert("Ошибка при создании коллекции: " + response.data.message);
            }
        } catch (error) {
            console.error("Ошибка при создании коллекции:", error);
            alert("Произошла ошибка при создании коллекции.");
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
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className={styles.form}
                >
                    <h2 className={styles.title}>Создание коллекции</h2>

                    <label>
                        Название коллекции:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles["input-field"]}
                            required
                        />
                    </label>

                    <label>
                        Описание коллекции:
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

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className={styles.button}>
                        Создать коллекцию
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCollection;
