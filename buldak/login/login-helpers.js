// Import local storage helpers
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "../src/local-storage-helpers";

/* work on logic for verifying password by hashing password input then retrieving hashed password 
   from local storage using username input as key and comparing our hashed password input to
   our hashed password in local storage */

import { hashPassword } from "../register/crypto-helpers";

export const verifyLogin = async (formData) => {
  // store each piece of data from the form in separate variables.
  let username, password, login;

  formData.forEach((value, key) => {
    if (key === "username") {
      username = value;
    } else if (key === "password") {
      password = value;
    } else if (key === login) {
      login = value;
    }
  });

  // Check if the user exists in localStorage
  const userData = localStorage.getItem("users");

  // check if user already exists in local storage, if not then alert user "unregister user"
  if (userData) {
    try {
      // Parse the user data from localStorage (assuming it's stored as a stringified object)
      const user = JSON.parse(userData);
      console.log(user[username].password);

      // hash password input entered to login form by an user
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);

      // compared the password we just hashed to the hashed password already stored in local storage
      if (user[username].password === hashedPassword) {
        // set loginState equal to true. (this is how we know if an user is logged in or not)
        user[username].login = true;
        setLocalStorageKey("users", user);
        window.location.href = "../index.html";

        return {
          username: user[username].username,
          password: user[username].password,
          login: user[username].login,
          savedAnime: user[username].savedAnime,
        };
      } else {
        // Password mismatch
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error hashing password: ", error);
      alert("There was an error during login. Please try again.");
    }
  } else {
    alert(
      "The username you entered is not linked to an existing Buldack account."
    );
  }
};
