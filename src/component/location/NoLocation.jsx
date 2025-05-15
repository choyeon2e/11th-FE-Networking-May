import { CloudsIcon } from '../../assets/icons/CloudsIcon';
import styled from 'styled-components';

function NoLocation() {
  return (
    <Container>
      <CloudsIcon width={320} height={320} />
      <Title>아직 선택된 위치가 없습니다!</Title>
    </Container>
  );
}

export default NoLocation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-left: 248px;
`;
const Title = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
