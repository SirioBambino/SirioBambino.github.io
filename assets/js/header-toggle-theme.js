// Get current theme from local storage if it exists or set to null
let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

// Get element for each button type
const lightButton = document.querySelector(".light-theme-button");
const darkButton = document.querySelector(".dark-theme-button");

// If the current theme is null use browser settings
if (!currentTheme) {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    currentTheme = "dark";
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    currentTheme = "light";
  } else {
    currentTheme = "dark";
  }
}

// Set the theme to current theme
document.documentElement.setAttribute("data-theme", currentTheme);

// Toggle the display of buttons to match the current theme
if (currentTheme === "dark") {
  lightButton.style.display = "block";
  darkButton.style.display = "none";
} else {
  lightButton.style.display = "none";
  darkButton.style.display = "block";
}

function toggleTheme() {
  // Get current theme
  let currentTheme = document.documentElement.getAttribute("data-theme");

  // Toggle the display of buttons and change local storage and data attributes to match the current theme
  if (currentTheme === "dark") {
    lightButton.style.display = "none";
    darkButton.style.display = "block";
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    lightButton.style.display = "block";
    darkButton.style.display = "none";
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}
