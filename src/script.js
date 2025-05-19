let apiKey = "tc347f3bd3c7a100oc636b4fc92cd062";
// Days of the week in Swahili
const daysSwahili = [
    "Jumapili", "Jumatatu", "Jumanne", "Jumatano",
    "Alhamisi", "Ijumaa", "Jumamosi"
];

function getTemperatureEmoji(temp) {
  if (temp <= 10) {
    return "❄️"; // cold
  } else if (temp <= 20) {
    return "🌥️"; // cool
  } else if (temp <= 30) {
    return "🌤️"; // warm
  } else {
    return "🔥"; // hot
  }
}
// Simulate weather description (e.g., "mawingu" = cloudy)
// const weatherDescription = "mawingu";
function showTemperature(response) {
  let temperatureElement = document.querySelector(".temp");
  let humidityElement = document.querySelector(".nyevu");
  let windElement = document.querySelector(".upepo");
  
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let emoji = getTemperatureEmoji(temperature);

  // Update the emoji (overwrite previous emoji)
  document.querySelector(".emoji").innerHTML = `${emoji}`;

  // Update temperature, humidity, and wind info
  temperatureElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
}

  
  
// Function to update the paragraph
function updateTime() {
    const now = new Date();

    // Get Swahili day
    const day = daysSwahili[now.getDay()];

    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formatted = `${day}, ${hours}:${minutes}`;
    document.getElementById("time").textContent = formatted;
}

// Call the function once
updateTime();

// Optional: refresh every minute
setInterval(updateTime, 60000);

function search(event) {
    event.preventDefault();
  
    let searchInputElement = document.querySelector("#jiji");
    let cityElement = document.querySelector("#city-name");
    let city = searchInputElement.value.trim();
    cityElement.innerHTML = city;
  
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiURL).then(showTemperature).catch(error => {
      console.error("Weather fetch error:", error);
      cityElement.innerHTML = "City not found!";
    });

    searchInputElement.value = "";
  }
  
  // Add event listener to form
  let searchForm = document.querySelector("#form");
  searchForm.addEventListener("submit", search);

  // Load Nairobi weather by default on page load
function loadDefaultCity() {
  let defaultCity = "Nairobi";
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = defaultCity;

  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature).catch(error => {
    console.error("Default city weather fetch error:", error);
  });
}

// Call it on page load
loadDefaultCity();


 
  

