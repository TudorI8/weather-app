const cityInput = document.getElementById('city');
const showWeatherBtn = document.getElementById('show-weather');
const showForecastBtn = document.getElementById('show-forecast');
const weatherContainer = document.getElementById('weather-container');
const weatherNow = document.getElementById('weather-now');
const cityMap = document.getElementById('city-map');
const forecastContainer = document.getElementById('forecast-container');

let currentCity = '';

showWeatherBtn.addEventListener('click', showWeather);
cityInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		showWeather();
	}
});
showForecastBtn.addEventListener('click', showForecast);

const URL_CURRENT_WEATHER =
	'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
const URL_FORECAST_WEATHER =
  'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';

async function showWeather() {
    const city = cityInput.value.trim();
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    if (city !== currentCity) {
        weatherNow.innerHTML = '';
        cityMap.innerHTML = '';
        currentCity = city;
    }

    try {
        const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
        const weather = await response.json();

        if (weather.cod !== 200) {
            errorMessage.textContent = 'City not found.';
            return;
        }

        const iconCode = weather.weather[0].icon;
        const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        weatherNow.innerHTML = `
            <div>
                <img src=${iconImageUrl} />
                <p>Description: ${weather.weather[0].description}</p>
                <p>Humidity: ${weather.main.humidity} </p>
                <p>Pressure: ${weather.main.pressure} </p>
                <p>Current Temperature: ${weather.main.temp}</p>
                <p>Today's Maximum: ${weather.main.temp_max} </p>
                <p>Today's Minimum: ${weather.main.temp_min} </p>
            </div>
        `;

        const apiKey = 'AIzaSyDToSE-GJzh5FiTBxVlUqdtUBUSTjxSrVM';
        const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(city)}`;
        cityMap.innerHTML = `
            <iframe
                width="600"
                height="300"
                style="border:0; border-radius: 10px;"
                loading="lazy"
                allowfullscreen
                src="${mapSrc}">
            </iframe>`;
    } catch (error) {
        errorMessage.textContent = 'An error occurred while fetching the weather data. Please try again later.';
        console.error(error);
    }
}

async function showForecast() {
    const city = cityInput.value.trim();

    if (city !== currentCity) {
		weatherContainer.innerHTML = '';
		forecastContainer.innerHTML = '';
		currentCity = city;
	}

    const response = await fetch(`${URL_FORECAST_WEATHER}${city}`);
    const forecast = await response.json();
  
    const forecasts = forecast.list;
    const daysMap = {};
  
    forecasts.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayKey = date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'numeric' });
      
        if (!daysMap[dayKey]) {
            daysMap[dayKey] = [];
        }
      
        daysMap[dayKey].push(entry);
    });

    forecastContainer.innerHTML = '';

    const dayHeaders = Object.keys(daysMap);

    dayHeaders.forEach(day => {
        const dayForecasts = daysMap[day];

        const dayContainer = document.createElement('div');
        dayContainer.classList.add('forecast-day');

        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        dayContainer.appendChild(dayHeader);

        dayForecasts.forEach(entry => {
            const iconCode = entry.weather[0].icon;
            const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            const time = new Date(entry.dt * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <img src="${iconImageUrl}" alt="${entry.weather[0].description}" />
                <p>Time: ${time}</p>
                <p>Temperature: ${entry.main.temp} °C</p>
                <p>Description: ${entry.weather[0].description}</p>
            `;
            dayContainer.appendChild(forecastItem);
        });
        forecastContainer.appendChild(dayContainer);
    });
}