// Get element for heading
const dynamicText = document.querySelector("h1 span");

// List of words to be written
const words = [
  "code.",
  "design.",
  "problem-solve.",
  "create.",
  "develop.",
  "innovate.",
  "collaborate.",
];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  // Variables to store the current word and current substring
  const currentWord = words[wordIndex];
  const currentSubstring = currentWord.substring(0, characterIndex);

  // Change content of heading
  dynamicText.textContent = currentSubstring;

  // Stop text cursor from blinking when typing word
  dynamicText.classList.add("stop-blinking");

  // If condition is true, type the next character
  if (!isDeleting && characterIndex < currentWord.length) {
    characterIndex++;
    setTimeout(typeEffect, 115);
    // If condition is true, remove the previous character
  } else if (isDeleting && characterIndex > 0) {
    characterIndex--;
    setTimeout(typeEffect, 75);
    // If word is deleted then switch to the next word
  } else {
    isDeleting = !isDeleting;
    dynamicText.classList.remove("stop-blinking");
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1000);
  }
};

typeEffect();
