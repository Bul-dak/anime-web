import "./style.css";

// Import local-Storage-helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// Import fetch-helpers functions
import { fetchAllAnime } from "./fetch-helpers";

// Import render-main functions
import { renderTopFiveAnime } from "./render-main";

// store url of API from where we'll be retrieving all anime in a variable
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

// call function fetchAllAnime, pass it allAnimeUrL and store its returned value on local storage
fetchAllAnime(AllAnimeUrl);

// call function renderTopFiveAnime
renderTopFiveAnime();
