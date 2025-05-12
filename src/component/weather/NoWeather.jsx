import styled from 'styled-components';
import { CloudsIcon } from '../../assets/icons/CloudsIcon';

function NoWeather() {
  return (
    <Wrapper>
      <CloudsIcon width={320} height={320} />
      <Fortext>아직 선택된 위치가 없습니다!</Fortext>
    </Wrapper>
  );
}

export default NoWeather;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Fortext = styled.div`
  font-size: 36px;
  font-weight: 700;
`;
