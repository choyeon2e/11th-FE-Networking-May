import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = async (lat, lon) => {
  const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=kr`;
  const airURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const [weatherRes, airRes] = await Promise.all([
    axios.get(weatherURL),
    axios.get(airURL),
  ]);

  return {
    current: weatherRes.data.current,
    hourly: weatherRes.data.hourly,
    daily: weatherRes.data.daily,
    air: airRes.data,
  };
};
