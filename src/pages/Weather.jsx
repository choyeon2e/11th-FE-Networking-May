import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CurrentWeather from '../component/weather/CurrentWeather';
import HourlyWeather from '../component/weather/HourlyWeather';
import WeekWeather from '../component/weather/WeekWeather';
import {
  weatherCurrent,
  weatherDaily,
  weatherHourly,
  airData,
} from '../apis/weatherMock';

function Weather({ checkedLocationId, locations }) {
  const location = locations.find((loc) => loc.id === checkedLocationId);
  // const [weatherCurrent, setWeatherCurrent] = useState(null);
  // const [weatherHourly, setWeatherHourly] = useState([]);
  // const [weatherDaily, setWeatherDaily] = useState([]);
  // const [airData, setAirData] = useState([]);

  // useEffect(() => {
  //   if (!location) return;

  //   const fetchWeather = async () => {
  //     const lat = location.y;
  //     const lon = location.x;
  //     const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  //     const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=kr`;

  //     try {
  //       const res = await axios.get(weatherURL);
  //       setWeatherCurrent(res.data.current);
  //       setWeatherHourly(res.data.hourly);
  //       setWeatherDaily(res.data.daily);
  //     } catch (err) {
  //       console.error(err);
  //       alert('날씨 데이터를 가져오는데 실패했습니다.');
  //     }
  //   };
  //   fetchWeather();
  // }, [location]);

  // useEffect(() => {
  //   if (!location) return;

  //   const fetchWeather = async () => {
  //     const lat = location.y;
  //     const lon = location.x;
  //     const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  //     const airURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  //     try {
  //       const res = await axios.get(airURL);
  //       setAirData(res.data);
  //     } catch (err) {
  //       console.error(err);
  //       alert('공기 데이터를 가져오는데 실패했습니다.');
  //     }
  //   };
  //   fetchWeather();
  // }, [location]);

  return (
    <Wrapper>
      <CurrentWeather
        location={location}
        weatherData={weatherCurrent}
        airData={airData}
      />
      <HourlyWeather weatherData={weatherHourly} />
      <WeekWeather weatherData={weatherDaily} />
    </Wrapper>
  );
}

export default Weather;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
