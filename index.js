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
            if (res.cod == "404") {
                console.log("not found");
                var notFoundHeading = document.createElement("h2");
                notFoundHeading.textContent = "Location Not Found";
                weatherSection.append(notFoundHeading);
            } else {
                console.log("found");
                var cityCountry = document.createElement("h2");

                cityCountry.textContent = `${res.name}, ${res.sys.country}`;
                weatherSection.append(cityCountry);

                var googleMap = document.createElement("a");
                googleMap.href = `https://www.google.com/maps/search/?api=1&query=${res.coord.lat},${res.coord.lon}`;
                googleMap.target = "__BLANK";
                googleMap.textContent = "Click to view map";
                weatherSection.appendChild(googleMap);
                // console.log(googleMap);

                var image = document.createElement("img");
                image.src = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                weatherSection.appendChild(image);

                var skyPara = document.createElement("p");
                skyPara.style.text

                var tempPara = document.createElement("p");

                var feelsLikePara = document.createElement("p");

                var lastUpdatedPara = document.createElement("p");
            }
            console.log(res);
        });
});
