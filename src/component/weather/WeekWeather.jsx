import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { iconMapper } from '../../utils/iconMapper';

//요일 계산
const calcDay = (dateStr, index) => {
  if (index === 0) return '오늘';

  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};

//날짜 포맷팅
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`;
};

function WeekWeather({ weatherData }) {
  const fiveDaysData = weatherData.slice(0, 5).map((day) => {
    if (day.pm.weather === '정보 없음') {
      return {
        ...day,
        pm: {
          ...day.am,
        },
      };
    }
    return day;
  });
  return (
    <Wrapper>
      <LocText>주간 예보</LocText>
      <WeekDiv>
        {fiveDaysData.map((day, index) => (
          <DayDiv key={index}>
            <TimeRow>
              <TimeDiv time='day'>
                {iconMapper(day.am.weather, 60, { period: 'am' })}
                <PopDiv>{day.am.pop.toFixed(0)}%</PopDiv>
                <div style={{ color: palette.gray60 }}>오전</div>
                {day.am.avgTemp.toFixed(0)}°
              </TimeDiv>
              <TimeDiv time='night'>
                {iconMapper(day.pm.weather, 60, { period: 'pm' })}
                <PopDiv>{day.pm.pop.toFixed(0)}%</PopDiv>
                <div style={{ color: palette.gray60 }}>오후</div>
                {day.pm.avgTemp.toFixed(0)}°
              </TimeDiv>
            </TimeRow>
            <DateDiv>
              <div>{calcDay(day.date, index)}</div>
              {formatDate(day.date)}
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
