import { getLocalStorageKey } from "./local-storage-helpers";
import {
  handleDetailsClose,
  handleDetailsOpen,
  handleSave,
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
  for (let i = 0; i <= 5; i++) {
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
    const img = document.createElement("img");
    img.setAttribute("src", animeObj.image);
    img.setAttribute("alt", `Picture of ${animeObj.title}`);
    img.setAttribute("data-id", animeObj.id);
    img.addEventListener("click", handleDetailsOpen);

    const title = document.createElement("h3");
    title.textContent = animeObj.title;
    title.setAttribute("id", "main-title");

    renderZone.append(img, title);
  } catch (error) {
    console.error(error.message);
    const p = document.createElement("p");
    p.textContent = "No Valid Search";
    renderZone.append(p);
  }
};

/* Develop logic for un-rendering log in button in index.html after user logs in and 
   instead replace login button for username dropdown menu with the
   following two options (watchlist and logout) */

export const renderUsername = (user) => {
  // Ensure the user object has the username field
  if (!user || !user.username) {
    console.error("User object or username is missing");
    return;
  }

  // grab log in div element from top bar and clear its inner html
  const loginDiv = document.querySelector(".login-button");
  loginDiv.classList.remove("login-button");
  loginDiv.innerHTML = "";

  // reading the class of loginDiv to .menu-item for styling reasons
  loginDiv.classList = "menu-item";

  // create a h4 element with the user.username as it's text content
  const h4 = document.createElement("h4");
  h4.textContent = `${user.username}`;
  loginDiv.append(h4);

  // create another div element and assign it the class .dropdown for styling reasons
  const dropdownDiv = document.createElement("div");
  dropdownDiv.classList = "dropdown";

  // create anchor tag for watchlist
  const anchor1 = document.createElement("a");
  anchor1.href = "/watchlist/watchlist.html";
  anchor1.textContent = "watchlist";

  // create anchor tag for logout
  const anchor2 = document.createElement("a");
  anchor2.textContent = "logout";

  // add an event listener to log out that removes activeUser from local storage and reloads the page.
  anchor2.addEventListener("click", (event) => {
    event.preventDefault();
    // remove activeUser from local storage
    localStorage.removeItem("activeUser");
    // reload page to go back to default rendering settings
    location.reload();
  });

  // append anchors to dropdownDiv
  dropdownDiv.append(anchor1);
  dropdownDiv.append(anchor2);

  // append dropdowndiv to loginDiv
  loginDiv.append(dropdownDiv);
};
