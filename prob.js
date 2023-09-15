async function serwise() {


  const optionss = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTliZDU4MTA1NWRmZjdlZjVjNWJjM2Q1ZDgzYjQwZCIsInN1YiI6IjY0Zjk5NWEyNGNjYzUwMTg2OGRhYWY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rHjOe79qNqjRa4Bh2siGFrYZS7v35gTI0Gx_o3dRebM'
    },
    body: '{"value":2.5}'
  };

  await fetch(`https://api.themoviedb.org/3/movie/246320/rating?guest_session_id=${res}`, optionss)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

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

