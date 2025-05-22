import { BaseUrlApi } from './axios';

export const fetchWeather = async (lat, lon) => {
  const weatherParams = {
    lat,
    lon,
  };

  const [weatherRes, airRes, weekRes] = await Promise.all([
    BaseUrlApi.get('/weather/onecall', { params: weatherParams }),
    BaseUrlApi.get('/weather/air', { params: weatherParams }),
    BaseUrlApi.get('/weather/5days', { params: weatherParams }),
  ]);

  return {
    current: weatherRes.data.current,
    hourly: weatherRes.data.hourly,
    air: airRes.data,
    weekly: weekRes.data,
  };
};
