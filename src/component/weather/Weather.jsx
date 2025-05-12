import axios from 'axios';
import { useEffect, useState } from 'react';
import TempWeather from './details/TempWeather';
import styled from 'styled-components';

function Weather({ checkedLocationId, locations }) {
  const location = locations.find((loc) => loc.id === checkedLocationId);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      const lat = location.y;
      const lon = location.x;
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

      try {
        const res = await axios.get(weatherURL);
        setWeatherData(res.data);
      } catch (err) {
        console.error(err);
        alert('날씨 데이터를 가져오는데 실패했습니다.');
      }
    };
    fetchWeather();
  }, [location]);

  return (
    <Wrapper>
      <TempWeather location={location} weatherData={weatherData} />
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
