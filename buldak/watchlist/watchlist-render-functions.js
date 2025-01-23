import {
  handleDetailsOpen,
  handleDetailsOpenWatchlist,
} from "../src/dom-helpers";
import { getLocalStorageKey } from "../src/local-storage-helpers";

export const renderSavedAnime = (savedAnimeArray) => {
  const genreDiv = document.getElementById("anime-grid");

  if (genreDiv) {
    genreDiv.innerHTML = "";

    if (!savedAnimeArray || savedAnimeArray.length < 1) {
      console.error("No SavedAnime found in localStorage.");
      genreDiv.innerHTML = "<h3>No Saved Anime</h3>";
      return;
    }

    savedAnimeArray.forEach((anime) => {
      console.log("savedAnime foreach works: ", anime);

      const div = document.createElement("div");
      div.classList.add("anime-card");

      const img = document.createElement("img");
      img.src = anime.imageUrl;
      img.setAttribute("data-id", anime.id);
      img.addEventListener("click", handleDetailsOpenWatchlist);

      const title = document.createElement("h3");
      title.classList.add("anime-title");
      title.textContent = anime.title;

      div.appendChild(img);
      div.appendChild(title);

      genreDiv.appendChild(div);
    });
  } else {
    console.error("anime-grid element not found.");
  }
};

export const renderWatchlist = () => {
  const activeUser = getLocalStorageKey("activeUser");
  console.log("Active user: ", activeUser);

  const localStorageData = localStorage.getItem("users");

  let parsedData = JSON.parse(localStorageData);

  renderSavedAnime(parsedData[activeUser.username].savedAnime);
};
