import { BaseUrlApi } from './axios';

export const fetchWeather = async (lat, lon) => {
  const weatherParams = {
    lat,
    lon,
  };

  const [weatherRes, airRes, weekRes] = await Promise.all(
    ['/weather/onecall', '/weather/air', '/weather/5days'].map((api) =>
      BaseUrlApi.get(api, { params: weatherParams })
    )
  );

  return {
    current: weatherRes.data.current,
    hourly: weatherRes.data.hourly,
    air: airRes.data,
    weekly: weekRes.data,
  };
};
