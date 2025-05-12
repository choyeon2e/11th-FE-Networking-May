import styled from 'styled-components';

function Weather({ checkedLocationId, locations }) {
  const location = locations.find(
    (location) => checkedLocationId === location.id
  );
  console.log(location);
  return <Wrapper>{location.place_name}의 날씨 창입니다</Wrapper>;
}

export default Weather;

const Wrapper = styled.div`
  margin-left: 248px;
`;
