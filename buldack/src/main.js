import "./style.css";

// Import local-Storage-helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// Import fetch-helpers functions
import { fetchAllAnime } from "./fetch-helpers";

// Import render-main functions
import { renderTopFiveAnimes, renderUsername } from "./render-main";

// Import getActiveUser from login-main.js
import { getActiveUser } from "../login/main-login";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (activeUser && activeUser.username) {
    renderUsername(activeUser);
  } else {
    console.log("No active user or user is not logged in");
  }
});

// store url of API from where we'll be retrieving all anime in a variable
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

// call function fetchAllAnime, pass it allAnimeUrL and store its returned value on local storage
fetchAllAnime(AllAnimeUrl);

// call function renderTopFiveAnime
renderTopFiveAnime();
