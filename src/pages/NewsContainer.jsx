import React from "react";
import styles from "../css/newsContainer.module.css";
import bookIcon from "../img/bookIcon.svg";
import { useLanguage } from "../components/LanguageContext";

const NewsContainer = () => {

  const { language } = useLanguage();

  return (
    <div className={styles.newsContainer}>
      <div className={styles.headerBlock}>
        <img src={bookIcon} alt="" className={styles.bookIcon} />
        <h1 className={styles.newsTitle}>
          {language === "ru"? "Новости" : "Жаңалыктар"}
        </h1>
      </div>
      <div className={styles.newsList}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.newsContent}>
            YYYY-MM-DD
          </div>
        ))}
      </div>
      <div className={styles.pageList}>
        <button className={styles.pageBtn} disabled>
          &lt;
        </button>
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            className={`${styles.pageBtn} ${index === 0 ? styles.active : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button className={styles.pageBtn}>&gt;</button>
      </div>
    </div>
  );
};

export default NewsContainer;
