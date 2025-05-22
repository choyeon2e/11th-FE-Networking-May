import styled from 'styled-components';
import Location from '../component/location/Location';
import NoLocation from '../component/location/NoLocation';
import Weather from './Weather';
import { useState } from 'react';
import { usePlaceList } from '../hooks/useLocation';

function Main() {
  const { isLoading, isError } = usePlaceList();
  const [checkedLocationId, setCheckedLocationId] = useState(null);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>위치 목록을 불러오는 데 실패했습니다.</p>;
  return (
    <Wrapper hasLocation={checkedLocationId}>
      <Location
        checkedLocationId={checkedLocationId}
        setCheckedLocationId={setCheckedLocationId}
      />
      <Content>
        {checkedLocationId ? (
          <Weather checkedLocationId={checkedLocationId} />
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
