const background = document.getElementById("background");
const addToListButton = document.getElementById("add-to-list");

let currentMovie = {};

background.addEventListener("click", () => {
  overlay.classList.remove("visible");
});

function modalConstructor(data) {
  currentMovie = data;
  movieTitle.textContent = data.Title + " - " + data.Year;
  moviePoster.src = data.Poster;
  movieCast.textContent = data.Actors;
  moviePlot.textContent = data.Plot;
  movieGenre.textContent = data.Genre;
}

function addToListButtonHandler() {
  if (isMovieDuplicated(currentMovie)) {
    notie.alert({ text: "Filme já está na sua lista", type: "error" });
    return;
  }
  updateUI(currentMovie);
  addToList(currentMovie);
  overlay.classList.remove("visible");
}

addToListButton.addEventListener("click", addToListButtonHandler);
