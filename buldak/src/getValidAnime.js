// This file is for all functions to get anime based of the criteria submitted via the form

import { fetchData } from "./fetch-functions";

const AllAnimeUrl = "https://api.jikan.moe/v4/anime";

export const getRandomAnime = async () => {
  console.log("getRandomAnime is executing");

  const data = await fetchData(AllAnimeUrl);
  console.log(data);

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

  console.log(
    "Below is all anime array final for getRandomAnime function",
    allAnimeArray
  );

  const randomAnime =
    allAnimeArray[Math.floor(Math.random() * allAnimeArray.length)];
  // currently anime on page one only
  console.log(randomAnime);
  return randomAnime;
};

// Runs if type is the only value provided and if both values are provided
export const getAnimeByType = async (type) => {
  const data = await fetchData(AllAnimeUrl);
  console.log(data);

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

  const validAnime = [];

  allAnimeArray.forEach((anime) => {
    if (anime.type == type) {
      validAnime.push(anime);
    }
  });
};

export const getAnimeByGenre = async () => {};
