import React, { useState, useEffect } from 'react';
import axios from 'axios';
import catalogStyles from '../css/catalog.module.css';
import searchIcon from '../img/searchIcon2.svg';
import { useLanguage } from '../components/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ specialties: [], title: '', languages: [] });
  const { language } = useLanguage();

  // Сопоставление казахских и русских специальностей
  const specialtiesMapping = {
    IT: 'IT',
    Радиоэлектроника: 'Радиоэлектроника',
    Энергетика: 'Энергетика',
    Теплоэнергетика: 'Теплоэнергетика',
    'Жылу энергетикасы': 'Теплоэнергетика', // Казахский вариант
  };

  const bookLanguage = ['RU', 'KZ']

  // Список специальностей для отображения
  const specialtiesList =
    language === 'ru'
      ? ['IT', 'Радиоэлектроника', 'Энергетика', 'Теплоэнергетика']
      : ['IT', 'Радиоэлектроника', 'Энергетика', 'Жылу энергетикасы'];

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/books', {
        params: {
          specialty: filters.specialties.join(','), // Передаем выбранные специальности
          title: filters.title,
          language: filters.languages.join(','),
        },
      });
      setBooks(data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
  
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (type === 'specialties') {
        updatedFilters.specialties = checked
          ? [...prevFilters.specialties, value]
          : prevFilters.specialties.filter((specialty) => specialty !== value);
      } else if (type === 'languages') {
        updatedFilters.languages = checked
          ? [...prevFilters.languages, value]
          : prevFilters.languages.filter((language) => language !== value);
      }
      return updatedFilters;
    });
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchBooks(); // Выполняем поиск при нажатии Enter
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]); // Вызываем fetchBooks при изменении filters

  const resetFilters = () => {
    setFilters({ specialties: [], title: '', languages: [] });
  };

  return (
    <section className={catalogStyles.section}>
      <div className={catalogStyles.section__catalog}>
        <h1 className={catalogStyles.catalogTitle}>Каталог</h1>
        <label className={catalogStyles.catalogLabel}>
          <img src={searchIcon} alt="" />
          <input
            className={catalogStyles.searchInput}
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Поиск по названию"
          />
        </label>
        <div className={catalogStyles.books}>
          {books.map((book) => (
            <div
              key={book.id}
              className={catalogStyles.book}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className={catalogStyles.blockLang} >
                {book.language}
              </div>
              <img
                className={catalogStyles.bookImg}
                src={book.img_url}
                alt={book.title}
              />
              <p className={catalogStyles.bookTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={catalogStyles.filters}>
        <fieldset className={catalogStyles.fieldset}>
          <label className={catalogStyles.fieldsetHead}>
            <legend className={catalogStyles.fieldsetTitle}>
              {language === 'ru' ? 'Специальность:' : 'Мамандық:'}
            </legend>
            <button className={catalogStyles.btn} onClick={resetFilters}>
              {language === 'ru' ? 'Сбросить' : 'Қалпына келтіру'}
            </button>
          </label>
          {specialtiesList.map((specialty) => (
          <label className={catalogStyles.fieldsetLabel} key={specialty}>
              <input
                className={catalogStyles.fieldsetInput}
                type="checkbox"
                value={specialty}
                checked={filters.specialties.includes(specialty)}
                onChange={(e) => handleCheckboxChange(e, 'specialties')}
              />
              {specialty}
            </label>
          ))}

          <label className={catalogStyles.fieldsetHead}>
            <legend className={catalogStyles.fieldsetTitle}>
              {language === 'ru' ? 'Язык:' : 'Тіл:'}
            </legend>
          </label>
          {bookLanguage.map((lang) => (
            <label className={catalogStyles.fieldsetLabel} key={lang}>
              <input
                className={catalogStyles.fieldsetInput}
                type="checkbox"
                value={lang}
                checked={filters.languages.includes(lang)}
                onChange={(e) => handleCheckboxChange(e, 'languages')}
              />
              {lang}
            </label>
          ))}
        </fieldset>
      </div>
    </section>
  );
};

export default Catalog;
