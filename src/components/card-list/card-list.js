import React from 'react';

import Card from '../card';

const CardList = ({ listFilm }) => {
  const element = listFilm.map((el) => {
    return <Card film={el} key={el.id} />;
  });
  return element;
};

export default CardList;
