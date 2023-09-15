import React from 'react';
import './tabs.css';

const Tabs = ({ addSearch, addRated, search, rated }) => {
  let classNameSearch = 'tabs_element';
  let classNameRated = 'tabs_element';

  if (search) {
    classNameRated = 'tabs_element';
    classNameSearch += ' activ_tabs';
  }

  if (rated) {
    classNameSearch = 'tabs_element';
    classNameRated += ' activ_tabs';
  }

  return (
    <div className="tabs">
      <button className={classNameSearch} onClick={addSearch}>
        Search
      </button>
      <button className={classNameRated} onClick={addRated}>
        Rated
      </button>
    </div>
  );
};

export default Tabs;
