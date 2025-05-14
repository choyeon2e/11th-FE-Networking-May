import styled from 'styled-components';
import { iconMapper } from '../../utils/iconMapper';
import { palette } from '../../styles/palette';
import getWindDirection from '../../utils/getWindDirection';
import getDustLevel from '../../utils/getDustLevel';
import { weatherStyles } from '../../utils/weatherStyles';
import getUVLevel from '../../utils/getUVLevel';
import { useState } from 'react';
import AirBox from './details/AirBox';
import AirDetail from './details/AirDetail';

function CurrentWeather({ location, weatherData, airData }) {
  const [isHover, setIsHover] = useState(null);
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const temp = weatherData.temp.toFixed(1);
  const feelTemp = weatherData.feels_like.toFixed(1);
  const humidity = weatherData.humidity;
  const windSpeed = weatherData.wind_speed.toFixed(1);
  const description = weatherData.weather[0].description;
  const windDirection = getWindDirection(weatherData.wind_deg);

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

  const icon = iconMapper(weatherData.weather[0], 160);

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
          {isDay} / {description}
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

const DetailWrap = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  font-size: 12px;
`;

const DetailBox = styled.div`
  display: flex;
  width: 120px;
  padding: 12px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor || palette.lime};
`;

const ForColor = styled.div`
  color: ${({ color }) => color || palette.yellow};
`;
