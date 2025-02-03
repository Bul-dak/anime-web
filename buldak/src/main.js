import {
  handleLoad,
  handleRandomButton,
  handleSubmitRecommendation,
  checkAndApplyTheme,
} from "./dom-helpers";
import "./style.css";
import { fetchAllAnime } from "./fetch-functions";
import { setLocalStorageKey } from "./local-storage-helpers";
import { renderTopFiveAnime, renderUserContent } from "./render-functions";
import { setRecommendedAnime } from "./local-storage-helpers";

// Main execution logic wrapped in a single function to better manage async setup
const main = async () => {
  try {
    // Handle initial setup like loading and applying theme
    handleLoad();
    initializeTheme();

    // Set initial recommended anime and fetch all anime data
    await setupAnimeData();

    // Set up genre dropdown and event listeners
    setupGenreDropdown();

    // Set up form submission handling
    setupFormHandling();

    // Set up random button functionality
    setupRandomButton();
  } catch (error) {
    console.error("Error initializing main function:", error);
  }
};

// Function to handle light/dark mode
const initializeTheme = () => {
  const lightModeButton = document.querySelector(".lightmode-button");
  const darkModeButton = document.querySelector(".darkmode-button");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme");
  checkAndApplyTheme(currentTheme); // Apply theme on load

  // Add event listeners for both buttons
  lightModeButton?.addEventListener("click", () => {
    toggleTheme("light", body);
  });

  darkModeButton?.addEventListener("click", () => {
    toggleTheme("dark", body);
  });
};

// Helper function to toggle themes
const toggleTheme = (theme, body) => {
  if (theme !== localStorage.getItem("theme")) {
    const oppositeTheme = theme === "light" ? "dark" : "light";
    body.classList.toggle(`${theme}mode`);
    body.classList.remove(`${oppositeTheme}mode`);
    console.log(body.classList);
    localStorage.setItem("theme", theme);
  }
};

// Function to fetch and render all anime-related data
const setupAnimeData = async () => {
  try {
    setRecommendedAnime();
    await fetchAllAnime("https://api.jikan.moe/v4/top/anime");
    renderTopFiveAnime();
    renderUserContent();
  } catch (error) {
    console.error("Error setting up anime data:", error);
  }
};

// Function to set up genre dropdown and handle clicks
const setupGenreDropdown = () => {
  const genreContainer = document.querySelector(".menu");
  genreContainer?.addEventListener("click", (event) => {
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
};

// Function to handle form submissions for recommendations
const setupFormHandling = () => {
  const form = document.querySelector("form");
  form?.addEventListener("submit", handleSubmitRecommendation);
};

// Function to set up random button functionality
const setupRandomButton = () => {
  const randomButton = document.getElementById("random-button");
  randomButton?.addEventListener("click", handleRandomButton);
};

// Execute main
document.addEventListener("DOMContentLoaded", main);
