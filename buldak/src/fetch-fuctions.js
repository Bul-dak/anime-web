// Base url for all fetch functions
const baseUrl = "https://api.jikan.moe/v4/anime";

const fetchData = async (url) => {
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

  const animeObj = {
    title: data.data.title,
    titleEnglish: data.data.title_english,
    imageUrl: data.data.images.jpg.image_url,
    largeImageUrl: data.data.images.jpg.large_image_url,
    type: data.data.type,
    episodes: data.data.episodes,
    aired: data.data.aired.string,
    lifeStatus: data.data.status,
    duration: data.data.duration,
    rating: data.data.rating,
    rank: data.data.rank,
    popularity: data.data.popularity,
    synopsis: data.data.synopsis,
    season: data.data.season,
    year: data.data.year,
    studio: data.data.studios[0].name,
    trailer: data.data.trailer.url,
  };

  console.log("Anime Object: ", animeObj);
  return animeObj;
};

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
