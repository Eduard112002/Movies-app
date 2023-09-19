import React from 'react';
import { format } from 'date-fns';

import './card.css';
import RateMovies from '../rate-movies';

const Card = ({ film, addRatedMovies }) => {
  const img = film.poster_path === null ? '/xWjw5JBMuce6Wv33dDUfmzVVaAL.jpg' : film.poster_path;
  const [year, month, day] = film.release_date ? film.release_date.split('') : [2002, 1, 1];
  const newData = format(new Date(year, month, day), 'LLLL dd yyyy');
  const text = formatText(film.overview, 250);
  const rating = Math.floor(film.vote_average * 10) / 10;
  const imgCard = `https://image.tmdb.org/t/p/w500${img}`;
  const valueRate = film.rating ? film.rating : 0;
  let classColor = 'card_rating';
  switch (true) {
    case rating <= 3:
      classColor += ' red';
      break;
    case rating <= 5:
      classColor += ' orange';
      break;
    case rating <= 7:
      classColor += ' yellow';
      break;
    case rating > 7:
      classColor += ' green';
      break;
  }
  return (
    <div className="card">
      <img src={imgCard} alt="Постер фильма" className="card_img" />
      <div className="card_info">
        <span className={classColor}>{rating}</span>
        <h3 className="card_title">{film.title}</h3>
        <span className="card_date">{newData}</span>
        <div>
          <span className="card_genre">Action</span>
          <span className="card_genre">Drama</span>
        </div>
        <span className="card_text">{text}</span>
        <RateMovies valueRate={valueRate} id={film.id} addRatedMovies={addRatedMovies} />
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
