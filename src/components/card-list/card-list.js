import React from 'react';

import Card from '../card';

const CardList = ({ listFilm, addRatedMovies, current, addlistRatedNewEl }) => {
  const elementCard = listFilm.map((el) => {
    return (
      <Card
        film={el}
        key={el.id}
        addRatedMovies={addRatedMovies}
        current={current}
        addlistRatedNewEl={addlistRatedNewEl}
      />
    );
  });
  return elementCard;
};

export default CardList;
