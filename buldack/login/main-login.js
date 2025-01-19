import "./log-in.css";

// import local storage helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "../src/local-storage-helpers";

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

      // If login is successful, reset form and then store activeUser in local storage for persistance and for future rendering functions
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
