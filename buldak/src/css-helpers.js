const lightModeButton = document.querySelector(".lightmode-button");
const darkModeButton = document.querySelector(".darkmode-button");
const body = document.body;

// Toggle dark mode
export const darkmode = () => {
  darkModeButton.addEventListener("click", () => {
    body.classList.add("darkmode");
    body.classList.remove("lightmode");

    localStorage.setItem("theme", "dark");
  });
};

export const lightmode = () => {
  // Toggle light mode
  lightModeButton.addEventListener("click", () => {
    body.classList.add("lightmode");
    body.classList.remove("darkmode");

    localStorage.setItem("theme", "light");
  });
};
