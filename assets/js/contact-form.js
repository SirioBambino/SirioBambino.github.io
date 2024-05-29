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
