import "./log-in.css";

// Import theme fuction from dom-helpers.js
import { checkAndApplyTheme } from "../src/dom-helpers";

// import local storage helpers
import { setLocalStorageKey } from "../src/local-storage-helpers";

// import login-helpers
import { verifyLogin } from "./login-helpers";

const loginForm = document.querySelector("#login-form");
// if loginForm exists then add an event listener to it.
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Store form data in a FormData object
    const user = new FormData(loginForm);

    // Debugging: Log the form data (optional for production)
    console.log("Form data:", user);

    try {
      // Call verifyLogin function and pass the user data (await to get the result)
      const activeUser = await verifyLogin(user);

      // If login is successful, reset form and then store activeUser in local storage for persistence and for future rendering functions
      if (activeUser) {
        setLocalStorageKey("activeUser", activeUser);
        loginForm.reset(); // Reset form inputs only if login is successful
      }
    } catch (error) {
      // Handle any errors (e.g., incorrect login, hashing issues)
      console.error("Login error:", error);
      // Optionally, show an alert or message for failed login
      alert("Login failed. Please try again.");
    }
  });
}

export const getActiveUser = () => {
  const activeUser = localStorage.getItem("activeUser");
  return activeUser ? JSON.parse(activeUser) : null;
};

//Light mode button and dark mode button html elements
const lightModeButton = document.querySelector(".lightmode-button");
const darkModeButton = document.querySelector(".darkmode-button");
const body = document.body;

// Check and apply the user's theme preference from localStorage
const currentTheme = localStorage.getItem("theme");
checkAndApplyTheme(currentTheme);

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
