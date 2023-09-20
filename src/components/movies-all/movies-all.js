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
    listRated: [],
    ratedMovies: [],
    current: 1,
    title: '',
    loading: true,
    error: false,
    isOnline: false,
    search: true,
    rated: false,
    page: 1,
    pageRated: null,
  };

  addListFilm = (results) => {
    const { listRated } = this.state;
    const newArr = results.map((el) => {
      const rated = listRated.find((element) => element.id === el.id);
      return rated ? rated : el;
    });
    this.setState({
      listFilm: newArr,
      loading: false,
    });
  };

  addRatedMovies = (results) => {
    this.setState(() => {
      return {
        ratedMovies: results[0],
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
    this.server.getId();
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

  addlistRatedNewEl = (results, id) => {
    const { listRated } = this.state;
    let newElement;
    const index = listRated.findIndex((el) => el.id === id);
    if (index !== -1) {
      const page = index === 0 ? 1 : Math.ceil(index / 20);
      this.server.getRatedMovies(page).then((results) => {
        newElement = results[0].find((el) => el.id === id);
        const newlistRated = [...listRated.slice(0, index), newElement, ...listRated.slice(index + 1)];
        this.setState({
          listRated: newlistRated,
        });
      });
    } else {
      this.setState(({ listRated }) => {
        newElement = results.find((el) => el.id === id);
        return {
          listRated: [...listRated, newElement],
        };
      });
    }
  };

  addlistRated = (results) => {
    const { page, listRated } = this.state;
    if (Math.ceil(listRated.length / 20) !== results[1]) {
      this.setState(({ listRated }) => {
        const newPage = page + 1;
        this.server.getRatedMovies(newPage).then((results) => this.addlistRated(results));
        return {
          pageRated: results[1],
          page: newPage,
          listRated: [...listRated, ...results[0]],
        };
      });
    }
  };

  async componentDidMount() {
    const { current, title, page } = this.state;
    await this.server.createGuestSession();
    await this.server.getRatedMovies(page).then((results) => this.addlistRated(results));
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
    const { listFilm, current, error, isOnline, loading, title, search, rated, ratedMovies, pageRated } = this.state;
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
        <CardList
          listFilm={contentsListMovie}
          addRatedMovies={this.addRatedMovies}
          current={current}
          addlistRatedNewEl={this.addlistRatedNewEl}
        />
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
/*
const newArr = [];
    if (listRated.length === 0) {
      newArr.push(...resoltsArr);
    } else {
      for (let i = 0; i < listRated.length; i++) {
        const rated = resoltsArr.filter((element) => element.id === listRated[i].id);
        console.log(rated, 'rated');
        let el = rated.length !== 0 ? rated : resoltsArr[i];
        if (Array.isArray(el)) {
          newArr.push(...el);
        } else {
          newArr.push(el);
        }
      }
    }
 */
