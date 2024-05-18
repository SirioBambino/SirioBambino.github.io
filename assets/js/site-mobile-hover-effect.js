// To simulate hover behaviour on touch screen devices, touchstart
// and touchend event listeners are used to detect when the user
// is pressing on the touchscreen. The hover effect is applied only
// while the user is pressing down, by adding a class on touchstart
// and removing it on touchend.

// Get an array of elements that have hover effects
const hoverElements = document.querySelectorAll(".hover-effect");

// Add touchstart and touchend event listeners to each element
hoverElements.forEach(element => {
  // Add touchstart event listener
  element.addEventListener("touchstart", () => {
    element.classList.add("touch-hover-effect");
  });

  // Remove touch effect
  element.addEventListener("touchend", () => {
    element.classList.remove("touch-hover-effect");
  });
});
