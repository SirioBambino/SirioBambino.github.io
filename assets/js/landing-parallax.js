// Get elements to give parallax effect to
const parallaxElements = document.getElementsByClassName("parallax");

// This function translates the elements in the direction of the scroll to give a parallax effect
function runOnScroll() {
  for (let i = 0; i < parallaxElements.length; i++) {
    parallaxElements.item(i).style.transform = "translateY(+" + window.scrollY * 0.5 + "px)";
  }
}

// Using throttle on the scroll event listener will make it run every 10 ms
window.addEventListener("scroll", throttle(runOnScroll, 10));
