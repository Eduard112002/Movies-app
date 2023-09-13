import React from 'react';
import { createRoot } from 'react-dom/client';

import MoviesAll from './components/movies-all';

const MoviesApp = () => {
  return <MoviesAll />;
};

const container = createRoot(document.getElementById('root'));

container.render(<MoviesApp />);
