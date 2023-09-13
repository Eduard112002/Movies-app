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
}
