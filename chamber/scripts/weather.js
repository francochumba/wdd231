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

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector("#current-temp");
    const weatherDesc = document.querySelector("#weather-desc");

    currentTemp.textContent = `Temperature: ${data.main.temp.toFixed(0)}°C`;
    weatherDesc.textContent = `Condition: ${capitalizeWords(data.weather[0].description)}`;
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
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

        listItem.textContent = `${weekday}: ${day.main.temp.toFixed(0)}°C`;
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