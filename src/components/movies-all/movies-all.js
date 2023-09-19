import React, { Component } from 'react';
import { Alert, Spin, Space } from 'antd';

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
    ratedMovies: [],
    current: 1,
    title: '',
    loading: true,
    error: false,
    isOnline: false,
    search: true,
    rated: false,
  };

  addListFilm = (results) => {
    const { ratedMovies } = this.state;
    const newArr = results.map((el) => {
      const rated = ratedMovies.find((element) => element.id === el.id);
      return rated ? rated : el;
    });
    this.setState({
      listFilm: newArr,
      loading: false,
    });
  };

  addRatedMovies = (results) => {
    this.setState({
      ratedMovies: results,
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
        loading: true,
        current: 1,
      };
    });
  };

  addRated = () => {
    this.setState(({ rated, search, current }) => {
      this.addListRated(current);
      return {
        rated: !rated,
        search: !search,
        current: 1,
        loading: true,
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
    const { title, rated } = this.state;
    rated ? this.addListRated(current) : this.addLIstServers(current, title);
    this.server.getId();
    this.setState({
      current: current,
    });
  };

  async componentDidMount() {
    const { current, title } = this.state;
    await this.addListRated(current);
    await this.addLIstServers(current, title);
    await this.server.createGuestSession();
  }

  addListRated = (current) => {
    this.server.getRatedMovies(current).then((results) => this.addRatedMovies(results));
  };

  addLIstServers = (current, title) => {
    this.server
      .getAllMovies(current, title)
      .then((res) => this.addListFilm(res))
      .catch(() => this.addError());
  };
  render() {
    const { listFilm, current, error, isOnline, loading, title, search, rated, ratedMovies } = this.state;
    const contentsListMovie = rated ? ratedMovies : listFilm;
    const totalList = contentsListMovie.length < 20 ? current * 10 : null;
    const newTitle = `There is no such movie: ${title}`;
    console.log(contentsListMovie);
    const spiner = loading ? (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    ) : null;
    const Pagination =
      error || isOnline || loading ? null : (
        <PaginationList cur={current} currentPage={this.currentPage} total={totalList} />
      );
    const inputSearch = error || isOnline || !search ? null : <Search addTitle={this.addTitle} />;
    const constentList =
      contentsListMovie.length === 0 ? (
        <Alert message="Warning" description={newTitle} type="warning" className="error warning_message" showIcon />
      ) : (
        <CardList listFilm={contentsListMovie} addRatedMovies={this.addRatedMovies} />
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
