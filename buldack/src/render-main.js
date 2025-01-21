// Import fetch-helper functions
import { fetchAllAnimes } from "./fetch-helpers";

//  Import local-storage-helper functions
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

// function that renders animes in array stored in local storage with top 5 rankings.
export const renderTopFiveAnimes = () => {
  // retrieve anime data from local storage
  const allAnimeArray = getLocalStorageKey("allAnime");

  // store the div where we'll be rendering our top ranked animes in a variable
  const topFiveDiv = document.querySelector("#top-five-anime");
  // Iterate through the first 5 items in array since animes in array are already stored in a rank base order.
  for (let i = 0; i <= 5; i++) {
    // create a div and with two elements inside. (top one will be the image and second one will be the title)
    const div = document.createElement("div");
    div.classList = "anime-card";

    const img = document.createElement("img");
    img.src = allAnimeArray[i].image;

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

/* Develop logic for unrendering log in button in index.html after user logs in and 
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

  // reassing the class of loginDiv to .menu-item for styling reasons
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

// Wait for the DOM to be fully loaded
export const renderUserContent = () => {
  // if user is logged in while on buldack this should re-render the main page accordingly
  document.addEventListener("DOMContentLoaded", () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (activeUser && activeUser.username) {
      renderUsername(activeUser);
    } else {
      console.log("No active user or user is not logged in");
    }
  });
};
