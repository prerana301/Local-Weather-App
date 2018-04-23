const x = document.getElementById("location");
const temp = document.getElementById("temp");
const cond = document.getElementById("conditions");
const icon = document.getElementById("icon");

function getUserInfo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showLocation(position) {
  const latlon = position.coords.latitude + "," + position.coords.longitude;
  const apiGoogleLocation =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latlon +
    "&key=AIzaSyCRi6Tt0-K9j0cORmFAznRJvUcBkPU4EwY";
  const apiDarkSky =
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d4db648610e69526608372c8eef56406/" +
    latlon;

  getLocationAPI(apiGoogleLocation);
  getWeatherAPI(apiDarkSky);
}

function getLocationAPI(apiGoogleLocation) {
  fetch(apiGoogleLocation, {
    method: "GET"
  }).then(function(response) {
    response.json().then(function(data) {
      const userCity = data.results[0].address_components[2].long_name;
      const userState = data.results[0].address_components[5].long_name;
      x.innerHTML = userCity + ", " + userState;
    });
  });
}

function getWeatherAPI(apiDarkSky) {
  fetch(apiDarkSky, {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      temp.innerHTML = Math.round(data.currently.temperature);
      cond.innerHTML = data.currently.summary;
      weatherIcon(data.currently.icon);
    });
}

function weatherIcon(weatherType) {
  const skycon = new Skycons({
    color: "#324D5C"
  });

  switch (weatherType) {
    case "clear-day":
      skycon.add("icon", Skycons.CLEAR_DAY);
      break;
    case "clear-night":
      skycon.add("icon", Skycons.CLEAR_NIGHT);
      break;
    case "partly-cloudy-day":
      skycon.add("icon", Skycons.PARTLY_CLOUDY_DAY);
      break;
    case "partly-cloudy-night":
      skycon.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
      break;
    case "cloudy":
      skycon.add("icon", Skycons.CLOUDY);
      break;
    case "rain":
      skycon.add("icon", Skycons.RAIN);
      break;
    case "sleet":
      skycon.add("icon", Skycons.SLEET);
      break;
    case "snow":
      skycon.add("icon", Skycons.SNOW);
      break;
    case "wind":
      skycon.add("icon", Skycons.WIND);
      break;
    case "fog":
      skycon.add("icon", Skycons.FOG);
      break;
  }
  skycon.play();
}

const toggleTempButton = document.getElementById("toggleTempButton");

toggleTempButton.addEventListener("click", function() {
  if (this.innerHTML === "°F") {
    this.innerHTML = "°C";
    temp.innerHTML = Math.round((temp.innerHTML - 32) / 1.8);
  } else {
    this.innerHTML = "°F";
    temp.innerHTML = Math.round(temp.innerHTML * 1.8 + 32);
  }
});

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const randomColor = getRandomColor();

const body = document.querySelector("body");
body.style.background = randomColor;

getUserInfo();