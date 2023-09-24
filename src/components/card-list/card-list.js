import React from 'react';

import Card from '../card';
import { ServerConsumer } from '../server-context';

const CardList = ({ listFilm, addRatedMovies, current }) => {
  return (
    <ServerConsumer>
      {({ getGenres }) => {
        const elementCard = listFilm.map((el) => {
          return (
            <Card film={el} key={el.id} addRatedMovies={addRatedMovies} current={current} genresId={getGenres()} />
          );
        });
        return elementCard;
      }}
    </ServerConsumer>
  );
};

export default CardList;
