import styled from 'styled-components';
import Location from '../component/location/Location';
import Weather from './Weather';

function Main() {
  return (
    <Wrapper>
      <Location />
      <Weather />
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
`;
