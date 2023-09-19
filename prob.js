async function serwise() {

  const optionses = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM'
    }
  };

  await fetch(`https://api.themoviedb.org/3/account/${res}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`, optionses)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}
serwise();

