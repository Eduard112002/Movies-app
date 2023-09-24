async function serwise() {

  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',{
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
serwise();

