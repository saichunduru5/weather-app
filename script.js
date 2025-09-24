const apiKey = "YOUR_API_KEY"; // 🔑 Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// Event Listener
searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Extract data
    const { name, main, weather, wind } = data;
    const temp = main.temp.toFixed(1);
    const description = weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    // Update UI
    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="${icon}" alt="Weather Icon">
      <p><strong>${temp}°C</strong></p>
      <p>${description}</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
}

