import React from 'react';

import Card from '../card';

const CardList = ({ listFilm, addRatedMovies }) => {
  const element = listFilm.map((el) => {
    return <Card film={el} key={el.id} addRatedMovies={addRatedMovies} />;
  });
  return element;
};

export default CardList;
