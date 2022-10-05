import View from "./View.js";
import Client from "./Client.js";

// All of your javascript should go here

const newView = new View();
const newClient = new Client();

const save = document.querySelector(".btn-save");
const reset = document.querySelector(".btn-reset");
const input = document.getElementById("input");
const movieList = [];
input.addEventListener("change", async () => {
  if (input.value) {
    const response = await newClient.getMovieData(input.value);

    let data = newView.displayMovieOnPage(response);
    console.log(response);

    movieList.push(response);

    input.value = "";
  }
});

//store values as local storage
save.addEventListener("click", () => {
  localStorage.setItem("movie", JSON.stringify(movieList));
});

// movieDisplay using local storage
function movieDisplay() {
  const dataFromLocal = JSON.parse(localStorage.getItem("movie"));

  movieList.push(...dataFromLocal);
  movieList.forEach((item) => {
    newView.displayMovieOnPage(item);
  });
}
movieDisplay();

reset.addEventListener("click", function () {
  window.location.reload();
  newView.removeDisplay();
  localStorage.removeItem("movie");
  movieList.splice(0);
});
