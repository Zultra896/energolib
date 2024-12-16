import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import searchIcon from "../img/searchIcon.svg";
import searchStyles from "../css/search.module.css";
import { useLanguage } from "../components/LanguageContext";

function Search() {
  const [query, setQuery] = useState(""); // Текст ввода
  const [suggestions, setSuggestions] = useState([]); // Предложения
  const [isFocused, setIsFocused] = useState(false); // Фокус на поле
  const [isNoResults, setIsNoResults] = useState(false); // Нет результатов
  const navigate = useNavigate();
  const { language } = useLanguage(); // Используем текущий язык

  const fetchSuggestions = async () => {
    if (query.trim() === "") {
      setSuggestions([]);
      setIsNoResults(false); // Очищаем сообщение
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:5000/books", {
        params: { title: query }, // Передаем текст запроса на сервер
      });

      setSuggestions(data);
      setIsNoResults(data.length === 0); // Если нет результатов, включаем сообщение
    } catch (error) {
      console.error(
        language === "ru"
          ? "Ошибка загрузки данных"
          : "Мәліметтерді жүктеу қателігі"
      );
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions(); // Загружаем предложения при изменении текста
  };

  const handleSuggestionClick = (bookId) => {
    navigate(`/book/${bookId}`); // Навигация к выбранной книге
  };

  return (
    <div className={searchStyles.search}>
      <div className={searchStyles.search__container}>
        <input
          className={searchStyles.search__inp}
          type="text"
          placeholder={language === "ru" ? "Поиск" : "Іздеу"}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)} // Показываем подсказки
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Скрываем подсказки с задержкой
        />
        <img
          src={searchIcon}
          alt={language === "ru" ? "Иконка поиска" : "Іздеу белгішесі"}
        />
      </div>

      {/* Показ предложений */}
      {isFocused && suggestions.length > 0 && (
        <ul className={searchStyles.search__suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={searchStyles.search__suggestionItem}
              onMouseDown={() => handleSuggestionClick(suggestion.id)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}

      {/* Показ сообщения "Нет результатов" */}
      {isFocused && isNoResults && (
        <p className={searchStyles.search__noResults}>
          {language === "ru"
            ? `Нет результатов для "${query}"`
            : `"${query}" бойынша нәтиже жоқ`}
        </p>
      )}
    </div>
  );
}

export default Search;
