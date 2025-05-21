import { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { iconMapper } from '../../utils/iconMapper';
import { ChevronLeft } from '../../assets/icon/ChevronLeft';
import { ChevronRight } from '../../assets/icon/ChevronRight';
import TempGraph from './../../utils/TempGraph';

function HourlyWeather({ weatherData }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;

  const getHour = (t) => {
    const date = new Date(t * 1000);
    return date.getHours();
  };

  const currentData = weatherData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <Wrapper>
      <LocText>시간별 현황</LocText>
      <GraphContainer>
        <TempGraph data={currentData} />
      </GraphContainer>
      <RowContainer>
        <NavButton onClick={() => setPage(0)} visible={page === 0}>
          <ChevronLeft />
        </NavButton>
        <WeatherRow>
          {currentData.map((data, index) => (
            <WeatherItem key={index}>
              {iconMapper(data.weather[0], 40)}
              <Time>{getHour(data.dt)}시</Time>
              <Temp>{Math.round(data.temp)}°</Temp>
            </WeatherItem>
          ))}
        </WeatherRow>
        <NavButton onClick={() => setPage(1)} visible={page === 1}>
          <ChevronRight />
        </NavButton>
      </RowContainer>
    </Wrapper>
  );
}

export default HourlyWeather;

const Wrapper = styled.div`
  display: flex;
  padding: 24px 16px;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  border: 2px solid ${palette.gray10};
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
`;

const LocText = styled.div`
  color: ${palette.gray100};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const WeatherRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 0px 12px 0px;
`;

const WeatherItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1 0 auto;
  min-width: 0;
`;

const NavButton = styled.div`
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.visible &&
    `
    visibility: hidden;
  `}
`;

const Time = styled.div`
  color: ${palette.gray40};
  font-size: 12px;
  font-weight: 400;
`;

const Temp = styled.div`
  color: ${palette.gray60};
  font-size: 12px;
  font-weight: 600;
`;
