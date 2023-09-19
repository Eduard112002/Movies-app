import React from 'react';
import { Rate } from 'antd';

import './rate-movies.css';
import Services from '../../server';

const RateMovies = ({ valueRate, id, addRatedMovies }) => {
  const server = new Services();
  async function onChange(page) {
    await server.addRating(page, id);
    await server.getRatedMovies().then((results) => addRatedMovies(results));
  }
  return <Rate allowHalf defaultValue={valueRate} count={10} rootClassName="rate" onChange={onChange} />;
};

export default RateMovies;
