import React from 'react';

import Card from '../card';

const CardList = ({ listFilm, addRatedMovies, current, addlistRated }) => {
  const element = listFilm.map((el) => {
    return <Card film={el} key={el.id} addRatedMovies={addRatedMovies} current={current} addlistRated={addlistRated}/>;
  });
  return element;
};

export default CardList;
