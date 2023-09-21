const form = document.getElementById("form");
const result = document.getElementById("result");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  message.innerHTML = "<p>Sending your message...</p>";
  document.getElementById("submit").style.display = "none";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "<h3>Message Sent!</h3><p>We'll be in touch.</p>";
        form.style.display = "none";
        message.style.display = "none";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })

    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })

    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        message.style.display = "none";
        form.style.display = "block";
        document.getElementById("submit").style.display = "block";
      }, 8000);
    });
});
