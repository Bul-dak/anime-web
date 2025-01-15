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
