import React from 'react';
import cardAuthorsStyles from '../css/cardAuthors.module.css';

const CardAuthors = ({ photo, quote, description }) => {
  return (
    <div className={cardAuthorsStyles.card}>
      <div className={cardAuthorsStyles.photo}>
        <img src={photo} alt="Author" />
      </div>
      <h3 className={cardAuthorsStyles.title}>{quote}</h3>
      <p className={cardAuthorsStyles.description}>{description}</p>
    </div>
  );
};

export default CardAuthors;
