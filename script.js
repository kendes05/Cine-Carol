const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("overlay");
const movieNameInput = document.getElementById("name");
const movieYearInput = document.getElementById("year");
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const moviePlot = document.getElementById("movie-plot");
const movieCast = document.getElementById("movie-cast");
const movieGenre = document.getElementById("movie-genre");

searchButton.addEventListener("click", searchButtonClickHandler);

async function searchButtonClickHandler() {
  const movieNameValue = movieNameInput.value.trim().split(" ").join("+");
  const movieYearValue = movieYearInput.value.trim();
  let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameValue}&y=${movieYearValue}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  movieTitle.textContent = data.Title + " - " + data.Year;
  moviePoster.src = data.Poster;
  movieCast.textContent = data.Actors;
  moviePlot.textContent = data.Plot;
  overlay.classList.add("visible");
}

//http://www.omdbapi.com/?apikey=[yourkey]&
