var submitButton = document.querySelector("button");
var userInput = document.querySelector("input");
var apiKey = "1abc0289565385241e18d438704fb24f";
var weatherSection = document.getElementById("weather");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    weatherSection.innerHTML = "";
    var location = userInput.value;
    userInput.value = "";
    // console.log(userInput.value);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    )
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            if (res.cod == "404" || "400") {
                console.log("not found");
                var notFoundHeading = document.createElement("h2");
                notFoundHeading.textContent = "Location Not Found";
                weatherSection.append(notFoundHeading);
            } else {
                console.log("found");
                var cityCountry = document.createElement("h2");
                console.log(res.sys.country);
                cityCountry.textContent = `${res.name}, ${res.sys.country}`;
                weatherSection.append(cityCountry);
            }
            console.log(res);
        });
});
