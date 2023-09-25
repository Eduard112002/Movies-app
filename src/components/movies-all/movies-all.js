import React, { Component } from 'react';
import { Alert, Spin, Space } from 'antd';

import './movies-all.css';
import Services from '../../server';
import { ServerProvider } from '../server-context';
import CardList from '../card-list';
import PaginationList from '../pagination-list';
import Search from '../search';
import Error from '../error';
import Tabs from '../tabs';

export default class MoviesAll extends Component {
  server = new Services();

  state = {
    listFilm: [],
    listRated: [],
    ratedMovies: [],
    current: 1,
    title: '',
    loading: true,
    error: false,
    isOnline: false,
    search: true,
    rated: false,
    pageRated: null,
    genres: [],
  };

  addListFilm = (results) => {
    this.setState({
      listFilm: results,
      loading: false,
    });
  };

  addRatedMovies = (results) => {
    this.setState(() => {
      return {
        ratedMovies: results[0],
        pageRated: results[1],
        loading: false,
      };
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
    const { title } = this.state;
    this.addLIstServers(1, title);
    this.setState(({ search, rated }) => {
      return {
        search: !search,
        rated: !rated,
        loading: true,
        current: 1,
      };
    });
  };

  addRated = () => {
    this.setState(({ rated, search }) => {
      this.addListRated(1);
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
    this.setState(({ title, rated }) => {
      if (rated) {
        this.addListRated(current);
      } else {
        this.addLIstServers(current, title);
      }
      return {
        loading: true,
        current: current,
      };
    });
  };

  async componentDidMount() {
    const { current, title } = this.state;
    await this.server.getGenres().then((res) => this.setState({ genres: res }));
    await this.server.createGuestSession();
    await this.server.getId();
    await this.addLIstServers(current, title);
  }

  addListRated = (current) => {
    this.server.getRatedMovies(current).then((results) => this.addRatedMovies(results));
  };

  async addLIstServers(current, title) {
    await this.server
      .getAllMovies(current, title)
      .then((res) => this.addListFilm(res))
      .catch(() => this.addError());
  }
  render() {
    const { listFilm, current, error, isOnline, loading, title, search, rated, ratedMovies, pageRated, genres } =
      this.state;
    const contentsListMovie = rated ? ratedMovies : listFilm;
    const totalList = contentsListMovie.length < 20 ? current * 10 : null;
    const newTitle = `There is no such movie: ${title}`;
    const spiner = loading ? (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    ) : null;
    const Pagination =
      error || isOnline || loading ? null : (
        <PaginationList
          cur={current}
          currentPage={this.currentPage}
          total={totalList}
          rated={rated}
          pageRated={pageRated}
        />
      );
    const inputSearch = error || isOnline || !search ? null : <Search addTitle={this.addTitle} />;
    const constentList =
      contentsListMovie.length === 0 ? (
        <Alert message="Warning" description={newTitle} type="warning" className="error warning_message" showIcon />
      ) : (
        <CardList listFilm={contentsListMovie} addRatedMovies={this.addRatedMovies} current={current} />
      );
    const content = error || isOnline || loading ? null : constentList;
    return (
      <>
        <ServerProvider value={genres}>
          <Tabs addSearch={this.addSearch} addRated={this.addRated} search={search} rated={rated} />
          {inputSearch}
          <div className="movies_card">
            <Error error={error} addIsOnline={this.addIsOnline} addError={this.addError} />
            {spiner}
            {content}
          </div>
          {Pagination}
        </ServerProvider>
      </>
    );
  }
}
