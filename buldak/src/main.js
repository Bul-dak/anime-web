import { handleRandomButton, handleSubmitRecommendation } from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { renderTopFiveAnime, renderUsername } from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";
import { getRandomAnime } from "./getValidAnime";

// All anime endpoint
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

const main = async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (activeUser && activeUser.username) {
      renderUsername(activeUser);
    } else {
      console.log("No active user or user is not logged in");
    }
  });

  setRecommendedAnime();
  await fetchAllAnime(AllAnimeUrl);
  renderTopFiveAnime();

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmitRecommendation);

  const random = document.getElementById("random-button");
  random.addEventListener("click", handleRandomButton);
};

main();
