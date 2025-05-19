import axios from 'axios';

export const BaseUrlApi = axios.create({
  baseURL: 'http://3.133.128.168:8080',
  headers: { 'Content-Type': 'application/json' },
});

export const openWeatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
  headers: { 'Content-Type': 'application/json' },
});
