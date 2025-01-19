// Import fetch-helper functions
import { fetchAllAnime } from "./fetch-helpers";

//  Import local-storage-helper functions
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// function that renders anime in array stored in local storage with top 5 rankings.
export const renderTopFiveAnime = () => {
  // retrieve anime data from local storage
  const allAnimeArray = getLocalStorageKey("allAnime");

  // store the div where we'll be rendering our top ranked anime in a variable
  const topFiveDiv = document.querySelector("#top-five-anime");
  // Iterate through the first 5 items in array since anime in array are already stored in a rank base order.
  for (let i = 0; i <= 5; i++) {
    // create a div and with two elements inside. (top one will be the image and second one will be the title)
    const div = document.createElement("div");
    div.classList = "anime-card";

    const img = document.createElement("img");
    img.src = allAnimeArray[i].image;

    const title = document.createElement("h3");
    title.classList = "anime-title";
    title.textContent = allAnimeArray[i].title;

    // append the elements to div with class "anime-card"
    div.append(img);
    div.append(title);

    // append div to topFiveDiv
    topFiveDiv.append(div);
  }
};
