let apiKey = "58c65b45200489f4758f3b0b15067322";

document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons() {
  document.getElementById("submit").addEventListener("click", function(event) {

    let request = new XMLHttpRequest();
    let data = {city:null, country:null};
    data.city = document.getElementById("city").value;
    data.country = document.getElementById("country").value;

    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + data.city + "," + data.country + "&APPID=" + apiKey, false);
    request.addEventListener("load", function(){
      if (request.status >= 200 && request.status < 400){

        /* clear out added elements before new query */
        let cl = document.getElementById("clouds");
        let rn = document.getElementById("rain");
        let sn = document.getElementById("snow");
        if (cl) {
          spot = document.getElementById("results");          spot.removeChild(spot.lastChild);
        }

        if (rn) {
            spot = document.getElementById("results");          spot.removeChild(spot.lastChild);
        }

        if (sn) {
          spot = document.getElementById("results");          spot.removeChild(spot.lastChild);
        }


        /* get data from weather API */
        let response = JSON.parse(request.responseText);
        console.log(response);
        document.getElementById("cityName").textContent = response.name;
        document.getElementById("temp").textContent = Math.floor(response.main.temp - 273.15) + " C";
        document.getElementById("wind").textContent = Math.floor(response.wind.speed * 2.23694) + " miles/hour";
        document.getElementById("humidity").textContent = response.main.humidity + "%";

        let results = document.getElementById("results");


        /* if there's any clouds, rain, and or snow, add to page */
        clouds = document.createElement("li");
        clouds.id = "clouds"
        clouds.textContent = "Cloudy";

        rain = document.createElement("li");
        rain.textContent = "Raining";
        rain.id = "rain";

        snow = document.createElement("li");
        snow.textContent = "Snowing";
        snow.id = "snow";

        if (response.clouds.all > 50) {
          results.appendChild(clouds);
        }

        if (response.rain != null) {
          results.appendChild(rain);
        }

        if (response.snow != null) {
          results.appendChild(snow);
        }

      } else {
        console.log("Error in network request: " + request.statusText);
      }
    });
    request.send(JSON.stringify(data));
    event.preventDefault();
  })
}