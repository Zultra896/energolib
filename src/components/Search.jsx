import React, { useState } from "react";
import searchIcon from "../img/searchIcon.svg";
import searchStyles from "../css/search.module.css";

function Search() {
  const [query, setQuery] = useState(""); 
  const [isFocused, setIsFocused] = useState(false); 
  const suggestions = [
    "Человек-бензопила",
    "Восхождение в тени",
    "Добро пожаловать в класс превосходства",
    "Код Гиас",
    "Ходячий замок",
    "Нурик & Данчобай",
    "Оча Поча",
    "Жампо мампо",
    "Нурадил квадробер",
  ]; 


  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={searchStyles.search}>
      <div className={searchStyles.search__container}>
        <input
          className={searchStyles.search__inp}
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
        />
        <img src={searchIcon} alt="Search Icon" />
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <ul className={searchStyles.search__suggestions}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={searchStyles.search__suggestionItem}
              onMouseDown={() => setQuery(suggestion)} 
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
