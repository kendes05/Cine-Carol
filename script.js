const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("overlay");
const movieNameInput = document.getElementById("name");
const movieYearInput = document.getElementById("year");
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const moviePlot = document.getElementById("movie-plot");
const movieCast = document.getElementById("movie-cast");
const movieGenre = document.getElementById("movie-genre");
const movieList = document.getElementById("movie-list");

let movieArray = [];

document.addEventListener("DOMContentLoaded", function () {
  loadMoviesFromLocalStorage();
});

searchButton.addEventListener("click", searchButtonClickHandler);
movieNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButtonClickHandler();
  }
});
movieYearInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButtonClickHandler();
  }
});
async function searchButtonClickHandler() {
  if (movieNameInput.value == "") {
    notie.alert({ text: "Preencha o nome do filme", type: "error" });
    return;
  }

  let url = urlGenerator();

  const response = await fetch(url);
  const data = await response.json();

  if (data.Response == "False") {
    notie.alert({ text: "Filme não encontrado", type: "error" });
    return;
  }

  modalConstructor(data);

  overlay.classList.add("visible");
}

function urlGenerator() {
  const movieNameValue = movieNameInput.value.trim().split(" ").join("+");
  const movieYearValue = movieYearInput.value.trim();
  return `http://www.omdbapi.com/?apikey=${key}&t=${movieNameValue}&y=${movieYearValue}`;
}

function addToList(movieObject) {
  movieArray.push(movieObject);
  localStorage.setItem(movieObject.imdbID, JSON.stringify(movieObject));
}

function updateUI(movieObject) {
  movieList.innerHTML += `<div class="my-movie" id="${movieObject.imdbID}">
          <img
            src="${movieObject.Poster}"
            alt=""
          />
          <button class="remove-button" onclick="removeMovieConfirmation(this)">
            <i class="bx bx-trash"></i> Remover
          </button>
        </div>`;
}

function isMovieDuplicated(movieObject) {
  return movieArray.some((element) => element.imdbID === movieObject.imdbID);
}

function removeMovieConfirmation(botao) {
  notie.confirm(
    {
      text: "Você deseja remover o filme da lista?",
      submitText: "Sim",
      cancelText: "Não",
    },
    () => {
      removeMovie(botao);
    }
  );
}

function removeMovie(botao) {
  const movieId = botao.parentElement.id;
  movieArray = movieArray.filter((movie) => movie.imdbID !== movieId);
  botao.parentElement.remove();
  localStorage.removeItem(movieId);

  notie.alert({ text: "Filme removido com sucesso", type: 1 });
}

function loadMoviesFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let movieId = localStorage.key(i);
    let movieObject = JSON.parse(localStorage.getItem(movieId));
    updateUI(movieObject);
  }
}
