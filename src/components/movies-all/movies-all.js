import React, { Component } from 'react';
import { Alert, Spin } from 'antd';

import './movies-all.css';
import Services from '../../server';
import CardList from '../card-list';
import PaginationList from '../pagination-list';
import Search from '../search';
import Error from '../error';
import Tabs from '../tabs';

export default class MoviesAll extends Component {
  server = new Services();

  state = {
    listFilm: [],
    current: 1,
    title: '',
    loading: true,
    error: false,
    isOnline: false,
    search: true,
    rated: false,
  };

  addListFilm = (results) => {
    this.setState({
      listFilm: results,
      loading: false,
    });
  };

  addTitle = (title) => {
    this.addLIstServers(1, title);
    this.setState({
      title: title,
      current: 1,
    });
  };

  addSearch = () => {
    this.setState(({ search, rated, current, title }) => {
      this.addLIstServers(current, title);
      return {
        search: !search,
        rated: !rated,
      };
    });
  };

  addRated = () => {
    this.setState(({ rated, search }) => {
      this.server.getRatedMovies().then((results) => this.addListFilm(results));
      return {
        rated: !rated,
        search: !search,
      };
    });
  };

  addError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  addIsOnline = () => {
    this.setState({
      loading: false,
      isOnline: true,
    });
  };

  currentPage = (current) => {
    const { title } = this.state;
    this.server.getId();
    this.addLIstServers(current, title);
    this.setState({
      current: current,
    });
  };

  componentDidMount() {
    const { current, title } = this.state;
    this.addLIstServers(current, title);
    this.server.createGuestSession();
  }

  addLIstServers = (current, title) => {
    this.server
      .getAllMovies(current, title)
      .then((res) => this.addListFilm(res))
      .catch(() => this.addError());
  };
  render() {
    const { listFilm, current, error, isOnline, loading, title, search, rated } = this.state;
    const totalList = listFilm.length < 20 ? current : null;
    const newTitle = `There is no such movie: ${title}`;
    const spiner = loading ? (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    ) : null;
    const Pagination =
      error || isOnline ? null : <PaginationList cur={current} currentPage={this.currentPage} total={totalList} />;
    const inputSearch = error || isOnline || !search ? null : <Search addTitle={this.addTitle} />;
    const constentList =
      listFilm.length === 0 ? (
        <Alert message="Warning" description={newTitle} type="warning" className="error warning_message" showIcon />
      ) : (
        <CardList listFilm={listFilm} />
      );
    const content = error || isOnline || loading ? null : constentList;
    return (
      <>
        <Tabs addSearch={this.addSearch} addRated={this.addRated} search={search} rated={rated} />
        {inputSearch}
        <div className="movies_card">
          <Error error={error} addIsOnline={this.addIsOnline} addError={this.addError} />
          {spiner}
          {content}
        </div>
        {Pagination}
      </>
    );
  }
}
