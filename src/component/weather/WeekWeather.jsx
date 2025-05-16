import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { iconMapper } from '../../utils/iconMapper';

//날짜 계산
const calcDate = (dt) => {
  const date = new Date(dt * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
};

//요일 계산
const calcDay = (dt, index) => {
  if (index === 0) return '오늘';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dt * 1000);
  return days[date.getDay()];
};

function WeekWeather({ weatherData }) {
  const fiveDaysData = weatherData.slice(0, 5);

  return (
    <Wrapper>
      <LocText>주간 예보</LocText>
      <WeekDiv>
        {fiveDaysData.map((day, index) => (
          <DayDiv key={index}>
            <TimeRow>
              <TimeDiv time='day'>
                {iconMapper(day.weather[0], 60)}
                <PopDiv>{(day.pop * 100).toFixed(0)}%</PopDiv>
                <div style={{ color: palette.gray60 }}>오전</div>
                {day.temp.day.toFixed(0)}°
              </TimeDiv>
              <TimeDiv time='night'>
                {iconMapper(
                  {
                    ...day.weather[0],
                    icon: day.weather[0].icon.replace('d', 'n'),
                  },
                  60
                )}
                <PopDiv>{(day.pop * 100).toFixed(0)}%</PopDiv>
                <div style={{ color: palette.gray60 }}>오후</div>
                {day.temp.night.toFixed(0)}°
              </TimeDiv>
            </TimeRow>
            <DateDiv>
              <div>{calcDay(day.dt, index)}</div>
              {calcDate(day.dt)}
            </DateDiv>
          </DayDiv>
        ))}
      </WeekDiv>
    </Wrapper>
  );
}

export default WeekWeather;

const Wrapper = styled.div`
  display: flex;
  padding: 24px;
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

const WeekDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
`;

const DayDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;
const TimeDiv = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${({ time }) =>
    time === 'day' ? `${palette.blue}` : `${palette.red}`};
  font-size: 16px;
  font-weight: 700;
`;

const PopDiv = styled.div`
  font-size: 20px;
  color: ${palette.skyblue};
`;

const DateDiv = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  gap: 8px;
`;
