export default class Services {
  async getListService(current, title) {
    const titleDefault = title ? title : 'return';
    const url = `https://api.themoviedb.org/3/search/movie?query=${titleDefault}&include_adult=false&language=en-US&page=`;
    const res = await fetch(`${url}${current}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM',
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

  async getRatedMovies(current) {
    const id = await this.getId();
    const res = await fetch(
      `https://api.themoviedb.org/3/account/${id}/rated/movies?language=en-US&page=${current}&sort_by=created_at.asc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM',
        },
      }
    ).then((response) => response.json());
    return [res.results, res.total_pages];
  }

  async addRating(page, id) {
    await fetch(`https://api.themoviedb.org/3/movie/${id}/rating`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM',
      },
      body: JSON.stringify({
        value: page,
      }),
    });
  }
}
