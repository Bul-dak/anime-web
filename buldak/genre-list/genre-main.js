import "./genre.css";

// import renderUserContent from src
import { renderUserContent } from "../src/render-functions";

// Import genre-helpers and genre-fetch-helpers functions
import { renderGenderList, genreListPageScroller } from "./genre-helpers";
import { fetchAnimesBasedOnGenre, fetchAnimes } from "./genre-fetch-helpers";

import { setLocalStorageKey } from "../src/local-storage-helpers";

import { checkAndApplyTheme } from "../src/dom-helpers";

// call renderUserContent which changes the display of the top bar based on whether the user is online vs offline
renderUserContent();

// save to local storage info needed to display the correct genre and type

// grab all the genreSelectors dropdown options
const genresSelectors = document.querySelectorAll(".dropdown");

// iterate over all of them and retrieve their dataset values
genresSelectors.forEach((genreSelector) => {
  genreSelector.addEventListener("click", async (event) => {
    event.preventDefault();

    const genre = event.target.dataset.genre;
    setLocalStorageKey("currentGenre", genre);
    const type = event.target.dataset.type;
    setLocalStorageKey("currentType", type);
    // set current page to 1 every time an user changes genre or type
    setLocalStorageKey("currentPage", 1);

    // all  genreListPageScroller in order to re-render current page correctly.
    genreListPageScroller();

    // Log to check if the values are correctly retrieved
    console.log(`Genre: ${genre}, Type: ${type}`);

    // Show a loading state or something to indicate the request is in progress
    const genreDiv = document.querySelector("#anime-grid");
    genreDiv.innerHTML = "<p>Loading...</p>"; // Simple loading message

    // Fetch the anime data for the selected genre and type
    fetchAnimes();
  });
});

// Initialize pagination and fetch animes on page load
document.addEventListener("DOMContentLoaded", () => {
  genreListPageScroller(); // Set up the pagination event listeners
  fetchAnimes(); // Fetch the first page's anime data
});

//Light mode button and dark mode button html elements
const lightModeButton = document.querySelector(".lightmode-button");
const darkModeButton = document.querySelector(".darkmode-button");
const body = document.body;

// Check and apply the user's theme preference from localStorage
const currentTheme = localStorage.getItem("theme");
checkAndApplyTheme(currentTheme);

// Toggle light mode
lightModeButton.addEventListener("click", () => {
  body.classList.add("lightmode");
  body.classList.remove("darkmode");

  localStorage.setItem("theme", "light");
});

// Toggle dark mode
darkModeButton.addEventListener("click", () => {
  body.classList.add("darkmode");
  body.classList.remove("lightmode");

  localStorage.setItem("theme", "dark");
});
