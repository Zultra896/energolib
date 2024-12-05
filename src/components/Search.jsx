import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Для навигации
import axios from "axios"; // Для запросов к серверу
import searchIcon from "../img/searchIcon.svg";
import searchStyles from "../css/search.module.css";

function Search() {
  const [query, setQuery] = useState(""); // Поле ввода
  const [suggestions, setSuggestions] = useState([]); // Предложения из базы
  const [isFocused, setIsFocused] = useState(false); // Для отображения предложений
  const navigate = useNavigate(); // Хук для навигации

  const fetchSuggestions = async () => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    try {
      const { data } = await axios.get("http://localhost:5000/books", {
        params: { title: query }, // Запрос с фильтрацией по названию
      });
      setSuggestions(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions();
  };

  const handleSuggestionClick = (bookId) => {
    navigate(`/book/${bookId}`); // Переход на страницу книги
  };

  return (
    <div className={searchStyles.search}>
      <div className={searchStyles.search__container}>
        <input
          className={searchStyles.search__inp}
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={handleInputChange} // Обновляем ввод и запрашиваем предложения
          onFocus={() => setIsFocused(true)} // Показываем предложения
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Прячем предложения с задержкой
        />
        <img src={searchIcon} alt="Search Icon" />
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className={searchStyles.search__suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={searchStyles.search__suggestionItem}
              onMouseDown={() => handleSuggestionClick(suggestion.id)} // Переход на страницу книги
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
