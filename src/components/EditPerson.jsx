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
    links: Array(5).fill({ url: "", name: "" })
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/persons/${id}`)
      .then(response => {
        const { link1, link_name1, link2, link_name2, link3, link_name3, link4, link_name4, link5, link_name5, ...data } = response.data;
        setFormData({
          ...data,
          links: [
            { url: link1 || "", name: link_name1 || "" },
            { url: link2 || "", name: link_name2 || "" },
            { url: link3 || "", name: link_name3 || "" },
            { url: link4 || "", name: link_name4 || "" },
            { url: link5 || "", name: link_name5 || "" }
          ]
        });
      })
      .catch(() => setError("Ошибка загрузки данных"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("link")) {
      const index = parseInt(name.replace(/\D/g, "")) - 1;
      setFormData(prev => {
        const updatedLinks = [...prev.links];
        if (name.includes("name")) {
          updatedLinks[index].name = value;
        } else {
          updatedLinks[index].url = value;
        }
        return { ...prev, links: updatedLinks };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
          <label>Дата рождения:
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
          </label>
          <label>Цитата (Каз):
            <textarea name="kz_quote" value={formData.kz_quote} onChange={handleChange} spellCheck="false"/>
          </label>
          <label>Цитата (Рус):
            <textarea name="ru_quote" value={formData.ru_quote} onChange={handleChange} spellCheck="false"/>
          </label>
          <label>Описание (Каз):
            <textarea name="kz_description" value={formData.kz_description} onChange={handleChange} spellCheck="false"/>
          </label>
          <label>Описание (Рус):
            <textarea name="ru_description" value={formData.ru_description} onChange={handleChange} spellCheck="false"/>
          </label>
          <label>Ссылка на изображение:
            <input type="url" name="img_url" value={formData.img_url} onChange={handleChange} />
          </label>

          {formData.links.map((link, index) => (
            <div key={index}>
              <label>Ссылка {index + 1}:
                <input type="url" name={`link${index + 1}`} value={link.url} onChange={handleChange} />
              </label>
              <label>Название ссылки {index + 1}:
                <input type="text" name={`link_name${index + 1}`} value={link.name} onChange={handleChange} />
              </label>
            </div>
          ))}

          <button type="submit" className={styles.button}>Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default EditPerson;
