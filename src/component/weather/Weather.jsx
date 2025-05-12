import styled from 'styled-components';

function Weather({ checkedLocationId, locations }) {
  // 위치에 따른 날씨 구현 미완성
  const location = locations.find(
    (location) => checkedLocationId === location.id
  );
  console.log(location);
  // 위치에 따른 날씨 구현 미완성
  return <Wrapper>{location.place_name}의 날씨 창입니다</Wrapper>;
}

export default Weather;

const Wrapper = styled.div`
  margin-left: 248px;
`;
