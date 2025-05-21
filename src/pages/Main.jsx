import styled from 'styled-components';
import Location from '../component/location/Location';
import NoLocation from '../component/location/NoLocation';
import Weather from './Weather';
import { useState, useEffect } from 'react';
import { getPlaceList } from '../apis/fetchLocation';

function Main() {
  const [locations, setLocations] = useState([]);
  const [checkedLocationId, setCheckedLocationId] = useState(null);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getPlaceList();
        setLocations(data);
      } catch (error) {
        console.error('위치 목록을 불러오는데 실패했습니다.', error);
      }
    };
    fetchLocations();
  }, []);
  return (
    <Wrapper hasLocation={checkedLocationId}>
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
  width: 100%;
  min-height: 100vh;
  height: ${({ hasLocation }) => (hasLocation ? '1200px' : '100vh')};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
