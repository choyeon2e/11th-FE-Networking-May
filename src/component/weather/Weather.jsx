import axios from 'axios';
import { useEffect, useState } from 'react';
import TempWeather from './details/TempWeather';
import styled from 'styled-components';
import {
  weatherCurrent,
  weatherDaily,
  weatherHourly,
} from '../../apis/weatherMock';
import HourlyWeather from './details/HourlyWeather';

function Weather({ checkedLocationId, locations }) {
  const location = locations.find((loc) => loc.id === checkedLocationId);
  // const [weatherCurrent, setWeatherCurrent] = useState(null);
  // const [weatherHourly, setWeatherHourly] = useState([]);
  // const [weatherDaily, setWeatherDaily] = useState([]);

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
  console.log(weatherCurrent);
  console.log(weatherHourly);
  console.log(weatherDaily);

  return (
    <Wrapper>
      <TempWeather location={location} weatherData={weatherCurrent} />
      <HourlyWeather weatherData={weatherHourly} />
    </Wrapper>
  );
}

export default Weather;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 248px;
  gap: 24px;
`;
