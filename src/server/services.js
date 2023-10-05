import { Component } from 'react';

export default class Services extends Component {
  apiKey = 'c59bd581055dff7ef5c5bc3d5d83b40d';

  async getListService(current, title) {
    const titleDefault = title ? title : 'return';
    const url = `https://api.themoviedb.org/3/search/movie?query=${titleDefault}&include_adult=false&language=en-US&page=`;
    const res = await fetch(`${url}${current}&api_key=${this.apiKey}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.url}` + `, received ${res.status} `);
    }
    return await res.json();
  }

  async getAllMovies(current, title) {
    const res = await this.getListService(current, title);
    return res.results;
  }

  async createGuestSession() {
    const resID = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM',
      },
    });
    return await resID.json();
  }

  async getId() {
    const res = await this.createGuestSession();
    return res.guest_session_id;
  }

  async getRatedMovies(current, guestSessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${current}&api_key=${this.apiKey}`,
      {
        method: 'GET',
      }
    ).then((response) => response.json());
    return [res.results, res.total_pages];
  }
  addRating = (page, idFilm, guestSessionId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${idFilm}/rating?guest_session_id=${guestSessionId}&api_key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: page,
        }),
      }
    );
  };

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${this.apiKey}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }).then((response) => response.json());
    return res.genres;
  }
}
