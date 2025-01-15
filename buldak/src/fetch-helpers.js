// Import localStorage helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// API Details:
/* Rate Limiting
Duration	Requests
Daily	Unlimited
Per Minute	60 requests
Per Second	3 requests
*/

/* Create a function that fetches ALL THE ANIME(movies and series) from the first page*/

export const fetchAllAnime = async (url) => {
  try {
    const response = await fetch(url);

    // Throw an error if the response was not ok - let the catch statement handle it
    if (!response.ok) throw new Error("Failed to fetch ALL THE ANIME!!");
    // Throw an error if there was a fetch error
    if (response === null) return response;

    // parse the data into valid JSON
    const allAnimeJson = await response.json();

    // Create variable allAnimeArray where we will store titles, id#s, rank of each anime.
    const allAnimeArray = [];
    allAnimeJson.data.forEach((anime) => {
      if (anime.type === "TV" || anime.movie === "Movie") {
        allAnimeArray.push({
          title: anime["title_english"],
          image: anime.images.jpg.image_url,
          type: anime.type,
          id: anime.mal_id,
          popularity: anime.rank,
        });
      }
    });

    // store array in local storage
    setLocalStorageKey("allAnime", allAnimeArray);

    console.log(`allAnimeArray.length: ${allAnimeArray.length}`, allAnimeArray);
  } catch (error) {
    // catch errors if there's any!
    console.warn(error.message);
    return null;
  }
};
