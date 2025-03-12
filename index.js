var submitButton = document.querySelector("button");
var userInput = document.querySelector("input");
var apiKey = "1abc0289565385241e18d438704fb24f";
var weatherSection = document.getElementById("weather");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(userInput.value);
    weatherSection.innerHTML = "";
    var location = userInput.value;
    userInput.value = "";
    // console.log(userInput.value);
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
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
                skyPara.style.textTransform = "capitalize";
                skyPara.textContent = `${res.weather.description}`;
                weatherSection.appendChild(skyPara);

                var tempPara = document.createElement("p");
                tempPara.textContent = `Current: ${res.main.temp}`;
                weatherSection.appendChild(tempPara);

                var feelsLikePara = document.createElement("p");
                feelsLikePara.textContent = `Feels like: ${res.main.feels_like}`;
                weatherSection.appendChild(feelsLikePara);

                var lastUpdatedPara = document.createElement("p");
                var dt = res.dt * 1000;
                var date = new Date(dt);
                var timeString = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                });
                lastUpdatedPara.textContent = `Last updated: ${timeString}`;
                weatherSection.appendChild(lastUpdatedPara);
            }
            console.log(res);
        });
});
