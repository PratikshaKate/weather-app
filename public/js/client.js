console.log("Hey, I am inside index.html");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const errormessage = document.querySelector("#errorMessage");
const forecastmessage = document.querySelector("#forecastMessage");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  errormessage.textContent = "Loading...";
  forecastmessage.textContent = "";

  fetch(`http://localhost:3000/weather-info?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (errormessage.textContent = data.error);
        }
        errormessage.textContent = data.address;
        forecastmessage.textContent = data.weather;
      });
    }
  );
});
