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

searchButton.addEventListener("click", searchButtonClickHandler);

async function searchButtonClickHandler() {
  if (movieNameInput.value == "") {
    notie.alert({ text: "Preencha o nome do filme", type: "error" });
    return;
  }

  let url = urlGenerator();

  const response = await fetch(url);
  const data = await response.json();

  console.log(data.Response);
  if (data.Response == "False") {
    notie.alert({ text: "Filme não encontrado", type: "error" });
    return;
  }

  modalConstructor(data);

  console.log(data);
  overlay.classList.add("visible");
}

function urlGenerator() {
  const movieNameValue = movieNameInput.value.trim().split(" ").join("+");
  const movieYearValue = movieYearInput.value.trim();
  return `http://www.omdbapi.com/?apikey=${key}&t=${movieNameValue}&y=${movieYearValue}`;
}

function addToList(movieObject) {
  movieArray.push(movieObject);
}
function updateUI(movieObject) {
  movieList.innerHTML += `<div class="my-movie">
          <img
            src="${movieObject.Poster}"
            alt=""
          />
          <button class="remove-button">
            <i class="bx bx-trash"></i> Remover
          </button>
        </div>`;
}
