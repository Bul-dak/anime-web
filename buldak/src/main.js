import { handleRandomButton, handleSubmitRecommendation } from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { renderTopFiveAnime } from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";
import { getRandomAnime } from "./getValidAnime";

// All anime endpoint
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

const main = async () => {
  setRecommendedAnime();
  await fetchAllAnime(AllAnimeUrl);
  renderTopFiveAnime();

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmitRecommendation);

  const renderZone = document.getElementById("random-button");
  renderZone.addEventListener("click", handleRandomButton);
};

main();
