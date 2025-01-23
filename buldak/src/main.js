import { handleRandomButton, handleSubmitRecommendation } from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { setLocalStorageKey } from "./local-storage-helpers";
import {
  renderTopFiveAnime,
  renderUserContent,
  renderUsername,
} from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";

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

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmitRecommendation);

  const random = document.getElementById("random-button");
  random.addEventListener("click", handleRandomButton);
};

main();
