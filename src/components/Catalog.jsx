import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import catalogStyles from '../css/catalog.module.css';
import searchIcon from '../img/searchIcon2.svg';
import { useLanguage } from '../components/LanguageContext';
import { useNavigate } from 'react-router-dom';
import filterIcon from '../img/filter.svg'

const Catalog = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ specialties: [], title: '', languages: [] });
  const { language } = useLanguage();


  const bookLanguage = ['KZ', 'RU']

  // Список специальностей для отображения
  const specialtiesList =
    language === 'ru'
      ? ['IT', 'Радиоэлектроника', 'Энергетика', 'Теплоэнергетика', 'Предметы']
      : ['IT', 'Радиоэлектроника', 'Энергетика', 'Жылу энергетикасы', 'Пәндер'];

  const fetchBooks = async () => {
    try {
      // Маппинг специальностей, если выбрано "Жылу энергетикасы", то отправляем "Теплоэнергетика"
      const mappedSpecialties = filters.specialties.map((specialty) => {
        if (specialty === 'Жылу энергетикасы') {
            return 'Теплоэнергетика';
        }
        if (specialty === 'Пәндер') {
          return 'Предметы';
      }
        return specialty;
      });

      const { data } = await axios.get('http://localhost:5000/books', {
        params: {
          specialty: mappedSpecialties.join(','), // Передаем маппинг специальностей
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

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); 

  
    // Функция переключения состояния меню
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    // Закрытие меню при клике вне его области
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false); // Закрываем меню
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  

  return (
    <section className={catalogStyles.section}>
      <div className={catalogStyles.section__catalog}>
        <div className={catalogStyles.titles}>
          <h1 className={catalogStyles.catalogTitle}>Каталог</h1>
          <div className={catalogStyles.div} onClick={toggleMenu}>
            <h1 className={catalogStyles.fTitle}>Фильтры</h1>
            <img className={catalogStyles.icon} src={filterIcon} alt="" />
          </div>
          {isOpen && (
       <div className={catalogStyles.filters2}>
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
      )}
          
        </div>
        <label className={catalogStyles.catalogLabel}>
          <img src={searchIcon} alt="" />
          <input
            className={catalogStyles.searchInput}
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={language === 'ru' ? 'Поиск по названию' : 'Аты бойынша іздеу'}
          />
        </label>
        <div className={catalogStyles.books}>
          {books.map((book) => (
            <div className={catalogStyles.B}>
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
