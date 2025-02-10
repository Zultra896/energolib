import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/person.module.css';
import { useLanguage } from '../components/LanguageContext';

function Person() {
  const { id } = useParams(); 
  const [person, setPerson] = useState(null);
  const { language } = useLanguage();
  const [localLanguage, setLocalLanguage] = useState(language === 'ru' ? 'ru' : 'kz');

  // Загружаем данные о личности
  useEffect(() => {
    axios
      .get(`http://localhost:5000/persons/${id}`) // Запрос на сервер
      .then((response) => {
        setPerson(response.data); // Устанавливаем данные о личности
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
      });
  }, [id]);

  if (!person) {
    return <div>Личность не найдена</div>;
  }

  const name = localLanguage === 'kz' ? person.kz_name : person.ru_name;
  const quote = localLanguage === 'kz' ? person.kz_quote : person.ru_quote;
  const description = localLanguage === 'kz' ? person.kz_description : person.ru_description;
  const links = localLanguage === 'kz' ? 'Сілтемелер:' : 'Ссылки:';
  const date = new Date(person.birthdate);
  const fDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
  });

  const handleBtnLink = (link) => {
    window.open(link);
  }

  const toggleLocalLanguage = () => {
    setLocalLanguage(localLanguage === 'kz' ? 'ru' : 'kz');
  };

  return (
    <div className={styles.person}>
      <div className={styles.head}>
        <div className={styles.photo}>
          <img src={person.img_url} alt={name} className={styles.img} />
        </div>
        <div className={styles.head_title}>
          <h1>{name}</h1>
          <p>{fDate}</p>
          <blockquote className={styles.quote}>«{quote}»</blockquote>
        </div>
      </div>
      <p className={styles.text}>{description}</p>
      {person.link1 &&
        <div>
          <h2>{links}</h2>
          <div className={styles.links}>
            <div>
              <p className={styles.link} onClick={() => handleBtnLink(person.link1)}>{person.link_name1}</p>
            </div>
            {
              person.link2 &&
              <div>
                <p className={styles.link} onClick={() => handleBtnLink(person.link2)}>{person.link_name2}</p>
              </div>
            }
            {
              person.link3 &&
              <div>
                <p className={styles.link} onClick={() => handleBtnLink(person.link3)}>{person.link_name3}</p>
              </div>
            }
            {
              person.link4 &&
              <div>
                <p className={styles.link} onClick={() => handleBtnLink(person.link4)}>{person.link_name4}</p>
              </div>
            }
            {
              person.link15 &&
              <div>
                <p className={styles.link} onClick={() => handleBtnLink(person.link15)}>{person.link_name5}</p>
              </div>
            }
          </div>      
        </div> 
      }
      <button className={styles.btnLang} onClick={toggleLocalLanguage}>kz | ru</button>
    </div>
  );
}

export default Person;
