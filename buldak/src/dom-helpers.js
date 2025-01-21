import { renderAnimeDetails, renderRecommendedAnime } from "./render-functions";
import { getAnimeById } from "./fetch-functions";
import {
  setLocalStorageKey,
  setRecommendedAnime,
} from "./local-storage-helpers";
import {
  getAnimeByGenre,
  getAnimeByType,
  getPerfectAnime,
  getRandomAnime,
} from "./getValidAnime";

export const handleDetailsOpen = async (event) => {
  const img = event.target;
  const id = img.dataset.id;
  const animeObj = await getAnimeById(id);
  const dialog = document.querySelector("dialog");
  dialog.innerHTML = "";
  renderAnimeDetails(animeObj);
  dialog.showModal();
};

export const handleDetailsClose = async () => {
  const dialog = document.querySelector("dialog");
  dialog.innerHTML = "";
  dialog.close();
};

export const handleSubmitRecommendation = async (event) => {
  event.preventDefault();
  const form = document.querySelector("form");

  setRecommendedAnime();

  const formData = new FormData(event.target);
  const formObj = Object.fromEntries(formData);
  const { type, genre } = formObj;
  console.log(formObj);
  console.log(type, genre);

  // I need to get all the anime that fit with the type, i.e movie: [all anime that are movies]
  // As well as the basic random anime (1st priority)

  try {
    if (type != "" && genre) {
      const renderZone = document.getElementById("render-zone");
      renderZone.innerHTML = "";
      const randomAnime = await getPerfectAnime(type, genre);
      console.log(randomAnime);
      renderRecommendedAnime(randomAnime);
    } else if (type != "") {
      const renderZone = document.getElementById("render-zone");
      renderZone.innerHTML = "";
      const randomAnime = await getAnimeByType(type);
      console.log(randomAnime);
      renderRecommendedAnime(randomAnime);
    } else if (genre) {
      const renderZone = document.getElementById("render-zone");
      renderZone.innerHTML = "";
      const randomAnime = await getAnimeByGenre(genre);
      console.log(randomAnime);
      renderRecommendedAnime(randomAnime);
    }
  } catch (error) {
    console.error(error.message);
    const renderZone = document.getElementById("render-zone");
    renderZone.innerHTML = "";

    const p = document.createElement("p");
    p.textContent =
      'Invalid Search or search parameters empty, choose "Random"';

    renderZone.append(p);
  }
  form.reset();
};

export const handleSave = async (event) => {
  const saveButton = event.target;
};

export const handleRandomButton = async () => {
  const renderZone = document.getElementById("render-zone");
  renderZone.innerHTML = "";

  const randomAnime = await getRandomAnime();
  console.log(randomAnime);
  // Need to have a render function
  renderRecommendedAnime(randomAnime);
};
