import { getLocalStorageKey } from "./local-storage-helpers";
import {
  handleDetailsClose,
  handleDetailsOpen,
  handleSave,
  handleDelete,
  handleLogout,
} from "./dom-helpers";

export const renderAnimeDetails = (animeObj) => {
  console.log("Render Anime Details object check: ", animeObj);

  const dialog = document.getElementById("detailed-view");

  const img = document.createElement("img");
  img.setAttribute("src", animeObj.imageUrl);
  img.setAttribute("alt", `Picture of ${animeObj.title}`);

  const title = document.createElement("h3");
  title.textContent = animeObj.title;
  title.setAttribute("id", "main-title");

  dialog.append(img, title);

  if (animeObj.titleEnglish) {
    const title2 = document.createElement("h4");
    title2.textContent = animeObj.titleEnglish;
    dialog.append(title2);
  }
  if (animeObj.type) {
    const type = document.createElement("p");
    type.textContent = `Type: ${animeObj.type}`;
    type.setAttribute("id", "type");
    dialog.append(type);
  }
  if (animeObj.genres) {
    const genres = document.createElement("p");
    genres.textContent = `Genres: ${animeObj.genres}`;
    genres.setAttribute("id", "genres");
    dialog.append(genres);
  }
  if (animeObj.episodes) {
    const episodes = document.createElement("p");
    episodes.textContent = `Episodes: ${animeObj.episodes}`;
    episodes.setAttribute("id", "episodes");
    dialog.append(episodes);
  }
  if (animeObj.studio) {
    const studio = document.createElement("p");
    studio.textContent = `Studio: ${animeObj.studio}`;
    studio.setAttribute("id", "studio");
    dialog.append(studio);
  }
  if (animeObj.rank) {
    const rank = document.createElement("p");
    rank.textContent = `Rank: ${animeObj.rank}`;
    rank.setAttribute("id", "rank");
    dialog.append(rank);
  }
  if (animeObj.aired) {
    const aired = document.createElement("p");
    aired.textContent = `Aired: ${animeObj.aired}`;
    aired.setAttribute("id", "aired");
    dialog.append(aired);
  }
  if (animeObj.synopsis) {
    const synopsis = document.createElement("p");
    synopsis.textContent = `Synopsis: ${animeObj.synopsis}`;
    synopsis.setAttribute("id", "synopsis");
    const divSynopsis = document.createElement("div");
    divSynopsis.setAttribute("id", "synopsis");
    divSynopsis.append(synopsis);
    dialog.append(divSynopsis);
  }
  if (animeObj.trailer) {
    const trailer = document.createElement("div");
    console.log(animeObj.trailer);
    trailer.innerHTML = `
      <iframe
        width="320"
        height="240"
        src=${animeObj.trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
    dialog.append(trailer);
  }

  const saveButton = document.createElement("button");
  saveButton.setAttribute("id", "save-anime");
  saveButton.setAttribute("data-id", animeObj.id);
  saveButton.addEventListener("click", handleSave);
  saveButton.textContent = "Save to Watch List";

  const closeButton = document.createElement("button");
  closeButton.setAttribute("id", "close-modal");
  closeButton.addEventListener("click", handleDetailsClose);
  closeButton.textContent = "Close";

  dialog.append(saveButton, closeButton);
};

// function that renders anime in array stored in local storage with top 5 rankings.
export const renderTopFiveAnime = () => {
  // retrieve anime data from local storage
  const allAnimeArray = getLocalStorageKey("allAnime");

  // store the div where we'll be rendering our top ranked anime in a variable
  const topFiveDiv = document.querySelector("#top-five-anime");
  // Iterate through the first 5 items in array since anime in array are already stored in a rank base order.
  for (let i = 0; i <= 7; i++) {
    // create a div and with two elements inside. (top one will be the image and second one will be the title)
    const div = document.createElement("div");
    div.classList = "anime-card";

    const img = document.createElement("img");
    img.setAttribute("class", "anime-img");
    img.src = allAnimeArray[i].image;
    img.setAttribute("data-id", allAnimeArray[i].id);
    img.addEventListener("click", handleDetailsOpen);

    const title = document.createElement("h3");
    title.classList = "anime-title";
    title.textContent = allAnimeArray[i].title;

    // append the elements to div with class "anime-card"
    div.append(img);
    div.append(title);

    // append div to topFiveDiv
    topFiveDiv.append(div);
  }
};

export const renderRecommendedAnime = (animeObj) => {
  const renderZone = document.getElementById("render-zone");
  try {
    const animeDiv = document.createElement("div");
    animeDiv.classList = "anime-card";
    const img = document.createElement("img");
    img.setAttribute("src", animeObj.image);
    img.setAttribute("alt", `Picture of ${animeObj.title}`);
    img.setAttribute("data-id", animeObj.id);

    img.addEventListener("click", handleDetailsOpen);

    const title = document.createElement("h3");
    title.textContent = animeObj.title;
    title.setAttribute("id", "main-title");
    title.setAttribute("class", "anime-title");

    animeDiv.append(img, title);
    renderZone.append(animeDiv);
    // renderZone.append(animeDiv, title);
  } catch (error) {
    console.error(error.message);
    const p = document.createElement("p");
    p.textContent = "No Valid Search";
    renderZone.append(p);
  }
};

export const renderUsername = (user) => {
  if (!user || !user.username) {
    console.error("Invalid user object or missing username.");
    return;
  }

  // Select the login button container
  const loginDiv = document.querySelector(".login-button");
  if (!loginDiv) {
    console.error("Login button container not found.");
    return;
  }

  try {
    // Clear and update the loginDiv
    loginDiv.innerHTML = "";
    loginDiv.classList.replace("login-button", "menu-item");

    // Insert HTML structure for username and dropdown
    loginDiv.innerHTML = `
      <h4 class="username">${user.username}</h4>
      <div class="dropdown">
        <a href="/anime-web/watchlist/watchlist.html">Watchlist</a>
        <a href="#" class="logout">Logout</a>
      </div>
    `;

    // Add logout functionality
    const logoutButton = loginDiv.querySelector(".logout");
    logoutButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        localStorage.removeItem("activeUser");
        if (window.location.pathname !== "/anime-web/index.html") {
          window.location.href = "/anime-web/index.html";
        } else {
          // Optionally, just reload the page
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during logout process:", error);
      }
    });
  } catch (error) {
    console.error("Error rendering username dropdown:", error);
  }
};

/**
 * Render user-specific content if a user is logged in.
 */
export const renderUserContent = () => {
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));

      if (activeUser?.username) {
        renderUsername(activeUser);
      } else {
        console.log("No active user found or user is not logged in.");
      }
    } catch (error) {
      console.error("Error parsing active user data from localStorage:", error);
    }
  });
};
export const renderAnimeDetailsWatchlist = (animeObj) => {
  console.log("Render Anime Details object check: ", animeObj);

  const dialog = document.getElementById("detailed-view");

  const img = document.createElement("img");
  img.setAttribute("src", animeObj.imageUrl);
  img.setAttribute("alt", `Picture of ${animeObj.title}`);

  const title = document.createElement("h3");
  title.textContent = animeObj.title;
  title.setAttribute("id", "main-title");

  dialog.append(img, title);

  if (animeObj.titleEnglish) {
    const title2 = document.createElement("h4");
    title2.textContent = animeObj.titleEnglish;
    dialog.append(title2);
  }
  if (animeObj.type) {
    const type = document.createElement("p");
    type.textContent = `Type: ${animeObj.type}`;
    type.setAttribute("id", "type");
    dialog.append(type);
  }
  if (animeObj.genres) {
    const genres = document.createElement("p");
    genres.textContent = `Genres: ${animeObj.genres}`;
    genres.setAttribute("id", "genres");
    dialog.append(genres);
  }
  if (animeObj.episodes) {
    const episodes = document.createElement("p");
    episodes.textContent = `Episodes: ${animeObj.episodes}`;
    episodes.setAttribute("id", "episodes");
    dialog.append(episodes);
  }
  if (animeObj.studio) {
    const studio = document.createElement("p");
    studio.textContent = `Studio: ${animeObj.studio}`;
    studio.setAttribute("id", "studio");
    dialog.append(studio);
  }
  if (animeObj.rank) {
    const rank = document.createElement("p");
    rank.textContent = `Rank: ${animeObj.rank}`;
    rank.setAttribute("id", "rank");
    dialog.append(rank);
  }
  if (animeObj.aired) {
    const aired = document.createElement("p");
    aired.textContent = `Aired: ${animeObj.aired}`;
    aired.setAttribute("id", "aired");
    dialog.append(aired);
  }
  if (animeObj.synopsis) {
    const synopsis = document.createElement("p");
    synopsis.textContent = `Synopsis: ${animeObj.synopsis}`;
    synopsis.setAttribute("id", "synopsis");
    const divSynopsis = document.createElement("div");
    divSynopsis.setAttribute("id", "synopsis");
    divSynopsis.append(synopsis);
    dialog.append(divSynopsis);
  }
  if (animeObj.trailer) {
    const trailer = document.createElement("div");
    console.log(animeObj.trailer);
    trailer.innerHTML = `
      <iframe
        width="320"
        height="240"
        src=${animeObj.trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
    dialog.append(trailer);
  }

  const removeButton = document.createElement("button");
  removeButton.setAttribute("id", "remove-anime");
  removeButton.setAttribute("data-id", animeObj.id);
  removeButton.addEventListener("click", handleDelete);
  removeButton.textContent = "Remove from Watch List";

  const closeButton = document.createElement("button");
  closeButton.setAttribute("id", "close-modal");
  closeButton.addEventListener("click", handleDetailsClose);
  closeButton.textContent = "Close";

  dialog.append(removeButton, closeButton);
};
