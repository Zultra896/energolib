import React from 'react';
import cardAuthorsStyles from '../css/cardAuthors.module.css';
import { useNavigate } from 'react-router-dom';

const CardAuthors = ({ id, photo, quote, description }) => {
  const navigate = useNavigate();
  
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
