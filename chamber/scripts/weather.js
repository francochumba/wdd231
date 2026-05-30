const apiKey = "fd1f3f673ac6d6977bd3485ea7dc3562";
const lat = -34.170132;
const lon = -70.740623;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

function capitalizeWords(text) {
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector("#current-temp");
    const weatherDesc = document.querySelector("#weather-desc");

    const description = capitalizeWords(data.weather[0].description);
    const iconCode = data.weather[0].icon;
    const temperature = data.main.temp.toFixed(0);
    const feelsLike = data.main.feels_like.toFixed(0);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed.toFixed(1);

    currentTemp.classList.add("weather-main");

    currentTemp.innerHTML = `
        <img src="${getWeatherIcon(iconCode)}" alt="${description}" class="weather-icon">
        <span class="weather-temp">${temperature}°C</span>
    `;

    weatherDesc.classList.add("weather-details");

    weatherDesc.innerHTML = `
        <span><strong>Condition:</strong> ${description}</span>
        <span><strong>Feels Like:</strong> ${feelsLike}°C</span>
        <span><strong>Humidity:</strong> ${humidity}%</span>
        <span><strong>Wind:</strong> ${windSpeed} m/s</span>
    `;
}

function displayForecast(data) {
    const forecastList = document.querySelector("#forecast");

    const dailyForecasts = data.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    forecastList.innerHTML = "";

    dailyForecasts.forEach((day) => {
        const listItem = document.createElement("li");
        const date = new Date(day.dt_txt);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const iconCode = day.weather[0].icon;
        const description = capitalizeWords(day.weather[0].description);
        const temp = day.main.temp.toFixed(0);

        listItem.classList.add("forecast-item");

        listItem.innerHTML = `
            <span class="forecast-day">${weekday}</span>
            <img src="${getWeatherIcon(iconCode)}" alt="${description}" class="forecast-icon">
            <span class="forecast-temp">${temp}°C</span>
        `;

        forecastList.appendChild(listItem);
    });
}

export async function displayWeather() {
    const currentTemp = document.querySelector("#current-temp");
    const weatherDesc = document.querySelector("#weather-desc");
    const forecastList = document.querySelector("#forecast");

    if (!currentTemp || !weatherDesc || !forecastList) {
        return;
    }

    try {
        const currentResponse = await fetch(currentWeatherUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        currentTemp.textContent = "Weather data is currently unavailable.";
        weatherDesc.textContent = "";
        forecastList.innerHTML = "";
        console.error(error);
    }
}