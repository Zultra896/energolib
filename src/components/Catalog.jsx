import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Catalog () {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ specialties: [], title: '' });

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

  const applyFilters = () => {
    fetchBooks();
  };

  const resetFilters = () => {
    setFilters({ specialties: [], title: '' });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Каталог книг</h1>
      <div className="filters">
        <fieldset>
          <legend>Специальность:</legend>
          {specialtiesList.map((specialty) => (
            <label key={specialty}>
              <input
                type="checkbox"
                value={specialty}
                checked={filters.specialties.includes(specialty)}
                onChange={handleCheckboxChange}
              />
              {specialty}
            </label>
          ))}
        </fieldset>
        <label>
          Название:
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={applyFilters}>Применить</button>
        <button onClick={resetFilters}>Сбросить</button>
      </div>
      <div className="catalog">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.img_url} alt={book.title} />
            <p>{book.title}</p>
            <a href={`/book/${book.id}`}>Подробнее</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
