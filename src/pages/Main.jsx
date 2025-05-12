import styled from 'styled-components';
import Location from '../component/location/Location';
import NoLocation from '../component/location/NoLocation';
import Weather from '../component/weather/Weather';
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
      {checkedLocationId ? (
        <Weather locations={locations} checkedLocationId={checkedLocationId} />
      ) : (
        <NoLocation />
      )}
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
`;
