import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/editPerson.module.css";

function EditPerson() {
  const { id } = useParams();
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
    link1: "",
    link_name1: "",
    link2: "",
    link_name2: "",
    link3: "",
    link_name3: "",
    link4: "",
    link_name4: "",
    link5: "",
    link_name5: ""
  });

  const [error, setError] = useState(null);
  const [linkCount, setLinkCount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/persons/${id}`)
      .then(response => {
        setFormData(response.data);
        // Определяем количество уже заполненных ссылок
        let count = 0;
        for (let i = 1; i <= 5; i++) {
          if (response.data[`link${i}`]) count++;
        }
        setLinkCount(count);
      })
      .catch(() => setError("Ошибка загрузки данных"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/persons/${id}`, formData);
      if (response.data.success) {
        navigate("/admin");
      } else {
        alert("Ошибка при обновлении: " + response.data.message);
      }
    } catch {
      alert("Произошла ошибка при обновлении личности.");
    }
  };

  const date = new Date(formData.birthdate);
  const fDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
  });

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <button className={styles.logoutButton} onClick={() => navigate("/admin")}>Назад</button>
        <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
          <h2 className={styles.title}>Редактирование личности</h2>

          <label>Имя (Каз):
            <input type="text" name="kz_name" value={formData.kz_name} onChange={handleChange} required />
          </label>
          <label>Имя (Рус):
            <input type="text" name="ru_name" value={formData.ru_name} onChange={handleChange} required />
          </label>
          <label>Дата рождения:{fDate}
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
          </label>
          <label>Цитата (Каз):
            <textarea name="kz_quote" value={formData.kz_quote} onChange={handleChange} />
          </label>
          <label>Цитата (Рус):
            <textarea name="ru_quote" value={formData.ru_quote} onChange={handleChange} />
          </label>
          <label>Описание (Каз):
            <textarea name="kz_description" value={formData.kz_description} onChange={handleChange} />
          </label>
          <label>Описание (Рус):
            <textarea name="ru_description" value={formData.ru_description} onChange={handleChange} />
          </label>
          <label>Ссылка на изображение:
            <input type="url" name="img_url" value={formData.img_url} onChange={handleChange} />
          </label>

          <label>Ссылка 1:
            <input type="url" name="link1" value={formData.link1} onChange={handleChange} required />
          </label>
          <label>Название ссылки 1:
            <input type="text" name="link_name1" value={formData.link_name1} onChange={handleChange} required />
          </label>
        
      
      
        
          <label>Ссылка 2:
            <input type="url" name="link2" value={formData.link2} onChange={handleChange} required />
          </label>
          <label>Название ссылки 2:
            <input type="text" name="link_name2" value={formData.link_name2} onChange={handleChange} required />
          </label>
        
      
      
        
          <label>Ссылка 3:
            <input type="url" name="link3" value={formData.link3} onChange={handleChange} required />
          </label>
          <label>Название ссылки 3:
            <input type="text" name="link_name3" value={formData.link_name3} onChange={handleChange} required />
          </label>
        
      
      
        
          <label>Ссылка 4:
            <input type="url" name="link4" value={formData.link4} onChange={handleChange} required />
          </label>
          <label>Название ссылки 4:
            <input type="text" name="link_name4" value={formData.link_name4} onChange={handleChange} required />
          </label>
        
      
      
        
          <label>Ссылка 5:
            <input type="url" name="link5" value={formData.link5} onChange={handleChange} required />
          </label>
          <label>Название ссылки 5:
            <input type="text" name="link_name5" value={formData.link_name5} onChange={handleChange} required />
          </label>
            
          
          <button type="submit" className={styles.button}>Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default EditPerson;
