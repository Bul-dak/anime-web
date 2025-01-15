import "./style.css";

// Import local-Storage-helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// Import fetch-helpers functions
import { fetchAllAnimes } from "./fetch-helpers";

// Import render-main functions
import { renderTopFiveAnimes } from "./render-main";

// store url of API from where we'll be retrieveing all animes in a variable
const AllAnimesUrl = "https://api.jikan.moe/v4/top/anime";

// call function fetchAllAnimes, pass it allAnimesUrL and store its returned value on local storage
fetchAllAnimes(AllAnimesUrl);

// call function renderTopFiveAnimes
renderTopFiveAnimes();
