import {
  renderAnimeDetails,
  renderAnimeDetailsWatchlist,
  renderRecommendedAnime,
  renderUsername,
} from "./render-functions";
import { getAnimeById } from "./fetch-functions";
import {
  getLocalStorageKey,
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

export const handleDetailsOpenWatchlist = async (event) => {
  const img = event.target;
  const id = img.dataset.id;
  const animeObj = await getAnimeById(id);
  const dialog = document.querySelector("dialog");
  dialog.innerHTML = "";
  renderAnimeDetailsWatchlist(animeObj);
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
  console.log("Save worked: ", saveButton.dataset.id);

  const activeUser = getLocalStorageKey("activeUser");
  console.log("Active user: ", activeUser);

  const localStorageData = localStorage.getItem("users");

  let parsedData = JSON.parse(localStorageData);

  const animeToBeAdded = await getAnimeById(saveButton.dataset.id);

  console.log("Before if: ", parsedData[activeUser.username].savedAnime);

  let push = true;

  parsedData[activeUser.username].savedAnime.forEach((anime) => {
    if (anime.id == animeToBeAdded.id) {
      push = false;
    }
  });

  if (push == true) {
    parsedData[activeUser.username].savedAnime.push(animeToBeAdded);
  }

  console.log("After if: ", parsedData[activeUser.username].savedAnime);
  const updatedData = JSON.stringify(parsedData);

  localStorage.setItem("users", updatedData);

  setTimeout(() => (saveButton.textContent = "Anime Saved"), 100);
  setTimeout(() => (saveButton.textContent = "Save to Watchlist"), 2000);
};

export const handleRandomButton = async () => {
  const renderZone = document.getElementById("render-zone");
  renderZone.innerHTML = "";

  const randomAnime = await getRandomAnime();
  console.log(randomAnime);
  // Need to have a render function
  renderRecommendedAnime(randomAnime);
};

export const handleDelete = async (event) => {
  const saveButton = event.target;
  console.log("Save worked: ", saveButton.dataset.id);

  const activeUser = getLocalStorageKey("activeUser");
  console.log("Active user: ", activeUser);

  const localStorageData = localStorage.getItem("users");

  let parsedData = JSON.parse(localStorageData);

  const animeToBeDeleted = await getAnimeById(saveButton.dataset.id);

  console.log("Before if: ", parsedData[activeUser.username].savedAnime);

  // Find the index of the anime to be deleted
  const animeIndex = parsedData[activeUser.username].savedAnime.findIndex(
    (anime) => anime.id == animeToBeDeleted.id
  );

  if (animeIndex !== -1) {
    parsedData[activeUser.username].savedAnime.splice(animeIndex, 1); // Remove the anime
    console.log("Anime removed:", animeToBeDeleted);
  } else {
    console.log("Anime not found in the saved list");
  }

  console.log("After deletion: ", parsedData[activeUser.username].savedAnime);

  const updatedData = JSON.stringify(parsedData);
  localStorage.setItem("users", updatedData);

  // Optionally reload the page to update the UI or you can re-render the list without reload
  location.reload();
};
export const handleLoad = () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (activeUser && activeUser.username) {
    renderUsername(activeUser);
  } else {
    console.log("No active user or user is not logged in");
  }
};

export const handleLogout = () => {
  window.location.href = "../index.html";
  console.log("No active user or user is not logged in");
};
