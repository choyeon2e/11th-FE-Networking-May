import styled from 'styled-components';
import { iconMapper } from '../../utils/iconMapper';
import { palette } from '../../styles/palette';
import getWindDirection from '../../utils/getWindDirection';
import getDustLevel from '../../utils/getDustLevel';
import getUVLevel from '../../utils/getUVLevel';
import { useState } from 'react';
import AirDetail from './details/AirDetail';
import { descMapper } from '../../utils/descMapper';

function CurrentWeather({ location, weatherData, airData }) {
  const [isHover, setIsHover] = useState(null);
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (!weatherData) return <p>날씨 불러오는 중...</p>;

  //날씨 데이터 추출
  const temp = weatherData.temp.toFixed(1);
  const feelTemp = weatherData.feels_like.toFixed(1);
  const humidity = weatherData.humidity;
  const windSpeed = weatherData.wind_speed.toFixed(1);
  const windDirection = getWindDirection(weatherData.wind_deg);

  //공기 데이터 추출
  const uvInfo = weatherData.uvi;
  const fine = airData.list[0].components.pm10;
  const ultraFine = airData.list[0].components.pm2_5;
  const sunrise = new Date(weatherData.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const fineLevel = getDustLevel(fine, 'pm10');
  const ultraFineLevel = getDustLevel(ultraFine, 'pm2_5');
  const uvLevel = getUVLevel(uvInfo);

  //아이콘
  const isNight = weatherData.weather[0].icon.includes('n');
  const icon = iconMapper(weatherData.weather[0], 160, { isNight });
  const desc = descMapper(weatherData.weather[0].main);
  const isDay =
    weatherData.weather[0].icon && weatherData.weather[0].icon.includes('n')
      ? '야간'
      : '낮';

  return (
    <Wrapper>
      <LocText>
        {month}월 {day}일 {location.place_name} 날씨 현황
      </LocText>
      <WeatherWrap>
        <WeatherDiv>
          {icon}
          {temp}°
        </WeatherDiv>
        <Desc>
          {isDay} / {desc}
        </Desc>
        <DetailInfo>
          <Title>체감</Title>
          {feelTemp}°<Divide>●</Divide>
          <Title>습도</Title>
          {humidity}%<Divide>●</Divide>
          <Title>{windDirection}</Title>
          {windSpeed}m/s
        </DetailInfo>
      </WeatherWrap>
      <AirDetail
        fine={fine}
        fineLevel={fineLevel}
        ultraFine={ultraFine}
        ultraFineLevel={ultraFineLevel}
        uvInfo={uvInfo}
        uvLevel={uvLevel}
        sunrise={sunrise}
        isHover={isHover}
        setIsHover={setIsHover}
      />
    </Wrapper>
  );
}

export default CurrentWeather;

const Wrapper = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  gap: 12px;
  border: 2px solid ${palette.gray10};
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
`;

const LocText = styled.div`
  color: ${palette.gray100};
  font-size: 20px;
  font-weight: 700;
`;

const WeatherWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const WeatherDiv = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 80px;
  align-items: center;
  gap: 10px;
  color: ${palette.gray60};
`;

const Desc = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: ${palette.gray60};
`;

const DetailInfo = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  gap: 4px;
`;

const Divide = styled.div`
  font-size: 8px;
  color: ${palette.gray40};
  margin: 4px;
`;

const Title = styled.div`
  color: ${palette.gray40};
`;
