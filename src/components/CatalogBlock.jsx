import React, { useState, useEffect } from "react";
import styles from "../css/catalogBlock2.module.css";
import { useLanguage } from '../components/LanguageContext';

function CatalogBlock() {
    const [books, setBooks] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isLoadingBooks, setIsLoadingBooks] = useState(false);
    const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);
    const [error, setError] = useState(null);
    const { language } = useLanguage();

    // Загрузка списка специальностей
    useEffect(() => {
        fetch(`/apiHandler.php?action=getSpecialties`)
            .then((response) => {
                if (!response.ok) throw new Error("Ошибка загрузки специальностей");
                return response.json();
            })
            .then((data) => setSpecialties(data))
            .catch((err) => setError(err))
            .finally(() => setIsLoadingSpecialties(false));
    }, []);

    // Загрузка списка книг
    useEffect(() => {
        setIsLoadingBooks(true);
        const query = selectedFilters.map((filter) => `specialty[]=${encodeURIComponent(filter)}`).join("&");
        fetch(`/apiHandler.php?action=getBooks&${query}`)
            .then((response) => {
                if (!response.ok) throw new Error("Ошибка загрузки книг");
                return response.json();
            })
            .then((data) => setBooks(data))
            .catch((err) => setError(err))
            .finally(() => setIsLoadingBooks(false));
    }, [selectedFilters]);

    // Логика переключения фильтров
    const toggleFilter = (specialty) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(specialty)
                ? prevFilters.filter((filter) => filter !== specialty)
                : [...prevFilters, specialty]
        );
    };

    const resetFilters = () => setSelectedFilters([]);

    return (
        <div className={styles.container}>
            <section className={styles.mainBlock}>
                <nav className={styles.catalogNav}>
                    <p className={styles.catalogNavTitle}>
                        {language === 'ru' ? 'Специальность' : 'Мамандық'}
                    </p>
                    <button onClick={resetFilters} className={styles.catalogBtn}>
                        {language === 'ru'? 'Сбросить' : 'Қалпына келтіру'}
                    </button>
                    {isLoadingSpecialties ? (
                        <p>Загрузка специальностей...</p>
                    ) : error ? (
                        <p>Ошибка: {error.message}</p>
                    ) : (
                        <ul className={styles.checkboxMain}>
                            {specialties.map((specialty) => (
                                <li key={specialty} className={styles.checkboxLi}>
                                    <label className={styles.checkboxLbl}>
                                        <input
                                            type="checkbox"
                                            className={styles.filterCheckbox}
                                            checked={selectedFilters.includes(specialty)}
                                            onChange={() => toggleFilter(specialty)}
                                        />
                                        <p className={styles.checkboxText}>{specialty}</p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>

                <div className={styles.catalogContainer}>
                    <h3 className={styles.catalogTitle}>Каталог</h3>
                    <section className={styles.booksGallery}>
                        {error ? (
                            <p>Ошибка: {error.message}</p>
                        ) : isLoadingBooks ? (
                            <p>Загрузка книг...</p>
                        ) : books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.id} className={styles.booksCard}>
                                    <a href={`bookDetail.php?id=${encodeURIComponent(book.id)}`}>
                                        <img className={styles.booksImg} src={book.image_url} alt={book.title} />
                                        <p className={styles.booksTitle}>{book.title}</p>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>Нет доступных книг для выбранной специальности.</p>
                        )}
                    </section>
                </div>
            </section>
        </div>
    );
}

export default CatalogBlock;