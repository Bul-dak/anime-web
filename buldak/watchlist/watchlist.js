import { setLocalStorageKey } from "../src/local-storage-helpers";
import { renderUserContent } from "../src/render-functions";
import { renderWatchlist } from "./watchlist-render-functions";

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

main();
