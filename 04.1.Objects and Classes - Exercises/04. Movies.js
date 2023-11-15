function printMoviesInfo(input) {
  function createMovie(name) {
    return {
      name,
    };
  }
  const movies = {};
  for (const str of input) {
    let movieName = "";
    if (str.includes("addMovie")) {
      movieName = str.substring(9);
      movies[movieName] = createMovie(movieName);
    } else if (str.includes("directedBy")) {
      let index = str.indexOf("directedBy");
      movieName = str.substring(0, index - 1);
      if (movies[movieName]) {
        movies[movieName].director = str.substring(index + 11);
      }
    } else if (str.includes("onDate")) {
      let index = str.indexOf("onDate");
      movieName = str.substring(0, index - 1);
      if (movies[movieName]) {
        movies[movieName].date = str.substring(index + 7);
      }
    }
  }

  Object.values(movies).map((movie) => {
    if (Object.keys(movie).length === 3) {
      console.log(JSON.stringify(movie));
    }
  });
}

printMoviesInfo([
  "addMovie The Avengers",
  "addMovie Superman",
  "The Avengers directedBy Anthony Russo",
  "The Avengers onDate 30.07.2010",
  "Captain America onDate 30.07.2010",
  "Captain America directedBy Joe Russo",
]);
