let apiKey = "tc347f3bd3c7a100oc636b4fc92cd062";
const daysSwahili = ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];

function updateTime() {
  const now = new Date();
  const day = daysSwahili[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.querySelector("#time").textContent = `${day}, ${hours}:${minutes}`;
}

function getEmoji(temp) {
  if (temp < 10) return "❄️";
  if (temp < 20) return "🌥️";
  if (temp < 30) return "🌤️";
  return "🔥";
}

function displayCurrentWeather(response) {
  const data = response.data;
  const temp = Math.round(data.temperature.current);
  const humidity = data.temperature.humidity;
  const wind = Math.round(data.wind.speed);
  const city = data.city;
  const emoji = getEmoji(temp);

  document.querySelector("#city-name").textContent = city;
  document.querySelector(".temp").textContent = `${temp}°C`;
  document.querySelector(".nyevu").textContent = `${humidity}%`;
  document.querySelector(".upepo").textContent = `${wind} km/h`;
  document.querySelector(".emoji").textContent = emoji;

  // Now fetch forecast
  getForecast(city);
}

function displayForecast(response) {
  const forecast = response.data.daily.slice(1, 6); // skip today, get next 5
  let forecastHTML = "";

  forecast.forEach(function (day) {
    const date = new Date(day.time * 1000);
    const icon = `<img src="${day.condition.icon_url}" alt="${day.condition.description}" width="42" />`;
    const dayName = daysSwahili[date.getDay()];
    const max = Math.round(day.temperature.maximum);
    const min = Math.round(day.temperature.minimum);

    forecastHTML += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <div class="weather-forecast-icon">${icon}</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${max}°C</strong></div>
          <div class="weather-forecast-temperature">${min}°C</div>
        </div>
      </div>`;
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForecast(city) {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast).catch(error => {
    console.error("Forecast error:", error);
  });
}

function search(event) {
  event.preventDefault();
  const city = document.querySelector("#jiji").value.trim();
  if (city.length === 0) return;

  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentWeather).catch(error => {
    console.error("Weather error:", error);
    document.querySelector("#city-name").textContent = "Haijapatikana!";
  });

  document.querySelector("#jiji").value = "";
}

// Initial load
document.querySelector("#form").addEventListener("submit", search);
updateTime();
setInterval(updateTime, 60000);

// Load default city
axios
  .get(`https://api.shecodes.io/weather/v1/current?query=Nairobi&key=${apiKey}&units=metric`)
  .then(displayCurrentWeather);
