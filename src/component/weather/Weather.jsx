import styled from 'styled-components';
import NoWeather from './NoWeather';
import WithWeather from './WithWeather';
import { useState } from 'react';

function Weather() {
  const [isWeather, setIsWeather] = useState(true);
  return <Wrapper>{isWeather ? <WithWeather /> : <NoWeather />}</Wrapper>;
}

export default Weather;

const Wrapper = styled.div`
  margin-left: 248px;
`;
