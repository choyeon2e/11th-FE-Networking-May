import { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { iconMapper } from '../../utils/iconMapper';
import { ChevronLeft } from '../../assets/icon/ChevronLeft';
import { ChevronRight } from '../../assets/icon/ChevronRight';

function HourlyWeather({ weatherData }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;
  const totalPages = weatherData
    ? Math.ceil(weatherData.length / itemsPerPage)
    : 0;

  const getHour = (t) => {
    const date = new Date(t * 1000);
    return date.getHours();
  };

  const currentData = weatherData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <Wrapper>
      <LocText>시간별 현황</LocText>
      {page > 0 && (
        <NavButton onClick={handlePrev} position='left'>
          <ChevronLeft />
        </NavButton>
      )}
      <RowContainer>
        <WeatherRow>
          {currentData.map((data, index) => (
            <WeatherItem key={index}>
              {iconMapper(data.weather[0], 40)}
              <Time>{getHour(data.dt)}시</Time>
              <Temp>{Math.round(data.temp)}°</Temp>
            </WeatherItem>
          ))}
        </WeatherRow>
      </RowContainer>
      {page < totalPages - 1 && (
        <NavButton onClick={handleNext} position='right'>
          <ChevronRight />
        </NavButton>
      )}
    </Wrapper>
  );
}

export default HourlyWeather;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 24px;
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
  margin-bottom: 24px;
`;

const RowContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const WeatherRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
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
  position: absolute;
  top: 50%;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px;
  cursor: pointer;

  ${(props) =>
    props.position === 'left' &&
    `
    left: 0;
  `}
  ${(props) =>
    props.position === 'right' &&
    `
    right: 0;
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
