import { openWeatherApi, BaseUrlApi } from './axios';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = async (lat, lon) => {
  const weatherParams = {
    lat,
    lon,
    exclude: 'minutely,alerts',
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  };

  const airParams = {
    lat,
    lon,
    appid: API_KEY,
  };

  const weekParams = {
    lat,
    lon,
  };

  const [weatherRes, airRes, weekRes] = await Promise.all([
    openWeatherApi.get('/data/3.0/onecall', { params: weatherParams }),
    openWeatherApi.get('/data/2.5/air_pollution', { params: airParams }),
    BaseUrlApi.get('/weather/5days', { params: weekParams }),
  ]);

  return {
    current: weatherRes.data.current,
    hourly: weatherRes.data.hourly,
    air: airRes.data,
    weekly: weekRes.data,
  };
};
