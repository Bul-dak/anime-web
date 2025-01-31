import {
  handleLoad,
  handleRandomButton,
  handleSubmitRecommendation,
} from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { setLocalStorageKey } from "./local-storage-helpers";
import { renderTopFiveAnime, renderUserContent } from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";

// All anime endpoint
const AllAnimeUrl = "https://api.jikan.moe/v4/top/anime";

const main = async () => {
  try {
    // Ensure the DOM is ready
    handleLoad();

    // Set up initial data and render UI
    setRecommendedAnime();
    await fetchAllAnime(AllAnimeUrl);
    renderTopFiveAnime();
    renderUserContent();

    // Delegate dropdown click events
    const genreContainer = document.querySelector(".menu");
    if (genreContainer) {
      genreContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.dataset?.genre && target.dataset?.type) {
          setLocalStorageKey("currentGenre", target.dataset.genre);
          setLocalStorageKey("currentType", target.dataset.type);
          setLocalStorageKey("currentPage", 1);

          console.log(
            `Genre: ${target.dataset.genre}, Type: ${target.dataset.type}`
          );
        }
      });
    } else {
      console.warn("Genre dropdown menu container not found.");
    }

    // Add form submission handling
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", handleSubmitRecommendation);
    } else {
      console.warn("Form not found on the page.");
    }

    // Add random button handling
    const randomButton = document.getElementById("random-button");
    if (randomButton) {
      randomButton.addEventListener("click", handleRandomButton);
    } else {
      console.warn("Random button not found on the page.");
    }
  } catch (error) {
    console.error("Error initializing main function:", error);
  }
};

// Execute main
main();

const lightModeButton = document.querySelector(".lightmode-button");
const darkModeButton = document.querySelector(".darkmode-button");
const body = document.body;

// Check and apply the user's theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  body.classList.add("lightmode");
  body.classList.remove("darkmode");
} else if (currentTheme === "dark") {
  body.classList.add("darkmode");
  body.classList.remove("lightmode");
}

// Toggle light mode
lightModeButton.addEventListener("click", () => {
  body.classList.add("lightmode");
  body.classList.remove("darkmode");

  localStorage.setItem("theme", "light");
});

// Toggle dark mode
darkModeButton.addEventListener("click", () => {
  body.classList.add("darkmode");
  body.classList.remove("lightmode");

  localStorage.setItem("theme", "dark");
});
