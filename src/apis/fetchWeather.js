import { openWeatherApi, BaseUrlApi } from './axios';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = async (lat, lon) => {
  const weatherURL = `/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=kr`;
  const airURL = `/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const weekURL = `/weather/5days?lat=${lat}&lon=${lon}`;

  const [weatherRes, airRes, weekRes] = await Promise.all([
    openWeatherApi.get(weatherURL),
    openWeatherApi.get(airURL),
    BaseUrlApi.get(weekURL),
  ]);

  return {
    current: weatherRes.data.current,
    hourly: weatherRes.data.hourly,
    air: airRes.data,
    weekly: weekRes.data,
  };
};
