import { setLocalStorageKey } from "../src/local-storage-helpers";
import { renderUserContent } from "../src/render-functions";
import { renderWatchlist } from "./watchlist-render-functions";
import { checkAndApplyTheme } from "../src/dom-helpers";
const main = async () => {
  renderUserContent();

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

  document.addEventListener("DOMContentLoaded", renderWatchlist);
};

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

main();
