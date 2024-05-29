// This function enables the submit button only when all input fields are filled
function enableSubmit() {
  // Get input fields and button elements
  let inputs = document.querySelectorAll(".form-wrapper input, .form-wrapper textarea");
  let button = document.querySelector('button[type="submit"]');
  let isValid = true;

  // Iterate through all the input fields and check if they're empty
  for (let i = 0; i < inputs.length; i++) {
    let changedInput = inputs[i];
    if (changedInput.value.trim() === "" || changedInput.value === null) {
      isValid = false;
      break;
    }
  }

  // Enable the button only if all input fields are filled
  button.disabled = !isValid;
}

// This function removes the html form validation bubbles and replaces them
// with messages under input fields
function replaceValidationUI(form) {
  // Suppress the default bubbles
  form.addEventListener(
    "invalid",
    function (event) {
      event.preventDefault();
    },
    true,
  );

  // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
  // form submissions by default
  form.addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });

  var submitButton = form.querySelector("button:not([type=button]), input[type=submit]");
  submitButton.addEventListener("click", function (event) {
    var invalidFields = form.querySelectorAll(":invalid"),
      errorMessages = form.querySelectorAll(".error-message"),
      parent;

    // Remove any existing messages
    for (var i = 0; i < errorMessages.length; i++) {
      errorMessages[i].parentNode.removeChild(errorMessages[i]);
    }

    for (var i = 0; i < invalidFields.length; i++) {
      parent = invalidFields[i].parentNode;
      parent.insertAdjacentHTML(
        "beforeend",
        "<div class='error-message'>" + invalidFields[i].validationMessage + "</div>",
      );
    }

    // If there are errors, give focus to the first invalid field
    if (invalidFields.length > 0) {
      invalidFields[0].focus();
    }
  });
}

// Replace the validation UI for all forms
var forms = document.querySelectorAll("form");
for (var i = 0; i < forms.length; i++) {
  replaceValidationUI(forms[i]);
}

// Handle form submission
const form = document.getElementById("form");
const result = document.getElementById("result");
const subject = document.getElementById("form-subject");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Get data from form
  const formData = new FormData(form);

  // Change subject to include the sender's name
  let object = Object.fromEntries(formData);
  object.subject = object.name + " has sent a message";

  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  // Send form to Web3Forms
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    // Show response
    .then(async response => {
      let json = await response.json();
      if (response.status == 200) {
        result.style.color = "var(--text-colour)";
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    // Show any error
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    // Reset form
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "";
      }, 3000);
    });
});
