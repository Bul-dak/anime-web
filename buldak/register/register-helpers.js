// Import local storage helpers from src
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "../src/local-storage-helpers";

// Import crypto-helpers
import { hashPassword } from "./crypto-helpers";

/* Create a function that takes newUser formData from register-form and verifies that password field
   matches confirm password field, if they match then proceed to hashing the password using bcrypt
   helpers, once password is hashed store it in a map using the username input as the key, and then 
   to finalize this process stringify this map and store it in local storage using username as the 
   key again. */
export const registerNewUser = async (formData) => {
  // store each piece of data from the form in separate variables.
  let username, password, confirmPassword;

  formData.forEach((value, key) => {
    if (key === "username") {
      username = value;
    } else if (key === "password") {
      password = value;
    } else if (key === "confirm-password") {
      confirmPassword = value;
    }
  });

  // Confirm if password and confirmPassword are a match
  if (password === confirmPassword) {
    try {
      // Hash the user password (assuming hashPassword is async)
      const hashedUserPassword = await hashPassword(password);

      // Store new user login info in an object (Map can't be used directly in localStorage)
      const newUserObject = {
        username: username,
        password: hashedUserPassword,
        savedAnime: [],
        login: false,
      };
      // Retrieve existing users from localStorage
      const users = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : {};

      // Add new user to the users object
      users[username] = newUserObject;

      // Store the updated users object in localStorage
      setLocalStorageKey("users", users);

      alert("Registration successful!");
      // redirect user to log-in page
      window.location.href = "../login/login.html";
    } catch (error) {
      console.error("Error hashing password: ", error);
      alert("There was an error during registration. Please try again.");
    }
  } else {
    alert("Ensure that the password fields match.");
  }
};
