/* import { handleRandomButton, handleSubmitRecommendation } from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { renderTopFiveAnime, renderUsername } from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";
import { getRandomAnime } from "./getValidAnime";

// All anime endpoint
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

const main = async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (activeUser && activeUser.username) {
      renderUsername(activeUser);
    } else {
      console.log("No active user or user is not logged in");
    }
  });

  setRecommendedAnime();
  await fetchAllAnime(AllAnimeUrl);
  renderTopFiveAnime();

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmitRecommendation);

  const random = document.getElementById("random-button");
  random.addEventListener("click", handleRandomButton);
};

main(); */

import "./style.css";

// Import local-Storage-helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// Import fetch-helpers functions
import { fetchAllAnimes } from "./fetch-helpers";

// Import render-main functions
import { renderTopFiveAnimes, renderUserContent } from "./render-main";

// Import getActiveUser from login-main.js
import { getActiveUser } from "../login/main-login";

// store url of API from where we'll be retrieveing all animes in a variable
const AllAnimesUrl = "https://api.jikan.moe/v4/top/anime";

// call function fetchAllAnimes, pass it allAnimesUrL and store its returned value on local storage
fetchAllAnimes(AllAnimesUrl);

// call function renderTopFiveAnimes
renderTopFiveAnimes();

// Wait for the DOM to be fully loaded
renderUserContent();

// grab all the genreSelectors dropdown options
const genresSelectors = document.querySelectorAll(".dropdown");

// iterate over all of them and retrieve their dataset values
genresSelectors.forEach((genreSelector) => {
  genreSelector.addEventListener("click", async (event) => {
    const genre = event.target.dataset.genre;
    setLocalStorageKey("currentGenre", genre);
    const type = event.target.dataset.type;
    setLocalStorageKey("currentType", type);
    setLocalStorageKey("currentPage", 1);

    // Log to check if the values are correctly retrieved
    console.log(`Genre: ${genre}, Type: ${type}`);
  });
});
