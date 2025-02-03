import "./register.css";
import { registerNewUser } from "./register-helpers";
import { checkAndApplyTheme } from "../src/dom-helpers";

// create an event listener that listens for the submit form event on #register-form
const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // store form data in a formData object
  const newUser = new FormData(registerForm);
  newUser.forEach((value, key) => {
    console.log(key, value);
  });

  // call registerNewUser function and pass it newUser as an arg
  registerNewUser(newUser);

  // reset form inputs
  registerForm.reset();
});

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
