# Weather Forecast Application

## Project Overview
This project involves creating a web page that includes HTML, CSS, and JavaScript elements (in separate files) to implement a weather forecast application using the AJAX technique.

## Features

### I. Current Weather:
1. **"Current Weather" Section**: Create a `div` to display the following information:
   - Weather Description
   - Humidity
   - Pressure
   - Current Temperature
   - Today's Minimum Temperature
   - Today's Maximum Temperature
   - General Weather Forecast
2. **Weather Icon**: Display an image that represents a graphical illustration of the weather description.
3. **Optional**: Embed a Google Map of the city (explore the Google Maps API for implementation).

### II. Weather Forecast:
1. **"Weather Forecast" Section**: Create a `div` to display the following forecast details:
   - Time
   - Temperature
   - Weather Description
2. **6-Day Forecast**: Display the weather forecast for the next 6 days, with predictions made every 3 hours.
3. **Weather Icons**: For each forecast, display an image representing the predicted weather for each 3-hour interval.

## How to Use the Weather API
To retrieve the necessary weather data for each city, you can use the following URLs:

- const URL_CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=`

- const URL_FORECAST_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=`

- const URL_WEATHER_ICON_PREFIX = `http://openweathermap.org/img/w/` (Suffix `.png`)

To use the above API URLs successfully, append the name of the city you want to query at the end of each URL.

Hint: Use the following conventions for commit messages:

- `https://www.conventionalcommits.org/en/v1.0.0/`

The above requirements are represented in the gif below:
![weather-app](https://github.com/user-attachments/assets/d5c397f4-ef5a-4faf-85ec-1c84e412726c)
