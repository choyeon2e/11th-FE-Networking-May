import { useQuery } from '@tanstack/react-query';
import CurrentWeather from './../component/weather/CurrentWeather';
import HourlyWeather from './../component/weather/HourlyWeather';
import WeekWeather from './../component/weather/WeekWeather';
import styled from 'styled-components';
import { fetchWeather } from './../apis/fetchWeather';

function Weather({ checkedLocationId, locations }) {
  const location = locations.find((loc) => loc.id === checkedLocationId);
  const lat = location?.y;
  const lon = location?.x;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: !!lat && !!lon,
  });

  if (isLoading) return <LoadWeather>날씨 정보를 불러오는 중...</LoadWeather>;
  if (isError)
    return (
      <LoadWeather>
        날씨 정보를 불러오는데 실패했습니다: {error.message}
      </LoadWeather>
    );

  return (
    <Wrapper>
      <CurrentWeather
        location={location}
        weatherData={data.current}
        airData={data.air}
      />
      <HourlyWeather weatherData={data.hourly} />
      <WeekWeather weatherData={data.weekly} />
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
  margin-left: 248px;
`;

const LoadWeather = styled.div`
  position: absolute;
  margin-left: 248px;
  top: 0;
`;
