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
  const pageNumber = Math.floor(Math.random() * 50);
  const animeUrl = `https://api.jikan.moe/v4/top/anime?type=${type}&page=${pageNumber}&limit=25`;
  const data = await fetchData(animeUrl);
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

  const validAnimeArray = [];

  allAnimeArray.forEach((anime) => {
    if (anime.type == type) {
      validAnimeArray.push(anime);
    }
  });

  const randomAnime =
    validAnimeArray[Math.floor(Math.random() * validAnimeArray.length)];
  console.log("anime by type result: ", randomAnime);
  return randomAnime;
};

export const getAnimeByGenre = async (genre) => {
  const pageNumber = Math.floor(Math.random() * 50);
  const animeUrl = `https://api.jikan.moe/v4/top/anime?genre=${genre}&page=${pageNumber}&limit=25`;
  const data = await fetchData(animeUrl);
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

  console.log("Genre test allAnime: ", allAnimeArray);

  const validAnimeArray = [];

  allAnimeArray.forEach((anime) => {
    if (anime.genres.includes(genre)) {
      validAnimeArray.push(anime);
    }
  });

  const randomAnime =
    validAnimeArray[Math.floor(Math.random() * validAnimeArray.length)];
  console.log("anime by genre result: ", randomAnime);
  return randomAnime;
};

export const getPerfectAnime = async (type, genre) => {
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

  const genreArray = [];
  const typeArray = [];

  allAnimeArray.forEach((anime) => {
    if (anime.type == type) {
      typeArray.push(anime);
    }
  });
  console.log("step 1, typeArr: ", typeArray);

  allAnimeArray.forEach((anime) => {
    if (anime.genres.includes(genre)) {
      genreArray.push(anime);
    }
  });
  console.log("step 2, genreArr: ", genreArray);

  const perfectAnimeArray = genreArray.filter((anime) =>
    typeArray.includes(anime)
  );

  const randomAnime =
    perfectAnimeArray[Math.floor(Math.random() * perfectAnimeArray.length)];
  console.log("anime by perfect result: ", randomAnime);
  return randomAnime;
};

// testing push should appear
