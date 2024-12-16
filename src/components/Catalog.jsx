import React, { useState, useEffect } from 'react';
import axios from 'axios';
import catalogStyles from '../css/catalog.module.css'
import searchIcon from '../img/searchIcon2.svg'
import { useLanguage } from '../components/LanguageContext';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ specialties: [], title: '' });
  const { language } = useLanguage();

  const specialtiesList = ['IT', 'Радиоэлектроника', 'Энергетика']; // Предопределенные специальности

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/books', {
        params: {
          specialty: filters.specialties.join(','), // Передаем выбранные специальности
          title: filters.title,
        },
      });
      setBooks(data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const newSpecialties = checked
        ? [...prevFilters.specialties, value]
        : prevFilters.specialties.filter((specialty) => specialty !== value);
      return { ...prevFilters, specialties: newSpecialties };
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

  // const applyFilters = () => {
  //   fetchBooks();
  // };

  useEffect(() => {
    fetchBooks();
  }, [filters]); // Вызываем fetchBooks при изменении filters
  
  const resetFilters = () => {
    setFilters({ specialties: [], title: '' });
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
            placeholder='Поиск по названию'
          />
        </label>
        <div className={catalogStyles.books}>
        {books.map((book) => (
          <div key={book.id} className={catalogStyles.book}>
            <img 
            className={catalogStyles.bookImg} 
            src={book.img_url} 
            alt={book.title} />
            <a className={catalogStyles.bookTitle} href={`/book/${book.id}`}>
            {book.title}
            </a>
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
          {language === 'ru'? 'Сбросить' : 'Қалпына келтіру'}
          </button>
          </label>
          {specialtiesList.map((specialty) => (
            <label className={catalogStyles.fieldsetLabel} key={specialty}>
              <input
                className={catalogStyles.fieldsetInput}
                type="checkbox"
                value={specialty}
                checked={filters.specialties.includes(specialty)}
                onChange={handleCheckboxChange}
              />
              {specialty}
            </label>
          ))}
        </fieldset>
        {/* <button className={`${catalogStyles.btn} ${catalogStyles.btnApply}`} onClick={applyFilters}>Применить</button> */}
      </div>
    </section>
  );
};

export default Catalog;
