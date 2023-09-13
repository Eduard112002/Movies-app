import React, { Component } from 'react';
import './search.css';

export default class Search extends Component {
  id = 0;

  onSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    e.preventDefault();
    clearTimeout(this.id, 100);
    this.id = setTimeout(() => this.props.addTitle(e.target.value), 1000);
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <input className="search_value" onChange={this.onChange} placeholder="Type to search..." />
        </form>
      </div>
    );
  }
}
