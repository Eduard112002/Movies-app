import React from 'react';
import { format } from 'date-fns';

import './card.css';

const Card = ({ film }) => {
  const img = film.poster_path === null ? '/xWjw5JBMuce6Wv33dDUfmzVVaAL.jpg' : film.poster_path;
  const [year, month, day] = film.release_date ? film.release_date.split('') : [2002, 1, 1];
  const newData = format(new Date(year, month, day), 'LLLL dd yyyy');
  const text = formatText(film.overview, 250);
  const rating = Math.floor(film.vote_average * 10) / 10;
  const imgCard = `https://image.tmdb.org/t/p/w500${img}`;
  return (
    <div className="card">
      <img src={imgCard} alt="Постер фильма" className="card_img" />
      <div className="card_info">
        <span className="card_rating">{rating}</span>
        <h3 className="card_title">{film.title}</h3>
        <span className="card_date">{newData}</span>
        <div>
          <span className="card_genre">Action</span>
          <span className="card_genre">Drama</span>
        </div>
        <span className="card_text">{text}</span>
      </div>
    </div>
  );
};

const formatText = (text, length) => {
  let newText;
  if (text.length > length && text.slice(length - 1, length) !== '.') {
    let lastCharacter = text.slice(length - 1, length);
    for (let i = 1; i < 40; i++) {
      if (lastCharacter === '') {
        newText = `${text.slice(0, length - (i + 1)).trim()}...`;
        i = 40;
      }
      lastCharacter = text.slice(length - i, length - i);
    }
  } else {
    newText = text;
  }
  return newText;
};

export default Card;
