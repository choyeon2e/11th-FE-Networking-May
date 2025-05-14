import styled from 'styled-components';
import Location from '../component/location/Location';
import NoLocation from '../component/location/NoLocation';
import Weather from './Weather';
import { useState } from 'react';

function Main() {
  const [locations, setLocations] = useState([]);
  const [checkedLocationId, setCheckedLocationId] = useState(null);
  return (
    <Wrapper>
      <Location
        locations={locations}
        setLocations={setLocations}
        checkedLocationId={checkedLocationId}
        setCheckedLocationId={setCheckedLocationId}
      />
      <Content>
        {checkedLocationId ? (
          <Weather
            locations={locations}
            checkedLocationId={checkedLocationId}
          />
        ) : (
          <NoLocation />
        )}
      </Content>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
