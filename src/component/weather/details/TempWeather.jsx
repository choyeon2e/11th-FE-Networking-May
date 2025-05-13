import styled from 'styled-components';
import { iconMapper } from '../../../utils/iconMapper';
import { palette } from '../../../styles/palette';
import getWindDirection from '../../../utils/getWindDirection';
import { weatherStyles } from '../../../utils/weatherStyles';

function TempWeather({ location, weatherData }) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (!weatherData) return <p>날씨 불러오는 중...</p>;

  const temp = weatherData.main.temp.toFixed(1);
  const feelTemp = weatherData.main.feels_like.toFixed(1);
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed.toFixed(1);
  const description = weatherData.weather[0].description;
  const windDirection = getWindDirection(weatherData.wind.deg);
  const icon = iconMapper(weatherData.weather[0]);
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit', hour12: false }
  );
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
      <DetailWrap>
        {/* 미세먼지, 초미세먼지, 자외선 데이터 연결 필요 */}
        <DetailBox {...weatherStyles('좋음')}>
          미세먼지
          <ForColor color={weatherStyles('좋음').color}>좋음</ForColor>
        </DetailBox>
        <DetailBox {...weatherStyles('보통')}>
          초미세먼지
          <ForColor color={weatherStyles('보통').color}>보통</ForColor>
        </DetailBox>
        <DetailBox {...weatherStyles('나쁨')}>
          자외선 <ForColor color={weatherStyles('나쁨').color}>나쁨</ForColor>
        </DetailBox>
        <DetailBox>
          일출
          <ForColor>{sunrise}</ForColor>
        </DetailBox>
      </DetailWrap>
    </Wrapper>
  );
}

export default TempWeather;

const Wrapper = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  width: 1080px;
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
