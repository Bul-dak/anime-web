// Base url for all fetch functions
import { setLocalStorageKey } from "./local-storage-helpers";

const baseUrl = "https://api.jikan.moe/v4/anime";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`HTTP Error: ${response.status}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    console.error(error);
  }
};

// Test ID: 52991
export const getAnimeById = async (id) => {
  const url = `${baseUrl}/${id}/full`;

  const data = await fetchData(url);
  console.log("Testing getAnimeById", data);

  const getGenres = () => {
    let genres = [];
    data.data.genres.forEach((genre) => {
      genres.push(genre.name);
    });
    return genres;
  };

  const animeObj = {
    id: data.data.mal_id,
    title: data.data.title,
    titleEnglish: data.data.title_english,
    imageUrl: data.data.images.jpg.image_url,
    type: data.data.type,
    genres: getGenres(),
    episodes: data.data.episodes,
    aired: data.data.aired.string,
    duration: data.data.duration,
    rating: data.data.rating,
    rank: data.data.rank,
    synopsis: data.data.synopsis,
    studio: data.data.studios[0].name,
    trailer: data.data.trailer.embed_url,
  };

  console.log("Anime Object: ", animeObj);
  return animeObj;
};

export const fetchAllAnime = async (url) => {
  try {
    const data = await fetchData(url);
    // Create variable allAnimeArray where we will store titles, id#s, rank of each anime.
    const allAnimeArray = [];
    data.data.forEach((anime) => {
      const getGenres = () => {
        let genres = [];
        anime.genres.forEach((genre) => {
          genres.push(genre.name);
        });
        return genres;
      };
      if (anime.type === "TV" || anime.movie === "Movie") {
        allAnimeArray.push({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url,
          type: anime.type,
          popularity: anime.rank,
          genres: getGenres(),
        });
      }
    });

    // store array in local storage
    setLocalStorageKey("allAnime", allAnimeArray);
  } catch (error) {
    // catch errors if there's any!
    console.warn(error.message);
    return null;
  }
};

// API Details:
/* Rate Limiting
Duration	Requests
Daily	Unlimited
Per Minute	60 requests
Per Second	3 requests
*/
/* Create a function that fetches ALL THE ANIMES(movies and series) from the first page*/
/* export const fetchAllAnimes = async (url) => {
  try {
    const response = await fetch(url);
    // Throw an error if the response was not ok - let the catch statement handle it
    if (!response.ok) throw new Error("Failed to fetch ALL THE ANIMES!!");
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
}; */
