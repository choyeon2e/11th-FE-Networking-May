import styled from 'styled-components';
import { useState } from 'react';
import WithWeather from '../component/weather/WithWeather';
import NoWeather from '../component/weather/NoWeather';

function Weather() {
  const [isWeather, setIsWeather] = useState(false);
  return <Wrapper>{isWeather ? <WithWeather /> : <NoWeather />}</Wrapper>;
}

export default Weather;

const Wrapper = styled.div`
  margin-left: 248px;
`;
