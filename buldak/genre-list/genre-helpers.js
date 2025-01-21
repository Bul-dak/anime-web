// import localStorage helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "../src/local-storage-helpers";
import { fetchAnimesBasedOnGenre, fetchAnimes } from "./genre-fetch-helpers";

/* Create a function to aid us in moving through genre-list pages */

// Create a function to aid us in moving through genre-list pages
export const genreListPageScroller = () => {
  let pageNumber = getLocalStorageKey("currentPage") || 1; // Retrieve current page from localStorage or default to 1

  // retrieve elements related to page logic
  const h3CurrentPage = document.querySelector("#page-number");
  const previousPageButton = document.querySelector(
    ".pagination-button-previous"
  );
  const nextPageButton = document.querySelector(".pagination-button-next");

  // Event listener for previous page
  previousPageButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (pageNumber > 1) {
      pageNumber--;
      setLocalStorageKey("currentPage", pageNumber); // Store updated page number in localStorage
      h3CurrentPage.textContent = `Page ${pageNumber}`; // Update the displayed page number

      // fetch anime for the new page
      fetchAnimes();
    }
  });

  // Event listener for next page
  nextPageButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (pageNumber < 50) {
      // Ensure it doesn't go above 50 pages
      pageNumber++;
      setLocalStorageKey("currentPage", pageNumber); // Store updated page number in localStorage
      h3CurrentPage.textContent = `Page ${pageNumber}`; // Update the displayed page number

      // fetch animee for the new page
      fetchAnimes();
    }
  });

  // Update the text content of the page number display
  h3CurrentPage.textContent = `Page ${pageNumber}`;
  setLocalStorageKey("currentPage", pageNumber);
};

// Function to render gender list from localStorage
export const renderGenderList = (genderListArray) => {
  // store the div where we'll be rendering our gender list animes in a variable
  const genreDiv = document.querySelector("#anime-grid");

  // Clear any existing content in the grid
  genreDiv.innerHTML = "";

  // If genderListArray is null or undefined, return early to avoid errors
  if (!genderListArray || genderListArray.length === 0) {
    console.error("No genre list found in localStorage.");
    genreDiv.innerHTML = "<h3>No Titles Found In This Page</h3>";
    return;
  }

  // Iterate through the genderListArray and create elements for each anime
  genderListArray.forEach((anime) => {
    const div = document.createElement("div");
    div.classList.add("anime-card"); // Add the correct class to the div

    const img = document.createElement("img");
    img.src = anime.image;

    const title = document.createElement("h3");
    title.classList.add("anime-title");
    title.textContent = anime.title;

    // Append the elements to the div with the class "anime-card"
    div.appendChild(img);
    div.appendChild(title);

    // Append div to the main genre div
    genreDiv.appendChild(div);
  });
};
