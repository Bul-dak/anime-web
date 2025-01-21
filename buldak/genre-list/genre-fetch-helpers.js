// import genre helpers
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from "../src/local-storage-helpers";
import { genreListPageScroller, renderGenderList } from "./genre-helpers";

/* Develop logic for fetching animes from an api based on genre, user can also click on a button 
   to either fetch animes that match the genre from the next page in the api or to fetch animes that
   the genre on the previous page */

export const fetchAnimesBasedOnGenre = async (genre, type, pageNumber) => {
  console.log(`Genre: ${genre} -- Type: ${type}`);

  console.log("Current Page Number:", pageNumber);

  // Construct the URL for the genre filter
  const apiUrl = `https://api.jikan.moe/v4/top/anime?genre=${genre}&type=${type}&page=${pageNumber}&limit=25`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Failed to fetch ALL THE ANIMES!!");
    if (response === null) return response;

    const genderAnimeJson = await response.json();

    // Check the structure of the response data (for debugging purposes)
    console.log(`genderAnimeJson: ${genderAnimeJson}`);

    // Check if `data` exists before calling `forEach`
    if (!genderAnimeJson.data) {
      console.error("API Response does not contain 'data' property.");
      return;
    }

    // Create an array for storing filtered anime based on genre and type
    const allAnimeArray = [];
    // Loop through each anime
    genderAnimeJson.data.forEach((anime) => {
      // Map through anime.genres to get the genre names as an array
      const genreNames = anime.genres.map((genreItem) => genreItem.name);

      // Check if the genre exists in the genreNames array and if the type matches
      if (genreNames.includes(genre) && anime.type === type) {
        allAnimeArray.push({
          title: anime["title_english"] || anime.title,
          image: anime.images.jpg.image_url,
          type: anime.type,
          id: anime.mal_id,
          popularity: anime.rank,
        });
      }
    });

    // Store the data in localStorage (as JSON string)
    if (allAnimeArray.length > 0) {
      localStorage.setItem("genderList", JSON.stringify(allAnimeArray));
    }

    console.log(`allAnimeArray.length: ${allAnimeArray.length}`, allAnimeArray);
    renderGenderList(allAnimeArray); // Call the render function to display the fetched data
  } catch (error) {
    console.warn(error.message);
    return null;
  }
};

// Calling fetchAnimesBasedOnGenre whenever the page changes (previous/next)
export const fetchAnimes = async () => {
  const genre = getLocalStorageKey("currentGenre");
  const type = getLocalStorageKey("currentType");
  const pageNumber = getLocalStorageKey("currentPage") || 1;

  if (genre && type) {
    const animes = await fetchAnimesBasedOnGenre(genre, type, pageNumber);
  } else {
    console.error("Genre or Type is missing in localStorage");
  }
};

// figure out how to click next or button and load animes from API.page=CurreentPage
/* One possible fix could be to call  my fetch and render functions inside of event listeners attach 
   to both previous page button and next page button, this way every time  an user clicks one of these
   button we will fetch a new page from the jinkan api and render it */
