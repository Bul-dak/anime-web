import "./register.css";
import { registerNewUser } from "./register-helpers";

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
